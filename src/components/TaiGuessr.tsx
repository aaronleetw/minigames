import genCoords, { Coordinate } from "@/lib/generate"
import { cssVar, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"

export default function TaiGuessr() {
    const [coordinates, setCoordinates] = useState<Coordinate|null>(null)
    const [toggleReFetch, setToggleReFetch] = useState(false)
    const loader = new Loader({
        apiKey: "AIzaSyBdlV73ll02cr8XHkibGHz9-wnkNE4FXAo",
        version: "weekly",
    });

    // useEffect(() => {
    //     loader.importLibrary("maps").then(async () => {
    //         const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    //         const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    //         map = new Map(document.getElementById("map") as HTMLElement, {
    //           center: { lat: coordinates?.latitude || 0, lng: coordinates?.longitude || 0 },
    //           zoom: 8,
    //           mapId: 'answer_map',
    //         });

    //         const marker = new AdvancedMarkerElement({
    //             map: map,
    //             position: { lat: coordinates?.latitude || 0, lng: coordinates?.longitude || 0 },
    //             title: "Hello World!",
    //         });
    //     });
    // }, [loader, coordinates])
    // HERE: 
    useEffect(() => {
        loader.importLibrary("maps").then(async () => {
            const fenway = { lat: coordinates?.latitude || 0, lng: coordinates?.longitude || 0 };

            const sv = new google.maps.StreetViewService();

            sv.getPanorama({ location: fenway, radius: 500000 }).then(({ data }) => {
                const location = data.location!;
                const _ = new google.maps.StreetViewPanorama(
                      document.getElementById("pano") as HTMLElement,
                      {
                            position: location.latLng,
                            pov: {
                                heading: 0,
                                pitch: 10,
                            },
                            addressControl: false,
                            linksControl: false,
                            fullscreenControl: false,
                            motionTrackingControl: false,
                            enableCloseButton: false,
                      }
                );
                setCoordinates({ latitude: location.latLng!.lat(), longitude: location.latLng!.lng() })
            }).catch((err) => {
                console.log(err)
            })
        });
    }, [loader, toggleReFetch]);

    useEffect(() => {
        async function scoords() {
            const coords = await genCoords()
            setCoordinates(coords)
            setToggleReFetch(!toggleReFetch)
        }
        scoords()      
    }, [setCoordinates])

    useEffect(() => {
    }, [coordinates])

    return (
        <div>
            <h1 className="text-4xl font-bold text-center">TaiGuessr</h1>
            <Heading as="h2" className="text-center">{"Coordinates: " + coordinates?.latitude + ", " + coordinates?.longitude}</Heading>
            <div id="pano" className="h-[65vh]"></div>
            <div id="map" className="h-52 w-52 hover:h-96 hover:w-96 transition-all fixed bottom-5 left-5 z-50"></div>
        </div>
    )
}