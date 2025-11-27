import { useAuth } from "../service/auth";
import "../styles/profile.css";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>UID: {user.uid}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

