import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { withTimeout } from '../utils/Timeout'; // Adjust the path as needed

const processImageUrl = (url) => {
  if (url.startsWith('fs://')) {
    const encodedFilePath = encodeURIComponent(url.substring(5));
    return `http://localhost:8080/rest/files?fileRef=fs%3A%2F%2F${encodedFilePath}`;
  }
  return url;
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await withTimeout(
    axios.get('http://localhost:8080/rest/entities/Product?fetchPlan=product-fetch-plan'),
    10000 // Set the timeout to 10 seconds
  );
  return response.data.map(product => ({
    ...product,
    imageUrl: processImageUrl(product.imageUrl),
  }));
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await withTimeout(
    axios.get(`http://localhost:8080/rest/entities/Product/${id}?fetchPlan=product-fetch-plan`),
    10000 // Set the timeout to 10 seconds
  );
  return {
    ...response.data,
    imageUrl: processImageUrl(response.data.imageUrl),
  };
});

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
