import { useEffect, useState } from "react";
import styles from "./MovieSearch.module.scss";

type MovieSearchProps = {
  query: string;
  setQuery: (value: string) => void;
  onValidationChange: (isValid: boolean) => void;
  onEnter: () => void;
};

const MovieSearch = ({ query, setQuery, onValidationChange, onEnter }: MovieSearchProps) => {
  const [showError, setShowError] = useState(false);

  const hasLetters = (value: string) =>
    /[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(value);

  useEffect(() => {
    const isValid = query.trim() !== "" && hasLetters(query);
    onValidationChange(isValid);
  }, [query, onValidationChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const isValid = query.trim() !== "" && hasLetters(query);
      if (!isValid) {
        setShowError(true);
      } else {
        setShowError(false);
        onEnter();
      }
    }
  };

  return (
    <div className={styles.movieSearch}>
      <h2 className={styles.title}>Enter movie title</h2>
      <input
        className={`${styles["movie-search-input"]} ${showError ? styles.error : ""}`}
        type="text"
        placeholder="Movie title here"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <p className={`${styles["error-text"]} ${showError ? styles.visible : ""}`}>
        Please enter a valid movie title
      </p>
    </div>
  );
};

export default MovieSearch;
