import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Header  from '../components/Header';
import { getFavoriteMovies, removeFavoriteMovies } from '../services/movieService';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const fetchFavorites = async () => {
    try {
      const data = await getFavoriteMovies();
      setFavorites(data);
      setFilteredMovies(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = favorites.filter(favorites =>
      favorites.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMovies(filtered);
  };

  useEffect(() => { 
    fetchFavorites();
  }, []);

  const removeFavorite = async(id) => {
    const isSuccess =  await removeFavoriteMovies(id);

    if (isSuccess) {
      fetchFavorites();
    } else {
      console.error('Failed to remove movie from favorites.');
    }

  };

  return (
    <div>
      <Header onSearch={handleSearch}/>
      <div className="movies-container">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} isFavourite={true} movie={movie} onFavoriteToggle={removeFavorite} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
