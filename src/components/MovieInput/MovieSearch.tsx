// src/components/MovieInput/MovieSearch.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MovieSearch.module.scss";

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const hasLetters = (value: string) =>
    /[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(value);

  const tryToContinue = () => {
    const isValid = query.trim() !== "" && hasLetters(query);
    if (!isValid) {
      setShowError(true);
    } else {
      setShowError(false);
      localStorage.setItem("query", query);
      navigate(`${import.meta.env.BASE_URL}3`);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("query");
    if (stored) setQuery(stored);

    const handleCustomContinue = () => {
      tryToContinue();
    };

    window.addEventListener("tryMovieSearchContinue", handleCustomContinue);

    return () => {
      window.removeEventListener("tryMovieSearchContinue", handleCustomContinue);
    };
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      tryToContinue();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowError(false);
    localStorage.setItem("query", value);
    window.dispatchEvent(new Event("localStorageChange"));
  };

  return (
    <div className={styles.movieSearch}>
      <h2 className={styles.title}>Enter movie title</h2>
      <input
        className={`${styles["movie-search-input"]} ${showError ? styles.error : ""}`}
        type="text"
        placeholder="Movie title here"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <p className={`${styles["error-text"]} ${showError ? styles.visible : ""}`}>
        Please enter a valid movie title
      </p>
    </div>
  );
};

export default MovieSearch;
