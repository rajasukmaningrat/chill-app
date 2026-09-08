import { API_URL } from "./config";

export const getMovies = async () => {
  const response = await fetch(`${API_URL}/movie`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data movie");
  }

  return response.json();
};

export const createMovie = async (movie) => {
  const response = await fetch(`${API_URL}/movie`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Gagal menambahkan movie");
  }

  return response.json();
};

export const updateMovie = async (id, movie) => {
  const response = await fetch(`${API_URL}/movie/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error("Gagal mengubah movie");
  }

  return response.json();
};

export const deleteMovieApi = async (id) => {
  const response = await fetch(`${API_URL}/movie/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Gagal menghapus movie");
  }

  return response.json();
};
