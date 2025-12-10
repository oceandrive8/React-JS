import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./itemsSlice";
import authReducer from "./authSlice"; // if you have one
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});


