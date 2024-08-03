// contactInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
  },
  reducers: {
    setContactInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setContactInfo } = contactInfoSlice.actions;
export default contactInfoSlice.reducer;
