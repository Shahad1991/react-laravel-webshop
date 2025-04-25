import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice'; // Import cartSlice

const store = configureStore({
  reducer: {
    cart: cartReducer, // Add cartSlice to the store
  },
});

export default store;