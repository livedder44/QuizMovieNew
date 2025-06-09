// Layout.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import BtnContinue from "../components/BtnContinue/BtnContinue";
import styles from "./Layout.module.scss";
import AnimatedOutlet from "./AnimatedOutlet";


const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const match = location.pathname.match(/\/(\d+)$/);
  const pageNumber = match ? Number(match[1]) : 1;
  const totalSteps = 3;

  const [isActive, setIsActive] = useState(false);

  const handleContinue = () => {
    if (pageNumber === 2) {
      window.dispatchEvent(new Event("tryMovieSearchContinue"));
      return;
    }

    if (pageNumber < totalSteps) {
      navigate(`/QuizMovieNew/${pageNumber + 1}`);
    } else {
      localStorage.clear();
      navigate("/QuizMovieNew/1");
    }
  };

  const updateActiveState = () => {
    const path = location.pathname;

    if (path.includes("/1")) {
      const selectedGenre = localStorage.getItem("genre");
      setIsActive(!!selectedGenre);
    } else if (path.includes("/2")) {
      const query = localStorage.getItem("query") || "";
      const hasLetters = /[a-zA-Zа-яА-ЯіІїЇєЄ]/.test(query);
      setIsActive(query.trim() !== "" && hasLetters);
    } else {
      setIsActive(true);
    }
  };

  useEffect(() => {
    updateActiveState();
  }, [location]);

  useEffect(() => {
    window.addEventListener("localStorageChange", updateActiveState);
    return () => window.removeEventListener("localStorageChange", updateActiveState);
  }, []);

  const isHidden = !/\/\d+$/.test(location.pathname);
  const label = pageNumber === totalSteps ? "Complete" : "Continue";

  return (
    <div className={styles.wrapper}>
      <Header />
      <AnimatedOutlet />

      <BtnContinue
        onContinue={handleContinue}
        isActive={isActive}
        isHidden={isHidden}
        label={label}
      />
    </div>
  );
};

export default Layout;
