import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPackages } from "../../services/api/package";

const initialState = {
  packages: [],
  loading: false,
  error: null,
};

export const fetchPackages = createAsyncThunk(
  "package/fetchPackages",
  async () => getPackages()
);

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPackagesLoading(state, action) {
      state.loading = action.payload;
    },
    setPackagesError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPackagesLoading, setPackagesError } = packageSlice.actions;

export default packageSlice.reducer;
