import { useState, useEffect } from "react";

const localCache = {}

export default function usePlatformList(platform) {
    const [platformList, setPlatformList] = useState([])
    const [status, setStatus] = useState("unloaded")
    console.log('platform list')
    useEffect(() => {
        if (!platform) setPlatformList([])
        else if(localCache[platform]) setPlatformList[platform]
        else requestPlatformList()

        async function requestPlatformList() {
            setPlatformList([]);
            setStatus("loading")
            const res = await fetch(`https://api.rawg.io/api/games?key=25bb98b15f2e416f94e73a6ee3292733`)
            const json = await res.json()

            const filterPlatforms = json.results
                .filter((p) => p.games_count > 0)
                .map((p) => p.name)
                .filter((name) => name.toLowerCase().includes(platform.toLowerCase()))

            localCache[platform] = filterPlatforms
            setPlatformList(filterPlatforms)
            setStatus("loaded")

        }
    }, [platform])

    return [platformList, status]
}