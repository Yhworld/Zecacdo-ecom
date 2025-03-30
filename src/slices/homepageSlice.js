import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { withTimeout } from "../utils/Timeout"; // Adjust the path as needed

const processImageUrl = (url) => {
  if (url?.startsWith("s3://")) {
    const encodedFilePath = encodeURIComponent(url.substring(5));
    return `${process.env.REACT_APP_API_BASE_URL}rest/files?fileRef=s3%3A%2F%2F${encodedFilePath}`;
  }
  return url || ""; // Ensure it returns a valid string
};

export const fetchHomepage = createAsyncThunk(
  "homepage/fetchHomepage",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Fetching homepage data...");
      const response = await withTimeout(
        axios.get(
          `${process.env.REACT_APP_API_BASE_URL}rest/entities/Homepage?fetchPlan=homepage-fetch-plan`
        ),
        10000 // 10-second timeout
      );

      console.log("Homepage API Response:", response.data);

      return {
        ...response.data,
        imageUrl: processImageUrl(response.data.imageUrl),
      };
    } catch (error) {
      console.error(
        "Error fetching homepage:",
        error?.response || error.message
      );
      return rejectWithValue(error?.response?.data || "Unknown error occurred");
    }
  }
);

const initialState = {
  homepage: null,
  loading: false,
  error: null,
};

const homepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomepage.pending, (state) => {
        console.log("Fetching homepage data (Pending)...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomepage.fulfilled, (state, action) => {
        console.log("Homepage data fetched successfully:", action.payload);
        state.homepage = action.payload;
        state.loading = false;
      })
      .addCase(fetchHomepage.rejected, (state, action) => {
        console.error("Homepage fetch failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.homepage = null; // Ensure previous data is cleared on failure
      });
  },
});

export default homepageSlice.reducer;
