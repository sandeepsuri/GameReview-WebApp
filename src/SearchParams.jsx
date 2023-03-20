import React from 'react'
import { useState } from 'react'

const CONSOLE = [
    "PS4", "PS5", 
    "XBOX ONE", "XBOX SERIES X|S", 
    "Nintendo Switch"
]

const SearchParams = () => {
    const [game, setGame] = useState("")
    const [console, setConsole] = useState("")
    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Game
                    <input 
                        onChange={(e) => setGame(e.target.value)} 
                        id="game" 
                        value={game} 
                        placeholder="Game Name" 
                    />
                </label>
                <label htmlFor="animal">
                    Console
                    <select 
                        id="console" 
                        value={console} 
                        onChange = {e => {
                            setConsole(e.target.value)
                        }}
                    >
                        <option />
                        {CONSOLE.map((console) => (
                            <option key={console}>{console}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>

        </div>
    )
}

export default SearchParams;