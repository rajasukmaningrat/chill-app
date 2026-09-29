// Status langganan tidak disimpan terpisah.
// Semua diturunkan dari order terakhir user di /orders.

import { SUBSCRIPTION_DAYS } from "../constants/placeholderCopy";

export const ORDER_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
};

export const getOrderDate = (order) => order?.paidAt || order?.createdAt || null;

// Kalau expiryDate belum diisi di MockAPI, dihitung dari tanggal bayar
export const getExpiryDate = (order) => {
  if (!order) return null;
  if (order.expiryDate) return new Date(order.expiryDate);

  const start = getOrderDate(order);

  if (!start) return null;

  return new Date(
    new Date(start).getTime() + SUBSCRIPTION_DAYS * 24 * 60 * 60 * 1000
  );
};

// Order terbaru dibuat paling akhir
export const getLatestOrder = (orders) => {
  if (!orders || orders.length === 0) return null;

  return [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];
};

// Order terakhir yang statusnya sudah dibayar dan belum kedaluwarsa
export const getActiveOrder = (orders) => {
  if (!orders || orders.length === 0) return null;

  const paid = orders
    .filter((order) => order.status === ORDER_STATUS.PAID)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    paid.find((order) => {
      const expiry = getExpiryDate(order);

      return expiry && expiry.getTime() > Date.now();
    }) || null
  );
};

export const isSubscribed = (orders) => getActiveOrder(orders) !== null;

// Order yang masih menunggu pembayaran
export const getPendingOrder = (orders) =>
  (orders || []).find((order) => order.status === ORDER_STATUS.PENDING) || null;
