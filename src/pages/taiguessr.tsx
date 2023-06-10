import Guessing from "@/components/TaiGuessr/Guessing"
import { WinningMap } from "@/components/TaiGuessr/WinningMap"
import { Coordinate } from "@/lib/generate"
import { Box, Button, Flex, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"

export default function TaiGuessr() {
    const [coordinates, setCoordinates] = useState<Coordinate|null>(null)
    const [guess, setGuess] = useState<Coordinate|null>(null)
    const [status, setStatus] = useState<"playing"|"guessed"|"end">("playing")
    const [score, setScore] = useState<number>(0)
    const [newGame, setNewGame] = useState<number>(1)
    const [completeData, setCompleteData] = useState<{
        distance: number,
        score: number,
        guess: Coordinate,
        answer: Coordinate
    }>();
    const { isOpen, onOpen, onClose } = useDisclosure()


    if (status === "guessed") {
        if (guess === null) {
            alert("You didn't guess!")
        } else {
            const distance = Math.sqrt((guess.latitude - coordinates!.latitude) ** 2 + (guess.longitude - coordinates!.longitude) ** 2)
            const thisScore = Math.round(Math.pow(10000 / distance, 1/2))
            setScore(score + thisScore)
            setCompleteData({
                distance,
                score: thisScore,
                guess,
                answer: coordinates!
            })
            onOpen()
        }
        setStatus("playing")
    }

    const makeNewGame = () => {
        setNewGame(newGame + 1)
        onClose()
    }

    if (status === "end") {
        return (
            <Flex className="h-[100vh] w-full items-center justify-center bg-[url('/tai-bg.jpeg')] bg-cover bg-no-repeat">
                <VStack className="rounded bg-gradient-to-r from-cyan-500 to-blue-500 p-10 text-white">
                    <Heading as="h1" className="text-4xl font-bold text-center mt-3">TaiGuessr Congrats!</Heading>
                    <Heading as="h2" className="text-xl font-bold text-center mt-3">Score: {score} / {newGame}</Heading>
                    <Text className="text-center">(Higher is better)<br />Thanks for playing!</Text>
                    <HStack>
                        <Link href="/">
                            <Button className="m-3">Find more games</Button>
                        </Link>
                        <Button colorScheme="yellow" className="m-3" onClick={() => {
                            onClose()
                            setStatus("playing")
                            setNewGame(1)
                            setScore(0)
                        }}>Restart Game</Button>
                    </HStack>
                </VStack>
            </Flex>
        )
    }

    if (status === "playing")
        return (
            <>
                <Guessing setGuess={setGuess} setStatus={setStatus} coordinates={coordinates} setCoordinates={setCoordinates}
                            header={
                                <VStack>
                                    <Heading as="h1" className="text-4xl font-bold text-center mt-3 text-white">Welcome to TaiGuessr</Heading>
                                    <Heading as="h2" className="text-xl font-bold text-center mt-3 text-white">Score: {score} / {newGame}</Heading>
                                    <HStack>
                                        <Link href="/">
                                            <Button className="m-3">Find more games</Button>
                                        </Link>
                                        <Button colorScheme="yellow" className="m-3" onClick={() => setStatus("end")}>End Game</Button>
                                    </HStack>
                                </VStack>    
                            } newGame={newGame} />
                <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered closeOnOverlayClick={false}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Alright!</ModalHeader>
                    <ModalBody>
                        <Box className="w-full h-[50vh] mb-3">
                            <WinningMap ansInput={completeData?.answer} guessInput={completeData?.guess} />
                        </Box>
                        <Text className="w-full text-center text-xl font-bold">
                            You won: {completeData?.score} points this round!
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='yellow' mr={3} onClick={() => setStatus("end")}>End Game</Button>
                        <Button colorScheme='blue' onClick={makeNewGame}>
                            Next Round
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
}