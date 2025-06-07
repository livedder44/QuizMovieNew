
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import styles from "./Loader.module.scss";

const HTMLContent = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 5,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, []);

  return (
    <div className={styles.container}>
      <motion.pre className={styles.counter}>{rounded}</motion.pre>
    </div>
  );
};

export default HTMLContent;
