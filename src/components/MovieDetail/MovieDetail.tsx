// src/components/MovieDetail/MovieDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./MovieDetail.module.scss";
import Loader from "../Loader/Loader";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

interface Movie {
  Title: string;
  Year: string;
  Director: string;
  Plot: string;
  Actors: string;
  Poster: string;
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div><Loader /></div>;

  const actorsArray = movie.Actors?.split(", ") || [];
  const displayedActors =
    actorsArray.length > 2
      ? actorsArray.slice(0, 3).join(", ") + " and others"
      : movie.Actors;

  return (
    <div className={styles.movieItem}>
      <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
      <h3 className={styles.title}>{movie.Title}</h3>
      <p className={styles.year}>
        <strong className={styles.strong}>Year:</strong> {movie.Year}
      </p>
      <p className={styles.director}>
        <strong className={styles.strong}>Director:</strong> {movie.Director}
      </p>
      <p className={styles.plot}>
        <strong className={styles.strong}>Plot:</strong> {movie.Plot}
      </p>
      <p className={styles.actors}>
        <strong className={styles.strong}>Actors:</strong> {displayedActors}
      </p>
    </div>
  );
};

export default MovieDetail;
