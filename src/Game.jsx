/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';

const Game = ({name, platform, genre, trailer, image, id}) => {
  let videoUrl = null
  if(trailer) videoUrl = trailer
  return (
    <Link to={`/details/${id}`} className='game'>
      
        {videoUrl ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="image-container">
          <img src={image} alt={name} />
          </div>
        )}
      
      <div className="=info container">
        <h1>{name}</h1>
        <h2>{platform} - {genre}</h2>
      </div>
    </Link>
  );
};
  
export default Game;