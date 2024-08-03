// import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/ProductSlice";
import { cartReducer } from "../slices/CartSlice";
import categoryReducer from "../slices/CategorySlice";
import rootReducer from "../slices/rootReducer";
import orderReducer from '../slices/orderSlice'

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
     order: orderReducer,
     rootReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store)