import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { authStateChanged } from "../services/authService";
import { setUser, clearUser } from "../store/authSlice";
import { setFavorites } from "../store/favoritesSlice";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function AuthListener() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [mergeMessage, setMergeMessage] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  
  const mergeFavorites = useCallback(async (user) => {
    const localFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);
    let serverFavorites = [];
    if (docSnap.exists()) serverFavorites = docSnap.data().favorites || [];

   
    const merged = [...serverFavorites];
    localFavorites.forEach(fav => {
      if (!serverFavorites.some(sf => sf.id === fav.id)) merged.push(fav);
    });

   
    await setDoc(userDocRef, { favorites: merged }, { merge: true });

   
    dispatch(setFavorites(merged));

   
    if (localFavorites.length > 0) {
      localStorage.removeItem("favorites");
      setMergeMessage("Your local favorites were merged with your account.");
    }
  }, [db, dispatch]);

  const handleAuthChange = useCallback(async (user) => {
    if (user) {
      dispatch(setUser(user));
      await mergeFavorites(user);
    } else {
      dispatch(clearUser());
      const localFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      dispatch(setFavorites(localFavorites));
    }
    setLoading(false);
  }, [dispatch, mergeFavorites]);


  useEffect(() => {
    const unsubscribe = authStateChanged(handleAuthChange);
    return unsubscribe;
  }, [handleAuthChange]);

  const statusMessage = useMemo(() => (
    loading ? "Checking authentication..." : mergeMessage
  ), [loading, mergeMessage]);

  if (loading) return <p>{statusMessage}</p>;
  if (mergeMessage) return <p>{mergeMessage}</p>;

  return null;
}


