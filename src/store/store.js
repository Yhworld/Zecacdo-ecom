// import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/ProductSlice";
import { cartReducer } from "../slices/CartSlice";
import categoryReducer from "../slices/CategorySlice";

// export const store = configureStore({
//   reducer: {
//     products: productReducer,
//     cart: cartReducer,
//     categories: categoryReducer,
//   },
// });


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
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
     products: productReducer,
     cart: persistedReducer,
     categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store)