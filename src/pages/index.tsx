import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import TicTacToe from '@/components/TicTacToe'
import ConnectFour from '@/components/ConnectFour'
import Minesweeper from '@/components/Minesweeper'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-7">MiniGames</h1>
      <Router>
        <div className="flex flex-row justify-center gap-5 mt-7">
          <Link to="tictactoe">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Tic Tac Toe
            </button>
          </Link>
          <Link to="connect4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Connect Four
            </button>
          </Link>
          <Link to="minesweeper">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Minesweeper
            </button>
          </Link>
        </div>
        <br />
        <Routes>
          <Route path="tictactoe" element={<TicTacToe />} />
          <Route path="connect4" element={<ConnectFour />} />
          <Route path="minesweeper" element={<Minesweeper />} />
        </Routes>
      </Router>
    </div>
  )
}
