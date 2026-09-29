import { API_URL } from "./config";

const PACKAGES_URL = `${API_URL}/packages`;

// GET SEMUA PAKET
export const getPackages = async () => {
  const response = await fetch(PACKAGES_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil data paket");
  }

  return response.json();
};
