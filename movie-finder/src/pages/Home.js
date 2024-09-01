import React, { useState, useEffect, useRef } from 'react';
import MovieCard from '../components/MovieCard';
import { getMoviesByCategory, updateFavoriteMovies } from '../services/movieService';
import Header from '../components/Header';

const Home = ({ category }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const messageRef = useRef(null); // Ref to scroll to the success message

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getMoviesByCategory(category);
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);


  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMovies(filtered);
  };
  
  const toggleFavorite = async (id) => {
    try {  
      const movieToUpdate = movies.find(movie => movie.id === id);
      const result =  await updateFavoriteMovies(movieToUpdate);
      // Set success message
      setSuccessMessage(result.message);
    } catch (error) {
      console.error('Failed to update favorites:', error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [successMessage]);

  const handleClosePopup = () => {
    setSuccessMessage('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
     <div>
      <Header onSearch={handleSearch} />
      <div className="movies-container">
        {successMessage && (
          <div className="alert-popup">
            <p className="alert-message">{successMessage}</p>
            <button className="close-button" onClick={() => setSuccessMessage('')}>×</button>
          </div>
        )}
        {filteredMovies.length > 0 ? (
          filteredMovies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavourite={false}
              onFavoriteToggle={() => toggleFavorite(movie.id)}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
