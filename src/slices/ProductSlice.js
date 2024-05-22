import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function to process the image URL and encode it
const processImageUrl = (url) => {
  if (url.startsWith('fs://')) {
    // Encode the part of the URL after "fs://"
    const encodedFilePath = encodeURIComponent(url.substring(5));
    // Construct the final URL for fetching the image
    return `http://localhost:8080/rest/files?fileRef=fs%3A%2F%2F${encodedFilePath}`;
  }
  return url;
};

// Asynchronous thunk action to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:8080/rest/entities/Product?fetchPlan=product-fetch-plan');
  const products = response.data.map(product => ({
    ...product,
    imageUrl: processImageUrl(product.imageUrl),
  }));
  return products;
});

const initialState = {
  products: [],
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
      });
  },
});

export default productSlice.reducer;
