import React from 'react';
import MovieList from '../components/MovieList';

function Home({ movies, searchTerm }) {
  return (
    <div>
      <MovieList movies={movies} searchTerm={searchTerm} />
    </div>
  );
}

export default Home;