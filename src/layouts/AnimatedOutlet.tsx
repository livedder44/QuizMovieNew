
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const transition = {
  initial: { opacity: 0, y: 70 },
  animate: { opacity: 2, y: 0 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

const AnimatedOutlet = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...transition}>
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
