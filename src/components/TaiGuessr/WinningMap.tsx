import { Feature } from "ol";
import { Coordinate } from "@/lib/generate";
import { LineString, Point, Polygon } from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import Map from "ol/Map";
import "ol/ol.css";
import { fromLonLat, transform } from "ol/proj";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import Icon from "ol/style/Icon";
import Style from "ol/style/Style";
import View from "ol/View";
import type { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";
import { boundingExtent } from "ol/extent";

export const WinningMap: FunctionComponent<
  PropsWithChildren<{ ansInput: Coordinate | undefined, guessInput: Coordinate | undefined }>
> = ({ children, ansInput, guessInput }) => {

    const mapElement = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map>();

    useEffect(() => {
        if (!ansInput || !guessInput) return;
        const answer = [ansInput.longitude, ansInput.latitude];
        const guess = [guessInput.longitude, guessInput.latitude];

        const distInKm = () => {
            const R = 6371e3; // metres
            const φ1 = answer[0] * Math.PI/180; // φ, λ in radians
            const φ2 = guess[0] * Math.PI/180;
            const Δφ = (guess[0]-answer[0]) * Math.PI/180;
            const Δλ = (guess[1]-answer[1]) * Math.PI/180;
            return (Math.sqrt(Math.pow(R * Δφ, 2) + Math.pow(R * Math.cos((φ1+φ2)/2) * Δλ, 2)) / 1000).toFixed(3); // in km
        }
        if (mapElement.current && !mapRef.current) {
            const answerStd = transform(answer, 'EPSG:4326', 'EPSG:3857');
            const guessStd = transform(guess, 'EPSG:4326', 'EPSG:3857');
        
            const answerFeature = new Feature({
                geometry: new Point(answerStd),
                name: 'Answer Point',
            });
        
            const answerStyle = new Style({
                image: new Icon({
                    src: '/answer.png',
                    scale: 0.05,
                }),
            });
        
            answerFeature.setStyle(answerStyle);
        
            const guessFeature = new Feature({
                geometry: new Point(guessStd),
                name: 'Guess Point',
            });
        
            const guessStyle = new Style({
                image: new Icon({
                    src: '/marker.png',
                    scale: 0.05,
                }),
            });
        
            guessFeature.setStyle(guessStyle);

            const lineFeature = new Feature({
                geometry: new LineString([
                    answerStd,
                    guessStd,
                ]),
                name: 'Line',
            });
            lineFeature.setStyle(
                new Style({
                    stroke: new Stroke({
                        color: 'black',
                        width: 2,
                    }),
                    text: new Text({
                        text: `Distance: ${distInKm()} km`,
                        font: '16px "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif',
                        fill: new Fill({ color: 'black' }),
                        stroke: new Stroke({ color: 'black', width: 1 })
                    })
                })
            )   
        
            const vectorSource = new VectorSource({
                // @ts-ignore
                features: [answerFeature, guessFeature, lineFeature],
            });
            
            const vectorLayer = new VectorLayer({
                source: vectorSource,
            });
        
            const focusedView = new View({
                center: [0, 0],
                zoom: 1
            })

            focusedView.fit(
                boundingExtent([answerStd, guessStd]),
            )

            console.log(new Polygon([
                [
                    answerStd,
                    [answerStd[0], guessStd[1]],
                    guessStd,
                    [guessStd[0], answerStd[1]],
                ]
            ]))
        
            mapRef.current = new Map({
                target: mapElement.current ?? undefined,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                    vectorLayer,
                ],
                view: focusedView
            });
        }
    }, [ansInput, guessInput]);

    if (!ansInput || !guessInput) return (<></>);

    return (
        <div
        id="map"
        className="map"
        style={{ height: "100%", width: "100%" }}
        ref={mapElement}
        >
        {children}
        </div>
    );
};