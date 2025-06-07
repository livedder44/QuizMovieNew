import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import MovieList from "../MovieList/MovieList";
import styles from "./MovieResults.module.scss";
import { setMovies } from "../../store/movieSlice";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.setItem("lastPage", "3"); 

    const movieTitle = localStorage.getItem("query");
    if (!movieTitle) {
      navigate("/QuizMovieNew/error");
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          dispatch(setMovies(data.Search)); 
        } else {
          navigate("/QuizMovieNew/error");
        }
      })
      .catch(() => {
        navigate("/QuizMovieNew/error");
      });
  }, [dispatch, navigate]);

  const handleMovieClick = (id: string) => {
    navigate(`/QuizMovieNew/movie/${id}`);
  };

  return (
    <div className={styles.movieResults}>
      <MovieList onMovieClick={handleMovieClick} />
    </div>
  );
};

export default MovieResults;
