import styles from './Counter.module.scss';

type CounterProps = {
  currentPage: number;
  totalPages: number;
};

const Counter: React.FC<CounterProps> = ({ currentPage, totalPages }) => {
  const percent = Math.round((currentPage / totalPages) * 100);

  return <span className={styles.counter}>{percent}%</span>;
};

export default Counter;
