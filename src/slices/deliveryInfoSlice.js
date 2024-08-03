// deliveryInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const deliveryInfoSlice = createSlice({
  name: 'deliveryInfo',
  initialState: {
    phoneNumber: '',
    stateCode: '',
    state: '',
    city: '',
    country: 'US',
    postalCode: '',
    countryCode: '',
    latitude: 0,
    longitude: 0,
  },
  reducers: {
    setDeliveryInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setDeliveryInfo } = deliveryInfoSlice.actions;
export default deliveryInfoSlice.reducer;
