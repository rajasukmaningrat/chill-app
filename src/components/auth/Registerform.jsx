import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

function Registerform() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok!");
      return;
    }

    const result = await register(userName, email, password);

    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Daftar dengan Google");
  };

  return (
    <section className="login-container">
      <div className="logo">
        <span className="logo-icon">
          <img src={logo} alt="logo" />
        </span>
      </div>

      <h2>Daftar</h2>
      <p className="subtitle">Selamat datang!</p>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleRegister}>
        <Input
          label="Username"
          id="username"
          type="text"
          placeholder="Masukan Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="Masukan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Masukan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Konfirmasi Password</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="form-options">
          <p className="register-link">
            Sudah punya akun?{" "}
            <Link to="/login">Masuk</Link>
          </p>
        </div>

        <Button type="submit" variant="login">
          Daftar
        </Button>

        <div className="login-divider">
          <span>atau</span>
        </div>

        <Button
          type="button"
          variant="google"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="google-icon" />
          <span>Daftar dengan Google</span>
        </Button>
      </form>
    </section>
  );
}

export default Registerform;

