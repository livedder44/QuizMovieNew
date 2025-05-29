import { useNavigate, useLocation } from "react-router-dom";
import styles from "./BtnBack.module.scss";

const BtnBack: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname.includes("/movie/")) {
      navigate(-1); // ⬅️ повернення на MovieResults
    } else {
      const match = location.pathname.match(/\/page\/(\d+)/);
      const currentPage = match ? parseInt(match[1], 10) : 1;
      const previousPage = Math.max(currentPage - 1, 1);
      navigate(`/page/${previousPage}`);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={styles.btn}>
      {/* Іконка або текст */}
    </button>
  );
};

export default BtnBack;
