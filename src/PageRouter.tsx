import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import GenreList from "./components/GenreList/GenreList";
import MovieSearch from "./components/MovieInput/MovieSearch";
import MovieResults from "./components/MovieResults/MovieResults";
import Btn from "./components/BtnContinue/BtnContinue";

const PageRouter = ({ defaultPage = 0 }: { defaultPage?: number }) => {
  const { pageId } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(() => localStorage.getItem("query") || "");
  const [genre, setGenre] = useState(() => localStorage.getItem("genre") || "");
  const [isQueryValid, setIsQueryValid] = useState(false);
  const [resultsFound, setResultsFound] = useState(true);

  const currentPage = Number(pageId) || defaultPage || 1;

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
      navigate("/");
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
    (currentPage === 1 && genre.trim() !== "") ||
    (currentPage === 2 && query.trim() !== "" && isQueryValid);

  return (
    <>
      {pages[currentPage] ?? pages[1]}
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
