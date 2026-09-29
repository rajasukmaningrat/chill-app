import { API_URL } from "./config";

const ORDERS_URL = `${API_URL}/orders`;

// GET SEMUA ORDER MILIK SEBUAH USER
export const getOrdersByUser = async (userId) => {
  const response = await fetch(
    `${ORDERS_URL}?userId=${encodeURIComponent(userId)}`
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data order");
  }

  return response.json();
};

// BUAT ORDER BARU SAAT USER MENYETUJUI PEMBAYARAN
export const createOrder = async (order) => {
  const response = await fetch(ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Gagal membuat order");
  }

  return response.json();
};
