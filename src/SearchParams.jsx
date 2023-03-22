import React from 'react'
import { useState, useEffect } from 'react'
import Game from './Game'

const CONSOLE = [
    "PC", "PlayStation", "Xbox", "Nintendo", "Apple Macintosh", "Linux"
]

const GENRE = [
    "FPS", "Action", "Adventure",
    "Sports", "Family", "RPG", "JRPG",
    "Third Person Shooter"
]


async function requestGames() {
    try{
        const res = await fetch(
            `https://api.rawg.io/api/games?key=25bb98b15f2e416f94e73a6ee3292733`
        )
        const data = await res.json();
        let gamesList = []
        data.results.slice(0, 20).forEach(game => {
            let name = game.name
            let platform = game.parent_platforms.map(platform => platform.platform.name).join(", ")
            gamesList.push({name, platform})
        })        
        console.log(gamesList)
    }
    catch(error) {
        console.error(error)
    }
}

requestGames()


const SearchParams = () => {
    const [platform, setConsole] = useState("")
    const [genre, setGenre] = useState("")
    const [games, setGames] = useState([])
    let data;

    useEffect(() => {
        requestGames()
    }, [platform])

    async function requestGames() {
        try{
            const res = await fetch(
                `https://api.rawg.io/api/games?`
            )
            data = await res.json();
            let gamesList = []

            data.results.slice(0, 20).forEach(game => {
            let name = game.name
            let console = game.parent_platforms.map(platform => platform.platform.name).join(", ")
            gamesList.push({name, console})
        })   
            setGames([...gamesList])
        }
        catch(error) {
            console.error(error)
        }
    }
    
    return (
        <div className="search-params">
            <form>
                {/* Console Search */}
                <label htmlFor="console">
                    Console
                    <select 
                        id="console" 
                        value={platform} 
                        onChange = {e => {
                            setConsole(e.target.value)
                            setGenre("")
                        }}
                    >
                        <option />
                        {CONSOLE.map((platform) => (
                            <option key={platform}>{platform}</option>
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
            {
                games.map(game => (
                    <Game 
                        name={game.name}
                        platform={game.platform} 
                        key={game.id} 
                    />
                ))
            }

        </div>
    )
}

export default SearchParams;