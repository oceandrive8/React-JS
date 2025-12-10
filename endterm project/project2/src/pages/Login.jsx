import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { login as firebaseLogin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await firebaseLogin(email, password);
      const user = userCredential.user;

      dispatch(setUser(user)); 
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <main className="login-page">
        <LoginForm onSubmit={handleLogin} />
      </main>
      <Footer />
    </>
  );
}

