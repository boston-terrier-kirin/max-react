import { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);

    const res = await fetch('https://swapi.dev/api/films');
    const data = await res.json();
    const movies = data.results.map((movie) => {
      return {
        id: movie.episode_id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.opening_crawl,
      };
    });

    setMovies(movies);
    setIsLoading(false);
  };

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? 'Loading...' : <MoviesList movies={movies} />}
      </section>
    </>
  );
}

export default App;
