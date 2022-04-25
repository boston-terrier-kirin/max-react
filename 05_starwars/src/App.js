import { useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('https://swapi.dev/api/films');
      if (!res.ok) {
        throw new Error('Something went wrong.');
      }

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
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? 'Loading...' : <MoviesList movies={movies} />}
        {error && error}
      </section>
    </>
  );
}

export default App;
