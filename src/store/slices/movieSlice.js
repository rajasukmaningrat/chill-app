import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setMovies(state, action) {
      state.movies = action.payload;
    },
    addMovie(state, action) {
      state.movies.push(action.payload);
    },
    updateMovieInStore(state, action) {
      const updated = action.payload;
      const index = state.movies.findIndex(
        (movie) => movie.id === updated.id
      );
      if (index !== -1) {
        state.movies[index] = updated;
      }
    },
    removeMovie(state, action) {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const {
  setLoading,
  setError,
  setMovies,
  addMovie,
  updateMovieInStore,
  removeMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
