import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import GenreList from "./components/GenreList/GenreList";
import MovieSearch from "./components/MovieInput/MovieSearch";
import MovieResults from "./components/MovieResults/MovieResults";
import Btn from "./components/BtnContinue/BtnContinue";

const PageRouter = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(() => localStorage.getItem("query") || "");
  const [genre, setGenre] = useState(() => localStorage.getItem("genre") || "");
  const [isQueryValid, setIsQueryValid] = useState(false);
  const [resultsFound, setResultsFound] = useState(true);

  const currentPage = Number(pageId) || 1;

  useEffect(() => {
    localStorage.setItem("query", query);
    localStorage.setItem("genre", genre);
  }, [query, genre]);

  const handleContinue = () => {
    if (currentPage === 2 && !isQueryValid) return;

    if (currentPage === 3 && resultsFound) {
      localStorage.clear();
      setQuery("");
      setGenre("");
      navigate("/page/1");
      return;
    }

    navigate(`/page/${currentPage + 1}`);
  };

  const pages: Record<number, JSX.Element | undefined> = {
    1: <GenreList genre={genre} setGenre={setGenre} />,
    2: (
      <MovieSearch
        query={query}
        setQuery={setQuery}
        onValidationChange={setIsQueryValid}
        onEnter={handleContinue}
      />
    ),
    3: (
      <MovieResults
        movieTitle={query}
        onResults={(found) => setResultsFound(found)}
      />
    ),
  };

  const isButtonActive =
    (currentPage === 1 && typeof genre === "string" && genre.trim() !== "") ||
    (currentPage === 2 && query.trim() !== "" && isQueryValid);

  return (
    <>
      {pages[currentPage] ?? <GenreList genre={genre} setGenre={setGenre} />}
      <Btn
        isActive={isButtonActive}
        onContinue={handleContinue}
        isHidden={currentPage === 3 && !resultsFound}
        label={currentPage === 3 && resultsFound ? "Complete" : "Continue"}
      />
    </>
  );
};

export default PageRouter;
