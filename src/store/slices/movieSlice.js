import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getMovies } from "../../services/api/movie";
import { mapMovieFromApi } from "../../utils/movieMapper";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

// Dipakai halaman Series, Film, dan Daftar Saya supaya tidak ambil data berkali-kali
export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async () => {
    const data = await getMovies();

    return data.map(mapMovieFromApi);
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
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
