import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import MovieList from "../MovieList/MovieList";
import styles from "./MovieResults.module.scss";
import { setMovies } from "../../store/movieSlice";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const MovieResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // Витягуємо номер сторінки з шляху /QuizMovieNew/3
  const match = location.pathname.match(/\/(\d+)$/);
  const currentPage = match ? Number(match[1]) : 1;



  useEffect(() => {
    // Зберігаємо останню валідну сторінку
    sessionStorage.setItem("lastPage",currentPage.toString());

    const movieTitle = localStorage.getItem("query");
    if (!movieTitle) {
      navigate(`/QuizMovieNew/error?from=${currentPage}`);
      return;
    }

    fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          dispatch(setMovies(data.Search));
        } else {
          navigate(`/QuizMovieNew/error?from=${currentPage}`);
        }
      })
      .catch(() => {
        navigate(`/QuizMovieNew/error?from=${currentPage}`);
      });
  }, [dispatch, navigate, currentPage]);

  const handleMovieClick = (id: string) => {
    navigate(`/QuizMovieNew/movie/${id}?from=${currentPage}`);
  };

  return (
    <div className={styles.movieResults}>
      <MovieList onMovieClick={handleMovieClick} />
    </div>
  );
};

export default MovieResults;
