import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Items from "../pages/Items";
import ItemDetailsPage from "../pages/ItemDetailsPage";
import Favorites from "../pages/Favorites";
import Profile from "../pages/Profile";


import ProtectedRoute from "../components/ProtectedRoute";


export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}
