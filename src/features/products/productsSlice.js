import { createSlice } from '@reduxjs/toolkit';
import PRODUCTS from '../../data/products';

const initialState = {
  items: PRODUCTS,
  search: '',
  filtered: PRODUCTS,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
      const q = action.payload.trim().toLowerCase();
      if (!q) {
        state.filtered = state.items;
      } else {
        state.filtered = state.items.filter(p =>
          p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
        );
      }
    },
    
    addProduct(state, action) {
      state.items.push(action.payload);
      state.filtered = state.items;
    }
  }
});

export const { setSearch, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
