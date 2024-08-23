import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlist: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const itemInWishlist = state.wishlist.find((item) => item.id === action.payload.id);
      if (!itemInWishlist) {
        state.wishlist.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      const updatedWishlist = state.wishlist.filter((item) => item.id !== action.payload);
      state.wishlist = updatedWishlist;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;
