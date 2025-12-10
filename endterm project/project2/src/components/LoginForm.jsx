import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService"; 

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password); 
      navigate("/profile");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("User does not exist. Please sign up.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  const goToRegister = () => {
    navigate("/signup");
  };

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn" type="submit">Login</button>

        {error && <p style={{ color: "#ff4d4d", textAlign: "center" }}>{error}</p>}

        <p className="register-text">
          Don't have an account?{" "}
          <span className="register-link" onClick={goToRegister}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}




