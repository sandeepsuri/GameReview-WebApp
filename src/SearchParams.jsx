import React from 'react'
import { useState, useEffect } from 'react'
import Results from './Results'
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

    useEffect(() => {
        requestGames()
    }, [])

    async function requestGames() {
        try {
          const res = await fetch(`https://api.rawg.io/api/games?key=`);
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
            .map(async (games) => {
                const videoRes = await fetch(`https://api.rawg.io/api/games/${games.id}/movies?key=`);
                const videoData = await videoRes.json()
                const trailerURL = videoData.results.length > 0 ? videoData.results[0].data.max : ''
               
                const imageURL = await fetch(`https://api.rawg.io/api/games/${games.id}/screenshots?key=`)
                const imageData = await imageURL.json()
                const img = imageData.results[0].image
                
                return {
                    id: games.id,
                    name: games.name,
                    console: games.parent_platforms.map((platform) => platform.platform.name).join(", "),
                    genres: games.genres.map((genre) => genre.name).join(", "),
                    trailer: trailerURL,
                    img: img
              };
            });
            const games = await Promise.all(filteredGames)
            setGames([...games]);
            console.log(games)
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
            <Results games={games} />

        </div>

    )
}

export default SearchParams;