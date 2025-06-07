import { useState, useEffect } from "react";
import genres from "./GenreList.json";
import GenreItem from "../GerneItem/GenreItem";
import styles from "./GenreList.module.scss";

type Genre = {
  id: string;
  icon: string;
  label: string;
};



const GenreList = () => {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("genre");
    if (stored) setSelected(stored);
  }, []);

  const handleSelect = (id: string) => {
    localStorage.setItem("genre", id);
    setSelected(id);
    window.dispatchEvent(new Event("localStorageChange"));
  };

  return (
    <div className={styles.list}>
      <h2 className={styles.genreHead}>Your favorite movie genre?</h2>
      {(genres as Genre[]).map((g) => (
        <GenreItem
          key={g.id}
          icon={g.icon}
          label={g.label}
          selected={selected === g.id}
          onClick={() => handleSelect(g.id)}
        />
      ))}
    </div>
  );
};

export default GenreList;
