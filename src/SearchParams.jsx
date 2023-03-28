import React from 'react'
import { useState, useEffect } from 'react'
import Game from './Game'
import usePlatformList from './usePlatformList'

const CONSOLE = [
    "PC", "PlayStation", "Xbox", "Nintendo", "Apple Macintosh", "Linux"
]

const GENRE = [
    "Action", "RPG", "Adventure",
    "Shooter", "Indie", "Platformer",
    "Massively Multiplayer", "Puzzle"
]

const SearchParams = () => {
    const [game, setGame] = useState("")
    const [platform, setPlatform] = useState("")
    const [genre, setGenre] = useState("")
    const [games, setGames] = useState([])
    const platformList = usePlatformList(platform)[0]

    useEffect(() => {
        requestGames()
    }, [])

    async function requestGames() {
        try {
          const res = await fetch(`https://api.rawg.io/api/games?key=25bb98b15f2e416f94e73a6ee3292733`);
          const data = await res.json();
          const filteredGames = data.results
            .filter((games) =>
              games.name.toLowerCase().includes(game.toLowerCase())
            )
            .filter((game) => {
                if(!platform) return true
                return game.parent_platforms.some((gamePlatform) => gamePlatform.platform.name.toLowerCase() == platform.toLowerCase())
            })
            .filter((game) => {
                if(!genre) return true
                return game.genres.some((gameGenre) => gameGenre.name.toLowerCase() == genre.toLowerCase())
            })
            .slice(0, 60)
            .map((games) => {
              return {
                name: games.name,
                console: games.parent_platforms.map((platform) => platform.platform.name).join(", "),
                genres: games.genres.map((genre) => genre.name).join(", ")
              };
            });
          setGames([...filteredGames]);
        } catch (error) {
          console.error(error);
        }
    }

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    requestGames()
                }}
            >
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
                <label htmlFor="platform">
                    Console
                    <select 
                        id="platform" 
                        value={platform} 
                        onChange = {(e) => setPlatform(e.target.value)}
                        placeholder="Platform"
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
                        platform={game.console} 
                        genre={game.genres}
                        key={game.id} 
                    />
                ))
            }

        </div>

    )
}

export default SearchParams;