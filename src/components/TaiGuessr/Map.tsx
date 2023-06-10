import { Feature } from "ol";
import { Coordinate } from "@/lib/generate";
import { Point } from "ol/geom";
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

export const TMap: FunctionComponent<
  PropsWithChildren<{ coordinates: number[], setGuess: (guess: Coordinate) => void  }>
> = ({ children, coordinates, setGuess }) => {
    const transformedCoordinates = fromLonLat(coordinates);

    const mapElement = useRef<HTMLDivElement>(null);
    const mapRef = useRef<Map>();

    useEffect(() => {
        if (mapElement.current && !mapRef.current) {
            mapRef.current = new Map({
                target: mapElement.current ?? undefined,
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                view: new View({
                    center: transformedCoordinates,
                    zoom: 6,
                }),
            });
            mapRef.current.addEventListener("click", (evt) => {
                var latLong = transform((evt as any).coordinate, 'EPSG:3857', 'EPSG:4326');
                var lat     = latLong[1];
                var long    = latLong[0];
                setGuess({ latitude: lat, longitude: long })

                const iconFeature = new Feature({
                    geometry: new Point((evt as any).coordinate),
                    name: 'Selected point',
                });

                const iconStyle = new Style({
                    image: new Icon({
                        src: '/marker.png',
                        scale: 0.05,
                    }),
                });
                iconFeature.setStyle(iconStyle);

                const vectorSource = new VectorSource({
                    features: [iconFeature],
                });
                
                const vectorLayer = new VectorLayer({
                    source: vectorSource,
                });

                mapRef.current?.removeLayer(mapRef.current?.getLayers().getArray()[1])
                mapRef.current?.addLayer(vectorLayer);

                console.log(lat, long);
            });
        }
    }, [transformedCoordinates]);

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