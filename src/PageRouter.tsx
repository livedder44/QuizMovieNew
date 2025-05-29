import { useParams, useNavigate, Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import GenreList from "./components/GenreList/GenreList";
import MovieSearch from "./components/MovieInput/MovieSearch";
import MovieResults from "./components/MovieResults/MovieResults";
import MovieDetail from "./components/MovieDetail/MovieDetail";
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

  const isButtonActive =
    (currentPage === 1 && genre.trim() !== "") ||
    (currentPage === 2 && query.trim() !== "" && isQueryValid);

  return (
    <>
      {currentPage === 1 && <GenreList genre={genre} setGenre={setGenre} />}
      {currentPage === 2 && (
        <MovieSearch
          query={query}
          setQuery={setQuery}
          onValidationChange={setIsQueryValid}
          onEnter={handleContinue}
        />
      )}
      {currentPage === 3 && (
        <Routes>
          <Route
            index
            element={
              <MovieResults
                movieTitle={query}
                onResults={(found) => setResultsFound(found)}
              />
            }
          />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Routes>
      )}

      <Btn
        isActive={isButtonActive}
        onContinue={handleContinue}
        isHidden={currentPage === 3 && !resultsFound}
        label={currentPage === 3 && resultsFound ? "Complete" : "Continue"}
      />

      {currentPage === 3 && <Outlet />}
    </>
  );
};

export default PageRouter;
