/* eslint-disable react/react-in-jsx-scope */
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import fetchGame from './fetchGame';

const Details = () => {
    const { id } = useParams();
    const results  = useQuery(["details", id], fetchGame)
    
    if(results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">🎮</h2>
            </div>
        )
    }
    const game = results.data

    console.log(game.name)
    return (
        <div className="details">
            <h1>{game.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
        </div>
    )
};

export default Details;