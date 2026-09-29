import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getOrdersByUser, createOrder } from "../../services/api/order";

const initialState = {
  orders: [],
  userId: null,
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (userId) => getOrdersByUser(userId)
);

// Order dibuat saat user menekan tombol Bayar
export const submitOrder = createAsyncThunk(
  "order/submitOrder",
  async (order) => createOrder(order)
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.userId = action.meta.arg;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;

export default orderSlice.reducer;
