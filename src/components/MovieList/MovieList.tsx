import styles from "./MovieList.module.scss";

type MovieListProps = {
  movies: any[];
};

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <div key={movie.imdbID} className={styles.movieItem}>
          <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
          <h3 className={styles.title}>{movie.Title}</h3>
          <p className={styles.year}>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
