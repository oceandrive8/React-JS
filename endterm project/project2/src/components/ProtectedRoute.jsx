import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const user = useSelector(state => state.auth.user);

  if (user === undefined) return <p>Loading...</p>; 
  return user ? children : <Navigate to="/login" replace />;
}

