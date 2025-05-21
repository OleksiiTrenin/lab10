import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="description">{movie.description}</p>
        <p><strong>Жанр:</strong> {movie.genre}</p>
        <Link to={`/booking/${movie.id}`} className="book-btn">Забронювати</Link>
      </div>
      <div className="movie-title">{movie.title}</div>
    </div>
  );
};

export default MovieCard;