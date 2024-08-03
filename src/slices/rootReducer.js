// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import contactInfoReducer from './contactInfoSlice';
import deliveryInfoReducer from './deliveryInfoSlice';
import orderReducer from './orderSlice'
// import other reducers as necessary

const rootReducer = combineReducers({
  contactInfo: contactInfoReducer,
  deliveryInfo: deliveryInfoReducer,
  // add other reducers here
});

export default rootReducer;
