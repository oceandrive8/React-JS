import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items;
      state.totalPages = action.payload.totalPages;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setItems, setSearchQuery, setCurrentPage } = itemsSlice.actions;
export default itemsSlice.reducer;
