import { useState, useEffect } from "react";

const localCache = {}

export default function usePlatformList(platform) {
    const [platformList, setPlatformList] = useState([])
    const [status, setStatus] = useState("unloaded")
    useEffect(() => {
        if (!platform) setPlatformList([])
        else if(localCache[platform]) setPlatformList[platform]
        else requestPlatformList()

        async function requestPlatformList() {
            setPlatformList([]);
            setStatus("loading")
            const res = await fetch(`https://api.rawg.io/api/games?key=`)
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