import { createSlice } from '@reduxjs/toolkit';
import dataProduct from '../assets/data';

const initialState = {
    products: dataProduct,
    loading: false,
    error: null,
  };


  const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
  });

  export default productSlice.reducer;