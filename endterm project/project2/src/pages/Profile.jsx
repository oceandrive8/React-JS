import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { logout } from "../services/authService";
import "../styles/Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const db = getFirestore();

  useEffect(() => {
    const currentUser = getAuth().currentUser;
    if (!currentUser) return;

    setUser(currentUser);

    const userDocRef = doc(db, "users", currentUser.uid);
    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.photoURL) setPreviewUrl(data.photoURL);
        if (data.favorites) setFavorites(data.favorites);
      }
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return alert("No file selected!");
    if (!file.type.startsWith("image/")) return alert("Only images allowed!");
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async () => {
    if (!image || !user) return alert("Select an image first");

    try {
      const base64Image = await convertToBase64(image);

      await setDoc(
        doc(db, "users", user.uid),
        { photoURL: base64Image },
        { merge: true }
      );

      setPreviewUrl(base64Image);
      alert("Profile picture updated!");
    } catch (err) {
      console.error("Failed to upload picture:", err);
      alert("Failed to upload picture.");
    }
  };

  const goToItemDetails = (id) => {
    navigate(`/items/${id}`);
  };

  const removeFavorite = async (songId) => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    let updatedFavorites = [];
    if (docSnap.exists()) {
      const data = docSnap.data();
      updatedFavorites = (data.favorites || []).filter((song) => song.id !== songId);
    }

    await setDoc(userDocRef, { favorites: updatedFavorites }, { merge: true });
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <Navbar />
      <main className="profile-page">
        <div className="profile-left">
          <h1>Welcome, {user?.email}</h1>
          {previewUrl ? (
            <img src={previewUrl} alt="Profile" className="profile-picture" />
          ) : (
            <div className="profile-placeholder">No Image</div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button className="btn" onClick={handleUpload}>
            Upload Picture
          </button>
          <button className="btn logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        <div className="profile-right">
          <h2>Favorites / Playlist</h2>
          {favorites.length === 0 ? (
            <p>No favorite songs yet.</p>
          ) : (
            <ul className="favorites-list">
              {favorites.map((song) => (
                <li key={song.id}>
                  <span onClick={() => goToItemDetails(song.id)}>
                    {song.title} - {song.artist}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFavorite(song.id)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}








