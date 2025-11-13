import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">Home</NavLink>
      <NavLink to="/about" className="nav-link">About</NavLink>
      <NavLink to="/items" className="nav-link">Movies</NavLink>
      <NavLink to="/login" className="nav-link">Login</NavLink>
    </nav>
  );
}
