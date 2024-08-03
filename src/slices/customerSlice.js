import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to submit customer data
export const submitCustomer = createAsyncThunk(
  'customer/submitCustomer',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/rest/services/create_customer/createCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit customer data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    status: 'idle',
    error: null,
    customer: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitCustomer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customer = action.payload;
      })
      .addCase(submitCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default customerSlice.reducer;
