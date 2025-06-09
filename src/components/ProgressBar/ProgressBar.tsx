import { useLocation } from "react-router-dom";
import styles from "./ProgressBar.module.scss";
import { getTotalPages } from "../../utilts/getTotalPages";

const ProgressBar = () => {
  const location = useLocation();
  const totalPages = getTotalPages();

  const match =
    location.pathname.match(/\/(\d+)$/) || location.search.match(/from=(\d+)/);
  const currentPage = match ? Number(match[1]) : 1;

  const progress = Math.min((currentPage / totalPages) * 100, 100);

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
