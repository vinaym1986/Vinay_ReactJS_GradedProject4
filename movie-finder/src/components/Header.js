import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    onSearch(event.target.value); 
  };

  return (
    <header>
      <div className="header-content">
        <nav className="menu">
          <ul>
            <li><NavLink to="/">Movies in Theaters</NavLink></li>
            <li><NavLink to="/coming-soon">Coming Soon</NavLink></li>
            <li><NavLink to="/top-rated-indian">Top Rated Indian</NavLink></li>
            <li><NavLink to="/top-rated-movies">Top Rated Movies</NavLink></li>
            <li><NavLink to="/favorites">Favorites</NavLink></li>
          </ul>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={query}
            onChange={handleSearchChange} // Update the search query in the parent component
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
