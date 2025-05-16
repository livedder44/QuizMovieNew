import styles from "./GenreItem.module.scss";
import CheckboxButton from "../BtnCheckBox/BtnCheckBox";

type GenreItemProps = {
  icon: string;
  label: string;
  selected: boolean;
  onClick: () => void;
};

const GenreItem: React.FC<GenreItemProps> = ({ icon, label, selected, onClick }) => {
  return (
    <div className={`${styles.item} ${selected ? styles.selected : ""}`} onClick={onClick}>
      <div className={styles.left}>
        <span className={styles.icon}>{icon}</span>
        <span className={styles.label}>{label}</span>
      </div>
      <CheckboxButton selected={selected} onClick={onClick} />
    </div>
  );
};

export default GenreItem;
