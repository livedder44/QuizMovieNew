import { createBrowserRouter } from "react-router-dom";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import ErrorPage from "./components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/movie/:id",
    element: <MovieDetail />,
    errorElement: <ErrorPage />,
  },
]);
