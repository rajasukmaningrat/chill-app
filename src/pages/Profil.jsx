import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pencil, Camera } from "lucide-react";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import PosterCard from "../components/browse/PosterCard";
import Loading from "../components/common/Loading";

import { useAuth } from "../context/AuthContext";

import { fetchUser, saveUser } from "../store/slices/userSlice";
import { fetchMovies } from "../store/slices/movieSlice";
import { fetchMyList } from "../store/slices/mylistSlice";
import { fetchOrders } from "../store/slices/orderSlice";

import { formatTanggal } from "../utils/format";
import { getActiveOrder, isSubscribed, getExpiryDate } from "../utils/subscription";

const DAFTAR_PREVIEW_LIMIT = 6;

function Profil({ onPlay }) {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ userName: "", email: "", password: "" });
  const [loadedId, setLoadedId] = useState(null);
  const [notice, setNotice] = useState("");

  const profile = useSelector((state) => state.user.user);
  const saving = useSelector((state) => state.user.loading);
  const userError = useSelector((state) => state.user.error);

  const orders = useSelector((state) => state.order.orders);
  const ordersLoading = useSelector((state) => state.order.loading);

  const movies = useSelector((state) => state.movie.movies);
  const myList = useSelector((state) => state.mylist.myList);
  const myListLoading = useSelector((state) => state.mylist.loading);

  useEffect(() => {
    dispatch(fetchMovies());

    if (user?.id) {
      dispatch(fetchUser(user.id));
      dispatch(fetchMyList(user.id));
      dispatch(fetchOrders(user.id));
    }
  }, [dispatch, user?.id]);

  // Isi form begitu data user dari API sudah tersedia
  if (profile && loadedId !== profile.id) {
    setLoadedId(profile.id);
    setForm({
      userName: profile.userName || "",
      email: profile.email || "",
      password: profile.password || "",
    });
  }

  const subscribed = isSubscribed(orders);
  const activeOrder = getActiveOrder(orders);
  const expiryDate = getExpiryDate(activeOrder);

  const previewMovies = useMemo(
    () =>
      myList
        .map((item) =>
          movies.find((movie) => String(movie.id) === String(item.movieId))
        )
        .filter(Boolean)
        .slice(0, DAFTAR_PREVIEW_LIMIT),
    [myList, movies]
  );

  const toggleEdit = (field) => {
    setNotice("");

    setEditing((current) => (current === field ? null : field));
  };

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setNotice("");

    const changes = { ...form };

    try {
      await dispatch(saveUser({ userId: user.id, changes })).unwrap();

      setEditing(null);
      setNotice("Data berhasil disimpan.");
    } catch {
      setNotice("Gagal menyimpan data. Coba lagi.");
    }
  };

  const isLoading = ordersLoading || myListLoading;

  return (
    <>
      <Navbar />

      <main className="account-page">
        <h1 className="account-title">Profil Saya</h1>

        <div className="profil-layout">
          <section className="profil-form">
            <div className="profil-avatar">
              {profile?.avatar ? (
                <img src={profile.avatar} alt={profile.name} />
              ) : (
                <span className="profil-avatar-empty">CHILL</span>
              )}

              <button className="avatar-button" type="button">
                <Camera size={16} />
                Ubah Foto
              </button>
            </div>

            {userError && <p className="browse-error">{userError}</p>}

            <div className="field-row">
              <label htmlFor="profile-name">Nama Pengguna</label>

              <input
                id="profile-name"
                type="text"
                value={form.userName}
                onChange={handleChange("userName")}
                readOnly={editing !== "userName"}
              />

              <button
                className="field-edit"
                onClick={() => toggleEdit("userName")}
                aria-label="Ubah Nama Pengguna"
              >
                <Pencil size={16} />
              </button>
            </div>

            <div className="field-row">
              <label htmlFor="profile-email">Email</label>

              <input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                readOnly={editing !== "email"}
              />

              <button
                className="field-edit"
                onClick={() => toggleEdit("email")}
                aria-label="Ubah Email"
              >
                <Pencil size={16} />
              </button>
            </div>

            <div className="field-row">
              <label htmlFor="profile-password">Kata Sandi</label>

              <input
                id="profile-password"
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                readOnly={editing !== "password"}
              />

              <button
                className="field-edit"
                onClick={() => toggleEdit("password")}
                aria-label="Ubah Kata Sandi"
              >
                <Pencil size={16} />
              </button>
            </div>

            {notice && <p className="payment-hint">{notice}</p>}

            <button
              className="btn-play profil-save"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </section>

          <aside className="profil-side">
            {subscribed ? (
              <div className="subscribe-card is-premium">
                <h2>Akun Premium Individual</h2>

                <p className="subscribe-plan">{activeOrder.packageName}</p>

                <p className="subscribe-expiry">
                  Berlaku sampai {formatTanggal(expiryDate)}
                </p>

                <Link className="btn-info" to="/pilih-paket">
                  Ubah Paket
                </Link>
              </div>
            ) : (
              <div className="subscribe-card">
                <h2>Belum Berlangganan</h2>

                <p>
                  Nikmati semua konten Premium dengan jadi langganan Chill.
                </p>

                <Link className="subscribe-cta" to="/pilih-paket">
                  Mulai Berlangganan
                </Link>
              </div>
            )}

            <section className="profil-mylist">
              <div className="profil-mylist-head">
                <h2>Daftar Saya</h2>

                <Link to="/my-list" className="profil-mylist-link">
                  Lihat Semua
                </Link>
              </div>

              {myListLoading ? (
                <Loading label="Memuat Daftar Saya..." />
              ) : previewMovies.length === 0 ? (
                <p className="browse-empty">
                  Belum ada film di Daftar Saya kamu.
                </p>
              ) : (
                <div className="profil-mylist-grid">
                  {previewMovies.map((movie) => (
                    <PosterCard key={movie.id} movie={movie} onPlay={onPlay} />
                  ))}
                </div>
              )}
            </section>
          </aside>
        </div>

        {isLoading && <Loading label="Memuat data..." />}
      </main>

      <Footer />
    </>
  );
}

export default Profil;
