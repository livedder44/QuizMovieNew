import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GenreList from "./components/GenreList/GenreList";
import MovieSearch from "./components/MovieInput/MovieSearch";
import MovieResults from "./components/MovieResults/MovieResults";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import ErrorPage from "./components/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/QuizMovieNew/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="1" replace /> },
      { path: "1", element: <GenreList /> },
      { path: "2", element: <MovieSearch /> },
      { path: "3", element: <MovieResults /> },
      { path: "error", element: <ErrorPage /> },
    ],
  },
  {
    path: "/QuizMovieNew/movie/:id",
    element: <Layout />, 
    children: [
      {
        index: true,
        element: <MovieDetail />,
      },
    ],
  },
]);
