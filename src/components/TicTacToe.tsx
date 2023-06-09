import { useEffect, useState } from "react"

export default function TicTacToe() {
    const [grid, setGrid] = useState(Array(9).fill(null))
    const [player, setPlayer] = useState("X")
    const [alert, setAlert] = useState<string>("")
    const [winner, setWinner] = useState<string>("")

    const checkWin = () => {
        const winConditions = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // left diagonal
            [2, 4, 6]  // right diagonal
        ]

        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i]
            if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
                setWinner(grid[a])
            }
        }
    }

    useEffect(() => {
        checkWin()
    }, [grid])

    const handleClick = (index: number) => (event: any)  => {
        if (winner !== "") {
            return
        }
        const gridCopy = [...grid]
        if (gridCopy[index] !== null) {
            setAlert("Cannot click here")
            setTimeout(() => {
                setAlert("")
            }, 2000)
            return
        }
        setAlert("")
        gridCopy[index] = player
        setGrid(gridCopy)
        setPlayer(player === "X" ? "O" : "X")
    }

    const restartGame = () => (event: any) => {
        setGrid(Array(9).fill(null))
        setPlayer("X")
        setAlert("")
        setWinner("")
    }

    return (
        <div>
            <h1 className="text-4xl font-bold text-center mb-4">Tic Tac Toe</h1>
            <h2 className="text-2xl font-bold text-center mb-4">{player}'s turn</h2>
            <div className="flex justify-center flex-wrap">
                {alert !== "" && (
                    <div className="bg-red-500 text-white font-bold rounded px-4 py-2 w-96 mb-5">
                        {alert}
                    </div>
                )}
                {winner !== "" && (
                    <div className="block text-center">
                        <div className="bg-green-500 text-white font-bold rounded px-4 py-2 w-96 mb-2">
                            {winner} wins!
                        </div>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5"
                            onClick={restartGame()}>
                            Restart Game
                        </button>  
                    </div>            
                )}
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                    {
                        grid.map((value, index) => {
                            return (
                                <div key={index} id={"grid-" + index} className="bg-gray-200 w-24 h-24 flex justify-center items-center text-4xl font-bold cursor-pointer"
                                    onClick={handleClick(index)}>
                                        {value}
                                    </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}