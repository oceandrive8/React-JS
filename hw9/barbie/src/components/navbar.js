import { NavLink } from "react-router-dom";
import { useAuth } from "../service/auth";   
import "../styles/navbar.css";

export default function NavBar() {
  const { user, logout } = useAuth(); 

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/about" className="nav-link">About</NavLink>
      <NavLink to="/items" className="nav-link">Movies</NavLink>

      
      {!user && (
        <>
          <NavLink to="/login" className="nav-link">Login</NavLink>
          <NavLink to="/signup" className="nav-link">Signup</NavLink>
        </>
      )}

      {user && (
        <>
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </>
      )}
    </nav>
  );
}

