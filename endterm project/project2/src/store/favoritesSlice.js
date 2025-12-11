import { createSlice } from "@reduxjs/toolkit";

const loadFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const initialState = {
  favorites: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      if (!state.favorites.some(f => f.id === action.payload.id)) {
        state.favorites.push(action.payload);
        saveFavorites(state.favorites);
      }
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter(fav => fav.id !== action.payload);
      saveFavorites(state.favorites);
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
      saveFavorites(state.favorites);
    }
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

