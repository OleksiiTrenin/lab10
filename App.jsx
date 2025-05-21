import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import Booking from './pages/Booking';
import Home from './pages/Home';
import movies from './data/movies';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route
            path="/home"
            element={
              <div>
                <header className="app-header">
                  <div className="logo">NedoMultiplex</div>
                  <nav className="nav-menu">
                    <a href="#">Львів, Spartak</a>
                    <input
                      type="text"
                      placeholder="Пошук..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    <a href="#">Увійти</a>
                  </nav>
                </header>
                <Home movies={movies} searchTerm={searchTerm} />
              </div>
            }
          />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;