import React, { useRef, useEffect } from 'react';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ movies = [], searchTerm = '' }) => {
  const scrollRef = useRef(null);


  const filteredMovies = movies.filter((movie) => {
    
    if (!movie || !movie.title) return false;
    
    const search = typeof searchTerm === 'string' ? searchTerm.toLowerCase() : '';
    return movie.title.toLowerCase().includes(search);
  });


  const scrollLeft = () => {
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8; 
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8; 
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  
  const handleWheel = (e) => {
    e.preventDefault();
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.3; 
    container.scrollBy({ left: e.deltaY > 0 ? scrollAmount : -scrollAmount, behavior: 'smooth' });
  };

 
  useEffect(() => {
    const container = scrollRef.current;
    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScrollLeft = scrollWidth - clientWidth;

      
      if (scrollLeft <= 0) {
        container.scrollLeft = 0;
      } else if (scrollLeft >= maxScrollLeft) {
        container.scrollLeft = maxScrollLeft;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="movie-list-container">
      <div className="movie-list" ref={scrollRef} onWheel={handleWheel}>
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>Немає фільмів.</p>
        )}
      </div>
      <div className="slider-controls">
        <button onClick={scrollLeft}>←</button>
        <button onClick={scrollRight}>→</button>
      </div>
    </div>
  );
};

export default MovieList;