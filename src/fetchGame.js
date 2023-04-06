const fetchGame = async ({queryKey}) => {
    const id = queryKey[1];
    const apiRes = await fetch(`https://api.rawg.io/api/games/${id}?key=`)
    if(!apiRes.ok){ 
        console('fail')
        throw new Error(`details/${id} fetch failed badly`)
    }
    // console.log(apiRes.json())
    return apiRes.json()
}

export default fetchGame;