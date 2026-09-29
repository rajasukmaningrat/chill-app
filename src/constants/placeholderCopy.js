// Kumpulan teks dan angka yang ASALNYA SAYA KARANG sendiri karena tidak
// terbaca jelas di Figma. Semua nilai di file ini harus dicek ulang ke Figma
// sebelum designship.
//
// File ini sengaja dipisah dari komponen supaya:
//
// 1. mudah diganti kalo Figma ternyata punya teks aslinya
// 2. mudah diaudit saat demo / review
//
// PENTING: jangan ubah nilai di sini tanpa sengaja mengubah tampilan atau
// perilakunya. Semuanya dipakai apa adanya oleh halaman terkait.

/* ------------------------------------------------------------------ *
 * PILIH PAKET - Figma 13.1
 * 6 keunggulan berlangganan. Teks karangan, belum dicek ke Figma.
 * TODO: verify with Figma - ganti dengan teks asli dari desain.
 * ------------------------------------------------------------------ */
export const SUBSCRIPTION_BENEFITS = [
  "Ribuan film dan series siap ditonton",
  "Tanpa iklan yang mengganggu",
  "Konten baru setiap minggu",
  "Tonton di HP, tablet, laptop, dan TV",
  "Kualitas gambar hingga 4K",
  "Unduh untuk ditonton tanpa internet",
];

/* ------------------------------------------------------------------ *
 * MENUNGGU PEMBAYARAN - Figma 15.1
 * 5 langkah cara bayar lewat Virtual Account. Teks karangan.
 * TODO: verify with Figma - ganti dengan teks asli dari desain.
 * ------------------------------------------------------------------ */
export const PAYMENT_STEPS = [
  "Buka aplikasi m-banking atau ATM BCA",
  "Pilih menu Transfer ke Virtual Account",
  "Masukkan nomor virtual account di atas",
  "Periksa jumlah tagihan lalu konfirmasi",
  "Selesai, akun kamu otomatis aktif",
];

/* ------------------------------------------------------------------ *
 * PREMIUM MODAL - Figma 10.6
 * whole modal ini masih placeholder, soalnya desainnya kecil dan tidak
 * kebaca. Semua string di bawah ini karangan.
 * TODO: verify with Figma - ganti dengan teks asli dari desain.
 * ------------------------------------------------------------------ */
export const PREMIUM_MODAL = {
  title: "Konten Premium",
  // {title} diganti dengan judul film yang dicoba ditonton
  body: "{title} hanya bisa ditonton oleh pengguna Premium. Berlangganan dulu untuk menontonnya.",
  primary: "Mulai Berlangganan",
  secondary: "Nanti Saja",
  closeLabel: "Tutup",
};

/* ------------------------------------------------------------------ *
 * KODE VIRTUAL ACCOUNT - dipakai di Pembayaran (Figma 14.1) dan
 * Menunggu Pembayaran (Figma 15.1).
 *
 * Seed /packages di mockapi-seed/packages.json punya harga placeholder,
 * TAPI biaya admin di bawah ini TIDAK dipakai untuk tampilan. Nilai yang
 * dikirim ke /orders dan /payments tetap diambil dari adminFee milik
 * resource /packages, bukan dari sini.
 *
 * Seed placeholder sekarang: Individual 100000, Berdua 150000,
 * Keluarga 200000, adminFee 3000. Jangan diubah di sini.
 *
 * TODO: verify with Figma - cek prefix bank (mis. 8808) dan panjang
 * digits yang sebenarnya dipakai desain.
 * ------------------------------------------------------------------ */
export const VA_LENGTH = 14;

/* ------------------------------------------------------------------ *
 * DURASI MASA LANGGANAN
 * Dipakai utils/subscription.js sebagai fallback kalau order.expiryDate
 * belum diisi di MockAPI. Angka karangan, belum dari Figma.
 * TODO: verify with Figma - cek apakah UI menulis "30 hari" atau lain.
 * ------------------------------------------------------------------ */
export const SUBSCRIPTION_DAYS = 30;

/* ------------------------------------------------------------------ *
 * BATAS WAKTU PEMBAYARAN
 * Dipakai utils/format.js untuk menghitung deadline dari order.createdAt.
 * Deadline tidak disimpan di MockAPI, jadi dihitung ulang tiap render.
 * Angka karangan, belum dari Figma.
 * TODO: verify with Figma - cek jam yang tampil di desain (mis. 23:59:59
 * vs 24 jam penuh).
 * ------------------------------------------------------------------ */
export const PAYMENT_WINDOW_HOURS = 24;

/* ------------------------------------------------------------------ *
 * CATATAN LAIN YANG PERLU DICEK KE FIGMA
 *
 * - Nama/deskripsi paket (Individual, Berdua, Keluarga) ada di
 *   mockapi-seed/packages.json. Sudah sesuai Figma? belum dicek.
 * - Label metode pembayaran (Kartu Debit / Kredit, BCA Virtual Account)
 *   ada di src/utils/paymentMethod.js. Sudah sesuai Figma? belum dicek.
 * - Copy "Nikmati semua konten Premium dengan jadi langganan Chill."
 *   di src/pages/Profil.jsx (Figma 12.2) masih karangan.
 * ------------------------------------------------------------------ */
