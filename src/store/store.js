import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';


import productReducer from "../slices/ProductSlice";
import { cartReducer } from "../slices/CartSlice";
import categoryReducer from "../slices/CategorySlice";
import orderReducer from '../slices/orderSlice';
import { wishlistReducer } from '../slices/wishlistslice';  // Import wishlistReducer
import authReducer from '../slices/AuthSlice';

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const wishlistPersistConfig = {
  key: 'wishlist',
  storage,
};

const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,  // Add wishlist to the store
    categories: categoryReducer,
    order: orderReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
