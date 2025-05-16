import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className={styles["progress-bar-container"]}>
      <div className={styles["progress-bar"]}>
        <div
          className={styles["progress-bar-fill"]}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
