import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const findIndex = (items, id) => items.findIndex(i => i.id === id);

const recalcTotals = (state) => {
  state.totalQuantity = state.items.reduce((s, it) => s + it.qty, 0);
  state.totalAmount = state.items.reduce((s, it) => s + it.qty * it.price, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const idx = findIndex(state.items, product.id);
      if (idx >= 0) {
        state.items[idx].qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
      recalcTotals(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
      recalcTotals(state);
    },
    increaseQty(state, action) {
      const id = action.payload;
      const idx = findIndex(state.items, id);
      if (idx >= 0) state.items[idx].qty += 1;
      recalcTotals(state);
    },
    decreaseQty(state, action) {
      const id = action.payload;
      const idx = findIndex(state.items, id);
      if (idx >= 0) {
        state.items[idx].qty -= 1;
        if (state.items[idx].qty <= 0) {
          state.items.splice(idx, 1);
        }
      }
      recalcTotals(state);
    },
    clearCart(state) {
      state.items = [];
      recalcTotals(state);
    }
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
