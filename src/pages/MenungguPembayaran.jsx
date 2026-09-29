import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Copy, Check } from "lucide-react";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import Loading from "../components/common/Loading";

import { useAuth } from "../context/AuthContext";

import { fetchOrders } from "../store/slices/orderSlice";
import { fetchPayments } from "../store/slices/paymentSlice";

import { formatRupiah, formatWaktu, getDeadline, getCountdown } from "../utils/format";
import { getMethodLabel } from "../utils/paymentMethod";

import { PAYMENT_STEPS } from "../constants/placeholderCopy";

// Langkah pembayaran untuk Virtual Account (lihat constants/placeholderCopy)

// Halaman Menunggu Pembayaran, Figma 15.1
function MenungguPembayaran() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [copied, setCopied] = useState(false);

  const orders = useSelector((state) => state.order.orders);
  const payments = useSelector((state) => state.payment.payments);
  const loading = useSelector((state) => state.order.loading || state.payment.loading);
  const error = useSelector((state) => state.order.error || state.payment.error);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrders(user.id));
      dispatch(fetchPayments(user.id));
    }
  }, [dispatch, user?.id]);

  const order = useMemo(
    () => orders.find((item) => String(item.id) === String(orderId)) || null,
    [orders, orderId]
  );

  const payment = useMemo(
    () => payments.find((item) => String(item.orderId) === String(orderId)) || null,
    [payments, orderId]
  );

  const deadline = getDeadline(order?.createdAt);
  const [now, setNow] = useState(() => Date.now());

  // Detak tiap detik supaya hitung mundur ikut berjalan
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(timer);
  }, []);

  const countdown = getCountdown(deadline, now);

  const copyVa = async () => {
    if (!payment?.virtualAccount) return;

    try {
      await navigator.clipboard.writeText(payment.virtualAccount);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (loading && !order) {
    return (
      <>
        <Navbar />
        <main className="account-page">
          <Loading label="Memuat pembayaran..." />
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="account-page">
          <p className="browse-error">{error}</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Navbar />
        <main className="account-page">
          <p className="browse-empty">
            Data pembayaran tidak ditemukan.{" "}
            <Link to="/pilih-paket">Kembali pilih paket</Link>.
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="account-page">
        <div className="waiting-card">
          <h1 className="account-title">Selesaikan Pembayaran</h1>

          <p className="waiting-lead">
            Selesaikan pembayaran sebelum batas waktu agar paket kamu aktif.
          </p>

          <div className="countdown-box">
            <p className="countdown-label">Batas Waktu Pembayaran</p>

            <div className="countdown-value">
              <span>{countdown.hours}</span>
              <i>:</i>
              <span>{countdown.minutes}</span>
              <i>:</i>
              <span>{countdown.seconds}</span>
            </div>

            <p className="countdown-note">
              {countdown.expired
                ? "Waktu pembayaran sudah habis."
                : "Sisa waktu sebelum pembayaran kedaluwarsa."}
            </p>
          </div>

          <ul className="waiting-detail">
            <li>
              <span>Metode Pembayaran</span>
              <strong>{getMethodLabel(payment?.method || order.method)}</strong>
            </li>

            <li>
              <span>Nominal Tagihan</span>
              <strong>{formatRupiah(order.total)}</strong>
            </li>

            <li>
              <span>Tanggal Pembayaran</span>
              <strong>{formatWaktu(payment?.createdAt || order.createdAt)}</strong>
            </li>

            <li>
              <span>Virtual Account</span>

              <strong className="va-row">
                <span className="va-code">
                  {payment?.virtualAccount || "-"}
                </span>

                {payment?.virtualAccount && (
                  <button className="va-copy" onClick={copyVa}>
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "Tersalin" : "Salin"}
                  </button>
                )}
              </strong>
            </li>
          </ul>

          <h2 className="payment-heading">Cara Pembayaran</h2>

          <ol className="step-list">
            {PAYMENT_STEPS.map((step, index) => (
              <li className="step-item" key={step}>
                <span className="step-number">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <Link className="btn-info waiting-back" to="/profil">
            Kembali ke Profil
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default MenungguPembayaran;
