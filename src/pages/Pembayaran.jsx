import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import PackageCard from "../components/payment/PackageCard";
import Loading from "../components/common/Loading";

import { useAuth } from "../context/AuthContext";

import { fetchPackages } from "../store/slices/packageSlice";
import { submitOrder } from "../store/slices/orderSlice";
import { submitPayment } from "../store/slices/paymentSlice";

import { formatRupiah, generateVirtualAccount } from "../utils/format";
import { PAYMENT_METHODS } from "../utils/paymentMethod";

// Halaman Pembayaran, Figma 14.1
function Pembayaran() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  const [method, setMethod] = useState("bca");
  const [voucher, setVoucher] = useState("");
  const [voucherNote, setVoucherNote] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState("");

  const packages = useSelector((state) => state.package.packages);
  const loading = useSelector((state) => state.package.loading);
  const loadError = useSelector((state) => state.package.error);

  const packageId = searchParams.get("paket");
  const selectedPackage = packages.find(
    (item) => String(item.id) === String(packageId)
  );

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  // Voucher hanya tampilan, belum ada aturan diskonnya
  const handleVoucher = () => {
    if (!voucher.trim()) {
      setVoucherNote("Masukkan kode voucher terlebih dahulu.");
      return;
    }

    setVoucherNote(`Kode "${voucher.trim()}" tercatat. Diskon belum dihitung.`);
  };

  const handlePay = async () => {
    if (!selectedPackage || !user) return;

    setIsPaying(true);
    setPayError("");

    const total = Number(selectedPackage.price) + Number(selectedPackage.adminFee);

    try {
      // Order dibuat dulu supaya pembayaran bisa menunjuk ke order tersebut
      const newOrder = await dispatch(
        submitOrder({
          userId: String(user.id),
          packageId: String(selectedPackage.id),
          packageName: selectedPackage.name,
          price: Number(selectedPackage.price),
          adminFee: Number(selectedPackage.adminFee),
          total,
          status: "pending",
          method,
        })
      ).unwrap();

      await dispatch(
        submitPayment({
          orderId: String(newOrder.id),
          userId: String(user.id),
          method,
          virtualAccount: generateVirtualAccount(),
          amount: total,
          status: "pending",
        })
      ).unwrap();

      navigate(`/pembayaran/menunggu/${newOrder.id}`);
    } catch (error) {
      setPayError(error.message || "Gagal membuat pembayaran.");
      setIsPaying(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="account-page">
        <h1 className="account-title">Pembayaran</h1>

        {loading ? (
          <Loading label="Memuat paket..." />
        ) : loadError ? (
          <p className="browse-error">{loadError}</p>
        ) : !selectedPackage ? (
          <p className="browse-empty">
            Paket belum dipilih.{" "}
            <Link to="/pilih-paket">Pilih paket dulu</Link>.
          </p>
        ) : (
          <div className="payment-layout">
            <section className="payment-package">
              <PackageCard item={selectedPackage} selected />
            </section>

            <section className="payment-form">
              <h2 className="payment-heading">Metode Pembayaran</h2>

              <div className="method-list">
                {PAYMENT_METHODS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      className={`method-item${method === item.id ? " is-active" : ""}`}
                      onClick={() => setMethod(item.id)}
                      aria-pressed={method === item.id}
                    >
                      <Icon size={22} />

                      <span className="method-text">
                        <strong>{item.label}</strong>
                        <small>{item.note}</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <h2 className="payment-heading">Voucher</h2>

              <div className="voucher-row">
                <input
                  className="voucher-input"
                  type="text"
                  placeholder="Masukkan kode voucher"
                  value={voucher}
                  onChange={(event) => {
                    setVoucher(event.target.value);
                    setVoucherNote("");
                  }}
                />

                <button className="btn-info" onClick={handleVoucher}>
                  Gunakan
                </button>
              </div>

              {voucherNote && (
                <p className="payment-hint">{voucherNote}</p>
              )}

              <h2 className="payment-heading">Ringkasan Transaksi</h2>

              <ul className="summary-list">
                <li>
                  <span>Harga Paket</span>
                  <strong>{formatRupiah(selectedPackage.price)}</strong>
                </li>

                <li>
                  <span>Biaya Admin</span>
                  <strong>{formatRupiah(selectedPackage.adminFee)}</strong>
                </li>

                <li className="summary-total">
                  <span>Total</span>
                  <strong>{formatRupiah(selectedPackage.total)}</strong>
                </li>
              </ul>

              {payError && <p className="browse-error">{payError}</p>}

              <button
                className="btn-play payment-button"
                onClick={handlePay}
                disabled={isPaying}
              >
                {isPaying ? "Memproses..." : "Bayar"}
              </button>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Pembayaran;
