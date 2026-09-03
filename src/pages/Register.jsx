import Registerform from "../components/auth/Registerform";
import registerBackground from "../assets/icons/latarrgs.jpg";

function Register() {
  return (
    <main
      className="auth-page1"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${registerBackground})`,
      }}
    >
      <Registerform />
    </main>
  );
}

export default Register;