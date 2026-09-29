import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPaymentsByUser, createPayment } from "../../services/api/payment";

const initialState = {
  payments: [],
  userId: null,
  loading: false,
  error: null,
};

export const fetchPayments = createAsyncThunk(
  "payment/fetchPayments",
  async (userId) => getPaymentsByUser(userId)
);

// Pembayaran dibuat bersamaan dengan order, bukan dari user
export const submitPayment = createAsyncThunk(
  "payment/submitPayment",
  async (payment) => createPayment(payment)
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
        state.userId = action.meta.arg;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments.push(action.payload);
      })
      .addCase(submitPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearPaymentError } = paymentSlice.actions;

export default paymentSlice.reducer;
