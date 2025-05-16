import styles from "../BtnCheckBox/BtnCheckBox.module.scss";

type Props = {
  selected: boolean;
  onClick: () => void;
};

const CheckboxButton: React.FC<Props> = ({ selected, onClick }) => {
  return (
    <button
      className={`${styles.checkbox} ${selected ? styles.selected : ""}`}
      aria-pressed={selected}
      type="button"
      onClick={onClick}
    >
      {selected && <span className={styles.check}>✔</span>}
    </button>
  );
};

export default CheckboxButton;
