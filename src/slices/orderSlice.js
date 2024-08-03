import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to submit order
export const submitOrder = createAsyncThunk('order/submitOrder', async (orderData, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:8080/rest/services/create_order/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit order');
    }

    const data = await response.json();
    console.log('Backend response data:', data); // Log the backend response
    return data.body; // Return the body property directly
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  id: '',
  orderNumber: '',
  totalPrice: 0,
  salesTax: 0,
  status: '',
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action.payload.id;
        state.orderNumber = action.payload.orderNumber || '';
        state.totalPrice = action.payload.totalPrice || 0;
        state.salesTax = action.payload.salesTax || 0;
        state.error = null;
        console.log('Order state updated:', state); // Log the updated state
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('Order submission failed:', action.payload); // Log the error
      });
  },
});

export default orderSlice.reducer;
