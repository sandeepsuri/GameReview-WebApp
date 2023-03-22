import React from "react";

const Game = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
        <h2>{props.platform}</h2>
        <h2>{props.genre}</h2>
      </div>
    );
};
  
export default Game;