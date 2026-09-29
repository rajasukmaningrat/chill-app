import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import PackageCard from "../components/payment/PackageCard";
import Loading from "../components/common/Loading";

import { fetchPackages } from "../store/slices/packageSlice";

// Teks ini belum terbaca jelas di Figma, dipakai sebagai contoh
const BENEFITS = [
  "Ribuan film dan series siap ditonton",
  "Tanpa iklan yang mengganggu",
  "Konten baru setiap minggu",
  "Tonton di HP, tablet, laptop, dan TV",
  "Kualitas gambar hingga 4K",
  "Unduh untuk ditonton tanpa internet",
];

function PilihPaket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const packages = useSelector((state) => state.package.packages);
  const loading = useSelector((state) => state.package.loading);
  const error = useSelector((state) => state.package.error);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  // Paket yang dipilih dikirim lewat query param supaya tetap ada saat halaman di-refresh
  const choosePackage = (item) => {
    navigate(`/pembayaran?paket=${item.id}`);
  };

  return (
    <>
      <Navbar />

      <main className="account-page">
        <section className="benefit-section">
          <h1 className="account-title">Kenapa Harus Berlangganan?</h1>

          <ul className="benefit-grid">
            {BENEFITS.map((benefit) => (
              <li className="benefit-item" key={benefit}>
                <Check size={18} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="package-section">
          <h2 className="account-title">Pilih Paketmu</h2>

          {loading ? (
            <Loading label="Memuat paket..." />
          ) : error ? (
            <p className="browse-error">{error}</p>
          ) : packages.length === 0 ? (
            <p className="browse-empty">Belum ada paket yang tersedia.</p>
          ) : (
            <div className="package-grid">
              {packages.map((item) => (
                <PackageCard key={item.id} item={item} onSelect={choosePackage} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default PilihPaket;
