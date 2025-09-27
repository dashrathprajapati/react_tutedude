import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../api/foodApi";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await fetchProducts();
    return res.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(getProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default productsSlice.reducer;
