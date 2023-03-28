import React from "react";
import Game from "./Game";

const Results = ({ games }) => {
    return (
        <div className='search'>
            {!games.length ? (
                <h1>No Games Found</h1>
            ) : (
                games.map(game => (
                    <Game
                        name={game.name}
                        platform={game.console} 
                        genre={game.genres}
                        key={game.id}
                    />
                ))
            )}
        </div>
    )
}

export default Results