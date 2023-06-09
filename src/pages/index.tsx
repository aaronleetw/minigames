import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import TicTacToe from '@/components/TicTacToe'
import TaiGuessr from '@/components/TaiGuessr'
import Wordle from '@/components/Wordle'
import { Button, ButtonGroup, Divider, Heading, HStack } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Heading as="h1" className='text-center m-10'>
        Games for APCS
      </Heading>
      <Router>
        <HStack className='w-full justify-center'>
          <ButtonGroup className="">
            <Link to="tictactoe">
              <Button colorScheme='blue'>
                Tic Tac Toe
              </Button>
            </Link>
            <Link to="taiguessr">
              <Button colorScheme='blue'>
                TaiGuessr
              </Button>
            </Link>
            <Link to="wordle">
              <Button colorScheme='blue'>
                Wordle
              </Button>
            </Link>
          </ButtonGroup>
        </HStack>
        <Divider className='mt-10 mb-10' />
        <Routes>
          <Route path="tictactoe" element={<TicTacToe />} />
          <Route path="taiguessr" element={<TaiGuessr />} />
          <Route path="wordle" element={<Wordle />} />
        </Routes>
      </Router>
    </div>
  )
}
