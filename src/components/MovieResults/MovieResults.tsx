import { useEffect, useState } from "react";
import MovieList from "../MovieList/MovieList";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useNavigate } from "react-router-dom";
import styles from "./MovieResults.module.scss";

type Props = {
  movieTitle: string;
  onResults: (found: boolean) => void;
};

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieResults = ({ movieTitle, onResults }: Props) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate(); 
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

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  if (error) return <ErrorPage />;

  return (
    <div className={styles.movieResults}>
      <MovieList movies={movies} onMovieClick={handleMovieClick} /> {}
    </div>
  );
};

export default MovieResults;
