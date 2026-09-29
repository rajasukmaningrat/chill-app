import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Film from "./pages/Film";
import DaftarSaya from "./pages/DaftarSaya";
import PilihPaket from "./pages/PilihPaket";
import Pembayaran from "./pages/Pembayaran";
import MenungguPembayaran from "./pages/MenungguPembayaran";
import Profil from "./pages/Profil";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/series" element={<Series />} />
        <Route path="/film" element={<Film />} />
        <Route path="/my-list" element={<DaftarSaya />} />
        <Route path="/pilih-paket" element={<PilihPaket />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route
          path="/pembayaran/menunggu/:orderId"
          element={<MenungguPembayaran />}
        />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
