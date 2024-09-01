export const getMoviesByCategory = async (category) => {
  try {
    const response = await fetch(`http://localhost:8000/${category}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getMoviesByCategory:', error);
    throw error;
  }
};


export const getFavoriteMovies = async () => {
  const data = await getMoviesByCategory('favourite');
  return data || [];
};


export const updateFavoriteMovies = async (updatedMovie) => {
  try {
    const favorites = await getFavoriteMovies();

    // Check if the movie is already in the favorites
    const movieExists = favorites.some(movie => movie.id === updatedMovie.id);

    if (movieExists) {
      // Movie is already in the favorites
      return { status: 'already_added', message: 'Movie is already in the favorites list.' };
    } else {
      // Update the favorites on the server
      const updateResponse = await fetch('http://localhost:8000/favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });

      if (updateResponse.ok) {
        return { status: 'success', message: 'Movie successfully added to favorites.' };
      } else {
        throw new Error('Network response was not ok');
      }
    }
  } catch (error) {
    console.error('Error in updateFavoriteMovies:', error);
    return { status: 'error', message: 'Failed to update favorite movies.' };
  }
};



export const removeFavoriteMovies = async (id) => {
  try {
    const favorites = await getFavoriteMovies();

    // Check if the movie is already in the favorites
    const movieExists = favorites.some(movie => movie.id === id);

    if (movieExists) {
      // Remove the favorites from the data.json
      const deleteResponse = await fetch(`http://localhost:8000/favourite/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (deleteResponse.ok) {
        return true;
      } else {
        console.error('Error response from server');
        return false;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.error('Error in removeFavoriteMovies:', error);
    return false;
  }
};
