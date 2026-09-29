import { API_URL } from "./config";

const EPISODES_URL = `${API_URL}/episodes`;

// GET EPISODE SATU SERIES ATAU FILM
export const getEpisodes = async (movieId) => {
  const response = await fetch(
    `${EPISODES_URL}?movieId=${encodeURIComponent(movieId)}`
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data episode");
  }

  return response.json();
};

// GET SEMUA EPISODE SEKALIGUS untuk menghitung jumlah episode per film
export const getAllEpisodes = async () => {
  const response = await fetch(EPISODES_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil data episode");
  }

  return response.json();
};
