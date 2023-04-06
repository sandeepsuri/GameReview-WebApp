import React from "react";
import Game from "./Game";

const Results = ({ games }) => {
    return (
        <div className='search'>
            {!games.length ? (
                <div className="loading-pane">
                    <h2 className="loader">🎮</h2>
                </div>
            ) : (
                games.map(game => (
                    <Game
                        name={game.name}
                        id={game.id}
                        platform={game.console} 
                        genre={game.genres}
                        trailer={game.trailer}
                        image={game.img}
                        key={game.id}
                    />
                ))
            )}
        </div>
    )
}

export default Results