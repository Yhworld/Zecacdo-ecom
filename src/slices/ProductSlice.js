import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { withTimeout } from '../utils/Timeout'; // Adjust the path as needed
const processImageUrl = (url) => {
  if (url.startsWith('fs://')) {
    const encodedFilePath = encodeURIComponent(url.substring(5));
    return `${process.env.REACT_APP_API_BASE_URL}rest/files?fileRef=fs%3A%2F%2F${encodedFilePath}`;
  } else if (url.startsWith('s3://')) {
    // Replace 's3://' with the S3 endpoint and bucket path using environment variables
    const filePath = url.substring(5); // Remove the 's3://' part
    const s3Bucket = process.env.REACT_APP_S3_BUCKET_NAME || 'zecado';
    const s3Region = process.env.REACT_APP_S3_REGION || 'us-west-2';
    return `https://${s3Bucket}.s3.${s3Region}.amazonaws.com/${filePath}`;
  }
  return url;
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await withTimeout(
    axios.get(`${process.env.REACT_APP_API_BASE_URL}rest/entities/Product?fetchPlan=product-fetch-plan`),
    10000 // Set the timeout to 10 seconds
  );
  return response.data.map(product => ({
    ...product,
    imageUrl: processImageUrl(product.imageUrl),
  }));
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await withTimeout(
    axios.get(`${process.env.REACT_APP_API_BASE_URL}rest/entities/Product/${id}?fetchPlan=product-fetch-plan`),
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
