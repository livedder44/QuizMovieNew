import { useEffect, useState } from "react";
import MovieList from "../MovieList/MovieList";
import ErrorPage from "../ErrorPage/ErrorPage";

type Props = {
  movieTitle: string;
  onResults: (found: boolean) => void;
};

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieResults = ({ movieTitle, onResults }: Props) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieTitle) return;

    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setError(false);
          onResults(true);
        } else {
          setError(true);
          onResults(false);
        }
      })
      .catch(() => {
        setError(true);
        onResults(false);
      });
  }, [movieTitle, onResults]);

  if (error) return <ErrorPage />;
  return <MovieList movies={movies} />;
};

export default MovieResults;
