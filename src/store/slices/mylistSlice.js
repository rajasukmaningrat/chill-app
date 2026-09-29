import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getMyList, addMyListItem, removeMyListItem } from "../../services/api/mylist";

const initialState = {
  myList: [],
  userId: null,
  loading: false,
  error: null,
};

export const fetchMyList = createAsyncThunk(
  "mylist/fetchMyList",
  async (userId) => getMyList(userId)
);

// Satu thunk untuk tombol centang di hover card.
// Kalau film sudah ada di store maka hapus, kalau belum maka tambah.
export const toggleMyList = createAsyncThunk(
  "mylist/toggleMyList",
  async ({ userId, movieId }, { getState }) => {
    const { myList } = getState().mylist;

    const existing = myList.find(
      (item) => String(item.movieId) === String(movieId)
    );

    if (existing) {
      await removeMyListItem(existing.id);
      return { movieId, added: false };
    }

    const created = await addMyListItem({ userId: String(userId), movieId: String(movieId) });

    return { movieId, added: true, item: created };
  }
);

const myListSlice = createSlice({
  name: "mylist",
  initialState,
  reducers: {
    clearMyList(state) {
      state.myList = [];
      state.userId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyList.fulfilled, (state, action) => {
        state.loading = false;
        state.myList = action.payload;
        state.userId = action.meta.arg;
      })
      .addCase(fetchMyList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleMyList.pending, (state) => {
        state.error = null;
      })
      .addCase(toggleMyList.fulfilled, (state, action) => {
        const { movieId, added, item } = action.payload;

        if (added) {
          state.myList.push(item);
        } else {
          state.myList = state.myList.filter(
            (saved) => String(saved.movieId) !== String(movieId)
          );
        }
      })
      .addCase(toggleMyList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearMyList } = myListSlice.actions;

export default myListSlice.reducer;
