import { API_URL } from "./config";

const PAYMENTS_URL = `${API_URL}/payments`;

// GET SEMUA PEMBAYARAN MILIK SEBUAH USER
export const getPaymentsByUser = async (userId) => {
  const response = await fetch(
    `${PAYMENTS_URL}?userId=${encodeURIComponent(userId)}`
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data pembayaran");
  }

  return response.json();
};

// BUAT DATA PEMBAYARAN BERSAMAAN DENGAN ORDER
export const createPayment = async (payment) => {
  const response = await fetch(PAYMENTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payment),
  });

  if (!response.ok) {
    throw new Error("Gagal membuat pembayaran");
  }

  return response.json();
};
