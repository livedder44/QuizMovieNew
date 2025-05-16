import styles from './Header.module.scss';
import BtnBack from '../BtnBack/BtnBack';
import Counter from '../Counter/Counter';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import ProgressBar from '../ProgressBar/ProgressBar';
import useProgress from '../../hooks/useProgress';

const Header: React.FC = () => {
  const { currentPage, totalPages, progress } = useProgress();

  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <BtnBack />
        <div className={styles.right}>
          <Counter currentPage={currentPage} totalPages={totalPages} />
          <BurgerMenu />
        </div>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
};

export default Header;
