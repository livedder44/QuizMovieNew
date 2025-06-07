
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieState {
  movies: Movie[];
}

const initialState: MovieState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
});

export const { setMovies, clearMovies } = movieSlice.actions;
export default movieSlice.reducer;
