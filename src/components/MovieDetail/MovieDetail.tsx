import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./MovieDetail.module.scss";
import Counter from "../Counter/Counter";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();

  const storedPage = sessionStorage.getItem("lastPage");
  const currentPage = storedPage ? parseInt(storedPage, 10) : 1;
  const totalPages = 3;

  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  const actors = movie.Actors?.split(", ") || [];
  const displayedActors =
    actors.length > 3 ? actors.slice(0, 3).join(", ") + " and others" : movie.Actors;

  return (
    <div className={styles.movieItem}>
      <Counter currentPage={currentPage} totalPages={totalPages} />
      <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
      <h3 className={styles.title}>{movie.Title}</h3>
      <p className={styles.year}><strong>Year:</strong> {movie.Year}</p>
      <p className={styles.director}><strong>Director:</strong> {movie.Director}</p>
      <p className={styles.plot}><strong>Plot:</strong> {movie.Plot}</p>
      <p className={styles.actors}><strong>Actors:</strong> {displayedActors}</p>
    </div>
  );
};

export default MovieDetail;
