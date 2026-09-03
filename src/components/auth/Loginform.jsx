import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await login(userName, password);

    if (result.success) {
      navigate("/home");
    } else {
      setError(result.message);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login dengan Google");
  };

  return (
    <section className="login-container">
      <div className="logo">
        <span className="logo-icon">
          <img src={logo} alt="logo" />
        </span>
      </div>

      <h2>Masuk</h2>
      <p className="subtitle">Selamat datang kembali!</p>

      {error && <p className="auth-error">{error}</p>}

      <form className="input-group" onSubmit={handleLogin}>
        <Input
          label="Username"
          id="username"
          type="text"
          placeholder="Masukan Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
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

        <div className="form-options">
          <p className="register-link">
            Belum punya akun?{" "}
            <Link to="/register">Daftar</Link>
          </p>
          <Link to="#" className="forgot-password">
            Lupa Password?
          </Link>
        </div>

        <Button type="submit" variant="login">
          Masuk
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
          <span>Masuk dengan Google</span>
        </Button>
      </form>
    </section>
  );
}

export default LoginForm;

