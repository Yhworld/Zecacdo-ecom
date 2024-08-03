import { createSlice } from '@reduxjs/toolkit';

const paymentInfoSlice = createSlice({
  name: 'paymentInfo',
  initialState: {},
  reducers: {
    setPaymentInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setPaymentInfo } = paymentInfoSlice.actions;
export default paymentInfoSlice.reducer;
