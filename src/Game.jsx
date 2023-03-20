import React from "react";

const Pet = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
        <h2>{props.console}</h2>
        <h2>{props.genre}</h2>
      </div>
    );
};
  
export default Pet;