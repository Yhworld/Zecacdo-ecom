import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique cartID

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    cartID: null, // Add cartID to the initial state
  },
  reducers: {
    addToCart: (state, action) => {
      // Generate a cartID if it doesn't already exist
      if (!state.cartID) {
        state.cartID = uuidv4();
        console.log(`Generated cartID: ${state.cartID}`);
      }

      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const updatedCart = state.cart.filter((item) => item.id !== action.payload);
      state.cart = updatedCart;
      if (state.cart.length === 0) {
        state.cartID = null; // Reset cartID if cart is empty
        // console.log('Cart emptied, cartID reset');
      }
    },
    
    clearCart: (state) => {
      state.cart = [];
      state.cartID = null; // Reset the cartID when the cart is cleared
      // console.log('Cart cleared in state');
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
