import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserById, updateUser } from "../../services/api/auth";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Data lengkap user (nama, avatar, dan password) hanya dipakai di halaman Profil
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId) => getUserById(userId)
);

export const saveUser = createAsyncThunk(
  "user/saveUser",
  async ({ userId, changes }) => updateUser(userId, changes)
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
