import { API_URL } from "./config";

const MYLIST_URL = `${API_URL}/mylist`;

// GET DAFTAR SAYA MILIK SEBUAH USER
export const getMyList = async (userId) => {
  const response = await fetch(
    `${MYLIST_URL}?userId=${encodeURIComponent(userId)}`
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil Daftar Saya");
  }

  return response.json();
};

// TAMBAH FILM KE DAFTAR SAYA
export const addMyListItem = async (item) => {
  const response = await fetch(MYLIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Gagal menambah ke Daftar Saya");
  }

  return response.json();
};

// HAPUS FILM DARI DAFTAR SAYA
export const removeMyListItem = async (id) => {
  const response = await fetch(`${MYLIST_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Gagal menghapus dari Daftar Saya");
  }

  return response.json();
};
