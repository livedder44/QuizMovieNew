import styles from "./BtnContinue.module.scss";

type BtnProps = {
  onContinue: () => void;
  isHidden?: boolean;
  isActive?: boolean;
  label?: string;
};

const Btn: React.FC<BtnProps> = ({ onContinue, isHidden = false, isActive = false, label = "Continue" }) => {
  const isClickable = isActive || label === "Complete";
  const buttonClass = isClickable ? styles["btn-active"] : styles["btn-noactive"];

  return (
    <div className={styles.btnContainer}>
      {!isHidden && (
        <button
          type="button"
          onClick={isClickable ? onContinue : undefined}
          className={`${styles.btn} ${buttonClass}`}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default Btn;
