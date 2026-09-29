import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "../context/AuthContext";
import { fetchOrders } from "../store/slices/orderSlice";
import { isSubscribed } from "../utils/subscription";

// Menahan tombol Mulai untuk konten Premium kalau user belum berlangganan.
// Kalau sudah berlangganan atau filmnya gratis, tidak ada yang dibuka karena
// halaman player belum dibuat (Figma 10.1-10.5 dan 11.1 di luar lingkup).
export function usePremiumPlayback() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const orders = useSelector((state) => state.order.orders);
  const [premiumMovie, setPremiumMovie] = useState(null);

  useEffect(() => {
    if (user?.id && orders.length === 0) {
      dispatch(fetchOrders(user.id));
    }
  }, [dispatch, user?.id, orders.length]);

  const handlePlay = (movie) => {
    if (!movie) return;

    if (movie.isPremium && !isSubscribed(orders)) {
      setPremiumMovie(movie);
    }
  };

  return {
    handlePlay,
    premiumMovie,
    closePremium: () => setPremiumMovie(null),
  };
}
