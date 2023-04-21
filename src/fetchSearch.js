async function fetchSearch({queryKey}) {
    const {game, platform, genre} = queryKey[1]
    const res = await fetch(`https://api.rawg.io/api/games?key=`);
    const data = await res.json();
    data.results
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
    
    if(!res.ok) {
        throw new Error(`Cannot find ${game}, ${platform}, ${genre}`)
    }
}

export default fetchSearch