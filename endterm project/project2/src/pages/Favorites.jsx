import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import "../styles/Favorites.css";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  const toggleFavorite = (item) => {
    if (favorites.some(fav => fav.id === item.id)) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  return (
    <>
      <Navbar />
      <main className="favorites-page">
        <h1>Your Favorites</h1>
        {favorites.length === 0 ? (
          <p>You have no favorite items yet.</p>
        ) : (
          <div className="items-grid">
            {favorites.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onFavoriteToggle={() => toggleFavorite(item)}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

