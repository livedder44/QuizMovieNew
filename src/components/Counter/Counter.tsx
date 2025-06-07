import { useLocation } from "react-router-dom";
import styles from './Counter.module.scss';

type CounterProps = {
  totalPages: number;
};

const Counter: React.FC<CounterProps> = ({ totalPages }) => {
  const location = useLocation();

  const match = location.pathname.match(/\/(\d+)$/);
  const currentPage = match ? Number(match[1]) : 1;

  const percent = Math.round((currentPage / totalPages) * 100);

  return <span className={styles.counter}>{percent}%</span>;
};

export default Counter;
