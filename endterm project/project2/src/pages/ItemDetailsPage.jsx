import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";

import { getItemById } from "../services/itemsService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import vinylImg from "../assets/vinyl.png";
import "../styles/ItemDetailsPage.css";

export default function ItemDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [item, setItem] = useState(location.state?.item || null);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const audioRef = useRef(new Audio());

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (!item) {
      getItemById(id).then((res) => setItem(res));
    }
  }, [id, item]);

  useEffect(() => {
    if (!item) return;

    if (item.preview) {
      audioRef.current.src = item.preview;
    }

    const checkLiked = async () => {
      const user = auth.currentUser;

      
      if (!user) {
        const localFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
        setLiked(localFavs.some(f => f.id === item.id));
        return;
      }

     
      const userDocRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const favorites = docSnap.data().favorites || [];
        setLiked(favorites.some(fav => fav.id === item.id));
      }
    };

    checkLiked();
  }, [item]);

  const togglePlay = () => {
    if (!item?.preview) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const toggleLike = async () => {
    const user = auth.currentUser;

   
    if (!user) {
      if (liked) {
        dispatch(removeFavorite(item.id));
      } else {
        dispatch(addFavorite(item));
      }
      setLiked(!liked);
      return;
    }

  
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    let favorites = [];
    if (docSnap.exists()) {
      favorites = docSnap.data().favorites || [];
    }

    if (liked) {
      favorites = favorites.filter(fav => fav.id !== item.id);
    } else {
      favorites.push({
        id: item.id,
        title: item.title,
        artist: item.artist,
        image: item.image,
        preview: item.preview,
      });
    }

    await setDoc(userDocRef, { favorites }, { merge: true });
    setLiked(!liked);
  };

  const goBack = () => navigate("/items");

  if (!item) return null;

  return (
    <>
      <Navbar />
      <div className="details-page">
        <div className="back-wrapper">
          <button className="back-btn" onClick={goBack}>←</button>
        </div>

        <div className="left-panel">
          <h2 className="word">Now we are listening to ....</h2>

          <div className="vinyl-wrapper">
            <img src={vinylImg} className="vinyl-img" alt="" />
            <img src={item.image} className="track-cover" alt="" />
          </div>

          <div className="player-controls">
            <button className="icon-btn">⏮</button>
            <button className="play-btn" onClick={togglePlay}>
              {playing ? "❚❚" : "▶"}
            </button>
            <button className="icon-btn">⏭</button>

            <button
              className={`icon-btn ${liked ? "liked" : ""}`}
              onClick={toggleLike}
            >
              ♥
            </button>
          </div>
        </div>

        <div className="right-panel">
          <p>Artist Name: {item.artist}</p>
          <p>Song Name: {item.title}</p>
          <p>Album: {item.album || "Unknown"}</p>
          <p>Duration: {item.duration || 30}s</p>
          <p>Rank: {item.rank || "N/A"}</p>
          <p>Track ID: {item.id}</p>
          <p>
            Link: <a href={item.link} target="_blank" rel="noreferrer">Open</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}








