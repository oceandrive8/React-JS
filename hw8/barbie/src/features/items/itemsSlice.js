import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsService from "../../service/ItemsService";


export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (query) => {
    return await itemsService.getAll(query);
  }
);


export const fetchItemById = createAsyncThunk(
  "items/fetchItemById",
  async (id) => {
    return await itemsService.getById(id);
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    selectedItem: null,

    loadingList: false,
    loadingItem: false,

    errorList: null,
    errorItem: null,

    query: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

     
      .addCase(fetchItems.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.error.message;
      })

     
      .addCase(fetchItemById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
        state.selectedItem = null;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.selectedItem = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.error.message;
      });
  },
});

export default itemsSlice.reducer;

