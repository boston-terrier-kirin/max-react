import { useEffect, useState } from 'react';
import AddMovie from './components/AddMovie';
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
      const res = await fetch(
        'https://react-http-913ae-default-rtdb.firebaseio.com/movies.json'
      );
      if (!res.ok) {
        throw new Error('Something went wrong.');
      }

      const data = await res.json();

      const movies = [];
      for (const key in data) {
        movies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }

      setMovies(movies);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  const addMovieHandler = async (movie) => {
    const res = await fetch(
      'https://react-http-913ae-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'content-type': 'application/json',
        },
      }
    );

    const data = await res.json();
  };

  return (
    <>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
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
