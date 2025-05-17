import genres from "./GenreList.json";
import GenreItem from "../GerneItem/GenreItem";
import styles from "./GenreList.module.scss";


type Genre = {
  id: string;
  icon: string;
  label: string;
};

type Props = {
  genre: string;
  setGenre: (id: string) => void;
};

const GenreList: React.FC<Props> = ({ genre, setGenre }) => {
  const handleSelect = (id: string) => {
    // викликаємо навіть якщо genre === id
    setGenre(id);
  };

  return (
    <div className={styles.list}>
      <h2 className={styles.genreHead}>Your favorite movie genre?</h2>
      {(genres as Genre[]).map((g) => (
        <GenreItem
          key={g.id}
          icon={g.icon}
          label={g.label}
          selected={genre === g.id}
          onClick={() => handleSelect(g.id)}
        />
      ))}
    </div>
  );
};

export default GenreList;
