import React from 'react'
import { useState } from 'react'

const CONSOLE = [
    "PS4", "PS5", 
    "XBOX ONE", "XBOX SERIES X|S", 
    "Nintendo Switch"
]

const GENRE = [
    "FPS", "Action", "Adventure",
    "Sports", "Family", "RPG", "JRPG",
    "Third Person Shooter"
]

const SearchParams = () => {
    const [game, setGame] = useState("")
    const [console, setConsole] = useState("")
    const [genre, setGenre] = useState("")
    return (
        <div className="search-params">
            <form>
                {/* Game Search */}
                <label htmlFor="game">
                    Game
                    <input 
                        onChange={(e) => setGame(e.target.value)} 
                        id="game" 
                        value={game} 
                        placeholder="Game Name" 
                    />
                </label>
                {/* Console Search */}
                <label htmlFor="console">
                    Console
                    <select 
                        id="console" 
                        value={console} 
                        onChange = {e => {
                            setConsole(e.target.value)
                            setGenre("")
                        }}
                    >
                        <option />
                        {CONSOLE.map((console) => (
                            <option key={console}>{console}</option>
                        ))}
                    </select>
                </label>
                {/* Game Genre Search */}
                <label htmlFor="genre">
                    Genre
                    <select 
                        id="genre" 
                        disabled={GENRE.length === 0}
                        value={genre} 
                        onChange = {e => {
                            setGenre(e.target.value)
                        }}
                    >
                        <option />
                        {GENRE.map((genre) => (
                            <option key={genre}>{genre}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>

        </div>
    )
}

export default SearchParams;