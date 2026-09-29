import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Series from "./pages/Series";
import Film from "./pages/Film";
import DaftarSaya from "./pages/DaftarSaya";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
