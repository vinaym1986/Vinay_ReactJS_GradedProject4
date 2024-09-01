import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';
import './assets/styles/styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home category="movies-in-theaters" />} />
          <Route path="/coming-soon" element={<Home category="movies-coming" />} />
          <Route path="/top-rated-indian" element={<Home category="top-rated-india" />} />
          <Route path="/top-rated-movies" element={<Home category="top-rated-movies" />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
