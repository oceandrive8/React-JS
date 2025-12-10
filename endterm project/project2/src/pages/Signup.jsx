import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { signup as firebaseSignup } from "../services/authService";
import "../styles/Signup.css";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    try {
      const userCredential = await firebaseSignup(email, password);
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
      <main className="signup-page">
        <SignupForm onSubmit={handleSignup} />
      </main>
      <Footer />
    </>
  );
}

