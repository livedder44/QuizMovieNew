import { useLocation } from "react-router-dom";
import styles from './Counter.module.scss';
import { getTotalPages } from "../../utilts/getTotalPages";

const Counter: React.FC = () => {
  const location = useLocation();
  const totalPages = getTotalPages();

  const match =
    location.pathname.match(/\/(\d+)$/) || location.search.match(/from=(\d+)/);
  const currentPage = match ? Number(match[1]) : 1;

  const percent = Math.round((currentPage / totalPages) * 100);

  return <span className={styles.counter}>{percent}%</span>;
};

export default Counter;
