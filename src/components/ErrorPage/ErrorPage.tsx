import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.message}><span className={styles.head}>🤦‍♀️</span><span className={styles.text}>Oops, no movie found</span></h2>
    </div>
  );
};

export default ErrorPage;
