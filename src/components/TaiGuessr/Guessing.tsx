import genCoords, { Coordinate } from "@/lib/generate"
import { Box, Button, cssVar, Heading, VStack } from "@chakra-ui/react"
import { ReactNode, useEffect, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { TMap } from "./Map"
import Link from "next/link"
import { JsxElement } from "typescript"

export default function Guessing({ setGuess, setStatus, coordinates, setCoordinates, header, newGame }: 
                                { setGuess: (guess: Coordinate) => void, setStatus: (status: "playing"|"guessed") => void,
                                coordinates: Coordinate|null, setCoordinates: (coordinates: Coordinate) => void, header: ReactNode,
                                newGame: any }) {
    const [toggleReFetch, setToggleReFetch] = useState(false)

    const loader = new Loader({
        apiKey: "AIzaSyBdlV73ll02cr8XHkibGHz9-wnkNE4FXAo",
        version: "weekly",
    });

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
    }, [newGame, setCoordinates, setToggleReFetch, genCoords])

    return (
        <div className="h-[100vh] w-full">
            <div id="pano" className="h-full z-0"></div>
            <Box className="w-full absolute top-0 bg-slate-500 z-50 p-5">
                {header}
            </Box>
            {
                coordinates && (
                <div className="h-72 w-36 hover:h-80 hover:w-80 transition-all fixed bottom-5 left-5 z-50 rounded-lg">
                    <TMap coordinates={[121.031988, 23.832070]} setGuess={setGuess} />
                    <Button className="absolute bottom-10 left-0 !rounded-none w-full" colorScheme="green" onClick={() => setStatus("guessed")}>Guess!</Button>
                </div>)
            }
        </div>
    )
}