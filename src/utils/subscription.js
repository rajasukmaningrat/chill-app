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

// Array dari API kadang berisi null, filter dulu sebelum dibandingkan
const validOrders = (orders) => (orders || []).filter(Boolean);

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
  const list = validOrders(orders);

  if (list.length === 0) return null;

  return [...list].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];
};

// Order terakhir yang statusnya sudah dibayar dan belum kedaluwarsa
export const getActiveOrder = (orders) => {
  const list = validOrders(orders);

  if (list.length === 0) return null;

  const paid = list
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
  validOrders(orders).find(
    (order) => order.status === ORDER_STATUS.PENDING
  ) || null;
