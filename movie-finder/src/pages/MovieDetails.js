import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();

  return (
    <div className="movie-details">
      <h2>Movie Details for {id}</h2>
      {/* Detailed info would be fetched and displayed here */}
    </div>
  );
};

export default MovieDetails;
