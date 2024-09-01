import React from 'react';

const MovieCard = ({ movie, isFavourite, onFavoriteToggle }) => {
  return (
    <div className="movie-card">
      <img src={movie.posterurl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <button onClick={() => onFavoriteToggle(movie.id)}>
        {isFavourite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;
