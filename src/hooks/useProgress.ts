import { useLocation } from "react-router-dom";

const useProgress = () => {
  const location = useLocation();
  const match = location.pathname.match(/\/page\/(\d+)/);
  const currentPage = match ? parseInt(match[1], 10) : 1;
  const totalPages = 3;
  const progress = Math.round((currentPage / totalPages) * 100);

  return { currentPage, totalPages, progress };
};

export default useProgress;