import { Box, Heading, HStack, Text, Link, Flex } from '@chakra-ui/react'

export default function Home() {
  return (
    <Box className="min-h-[100vh] w-full bg-gradient-to-r from-emerald-950 to-blue-950 text-white">
      <Heading as="h1" className='text-center p-20 !text-5xl'>
        APCS MiniGames
      </Heading>
      <HStack className='w-full justify-evenly mb-4 lg:!flex !block items-stretch'>
          <Flex className='rounded border self-stretch items-center border-gray-500 p-5 w-10/12 m-auto mb-3 lg:mt-0 lg:w-4/12 text-center hover:bg-gradient-to-r from-emerald-400 to-blue-400 hover:text-black transition-all'>
            <Link href="/tictactoe" className="!no-underline">
              <Heading as="h2" className='text-center m-5 !text-3xl'>
                Tic Tac Toe
              </Heading>
              <img src='/tictactoe.png' className='m-auto' width={300} height={300} alt="tictactoe" />
              <Text className="mt-5">
                The classic game of Tic Tac Toe. Play against a friend and the computer will keep track of who won.
              </Text>
            </Link>
          </Flex>
          <Flex className='rounded border self-stretch items-center border-gray-500 p-5 w-10/12 m-auto lg:w-4/12 text-center hover:bg-gradient-to-r from-emerald-400 to-blue-400 hover:text-black transition-all'>
            <Link href="/taiguessr" className="!no-underline">
              <Heading as="h2" className='text-center m-5 !text-3xl'>
                TaiGuessr
              </Heading>
              <img src='/taiguessr.png' className='m-auto' width={300} height={300} alt="taiguessr" />
              <Text className="mt-5">
                A browser-based geography game in which players guess locations from Google Street View imagery.
                This game is based on <Link href="https://geoguessr.com">GeoGuessr</Link> but only uses locations in Taiwan.
                When the street image loads, you can click and drag to look around and use the mouse wheel to zoom in and out.
                Then use the map at the bottom left to guess where you are.
                It is untimed and infinite, so you can play as long as you want.
              </Text>
            </Link>
          </Flex>
      </HStack>
      <Link href="https://github.com/aaronleetw/apcs-minigames">
        <Text className="text-center mt-10 text-xl pb-7">
          View the source code on GitHub
        </Text>
      </Link>
    </Box>
  )
}
