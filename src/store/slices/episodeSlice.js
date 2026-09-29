import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getEpisodes } from "../../services/api/episode";

const initialState = {
  episodes: [],
  movieId: null,
  loading: false,
  error: null,
};

export const fetchEpisodes = createAsyncThunk(
  "episode/fetchEpisodes",
  async (movieId) => getEpisodes(movieId)
);

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    clearEpisodes(state) {
      state.episodes = [];
      state.movieId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        state.episodes = action.payload;
        state.movieId = action.meta.arg;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearEpisodes } = episodeSlice.actions;

export default episodeSlice.reducer;
