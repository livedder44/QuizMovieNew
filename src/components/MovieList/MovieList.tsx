import styles from "./MovieList.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

type MovieListProps = {
  movies: any[];
  onMovieClick?: (id: string) => void;
};

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const match = location.pathname.match(/page\/(\d+)/);
  const currentPage = match ? parseInt(match[1], 10) : 1;

  const handleClick = (movie: any) => {
    sessionStorage.setItem("lastPage", String(currentPage));
    onMovieClick?.(movie.imdbID); // динамічно викликаємо колбек
  };

  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className={styles.movieItem}
          onClick={() => handleClick(movie)}
        >
          <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
          <h3 className={styles.title}>{movie.Title}</h3>
          <p className={styles.year}>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
