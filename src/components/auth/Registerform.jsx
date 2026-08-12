import {useState} from "react";
import { registerWithUsername } from "../../services/auth";
// import { registerWithEmail } from "../../services/auth";
import { Link, useNavigate} from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import google from "../../assets/icons/google.png";
import { signInWithGoogle } from "../../services/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Registerform() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      navigate("/home");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    // const user = await registerWithEmail(email, password);
    // console.log(user);
    // if (user) {
    //   navigate("/home");
    // }

    const user = await registerWithUsername(userName, email, password);
    console.log(user);
    if (user) {
      navigate("/home");
    }

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

      <form onSubmit={handleRegister}>

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Masukan Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>

        <div className="input-group">
          <label htmlFor="username">Email </label>
          <input id="username" type="email" placeholder="Masukan Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password </label>
          <div className="password-input">
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Masukan Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Konfirmasi Password </label>
          <div className="password-input">
            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Konfirmasi Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="button" className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="form-options">
          <p className="register-link">Sudah punya akun?{""}<Link to="/login">Masuk</Link></p>
        </div>

        <button type="submit" className="btn-login">Daftar</button>
        <span className="separator"> Atau </span>
        <button type="button" className="btn-google" onClick={handleGoogleLogin}>
          <img src={google} alt="google logo" className="google-icon" /> Masuk dengan Google</button>
      </form>
    </section>
  );
}

export default Registerform;