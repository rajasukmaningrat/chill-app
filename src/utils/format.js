// Helper format yang dipakai di halaman pembayaran dan profil

export const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number || 0);

export const formatTanggal = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const formatWaktu = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Batas bayar selalu 24 jam setelah order dibuat
export const PAYMENT_WINDOW_HOURS = 24;

export const getDeadline = (createdAt) => {
  if (!createdAt) return null;

  return new Date(
    new Date(createdAt).getTime() + PAYMENT_WINDOW_HOURS * 60 * 60 * 1000
  );
};

// Hitung mundur MM:SS untuk halaman menunggu pembayaran
export const getCountdown = (deadline, now = Date.now()) => {
  if (!deadline) return { hours: "00", minutes: "00", seconds: "00", expired: true };

  const selisih = new Date(deadline).getTime() - now;

  if (selisih <= 0) {
    return { hours: "00", minutes: "00", seconds: "00", expired: true };
  }

  const totalDetik = Math.floor(selisih / 1000);
  const jam = Math.floor(totalDetik / 3600);
  const menit = Math.floor((totalDetik % 3600) / 60);
  const detik = totalDetik % 60;

  return {
    hours: String(jam).padStart(2, "0"),
    minutes: String(menit).padStart(2, "0"),
    seconds: String(detik).padStart(2, "0"),
    expired: false,
  };
};

// Nomor virtual account buatan sendiri, 14 digit seperti VA bank Indonesia
export const generateVirtualAccount = () => {
  let digits = "";

  for (let i = 0; i < 14; i += 1) {
    digits += Math.floor(Math.random() * 10);
  }

  return digits;
};
