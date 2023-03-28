import React from "react";

const Game = ({name, platform, genre, trailer, id}) => {
  let hero = 'https://cdn-icons-png.flaticon.com/512/4021/4021631.png'
  let videoUrl = null
  if(trailer) videoUrl = trailer
  return (
    <a href={`/details/${id}`} className='game'>
      
        {videoUrl ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video width="100%" height="100%" controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="image-container">
          <img src={hero} alt={name} />
          </div>
        )}
      
      <div className="=info">
        <h1>{name}</h1>
        <h2>{platform} - {genre}</h2>
      </div>
    </a>
  );
};
  
export default Game;