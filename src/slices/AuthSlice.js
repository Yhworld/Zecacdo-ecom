import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  codeVerifier: null,
  codeChallenge: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setCodeVerifier(state, action) {
      state.codeVerifier = action.payload;
    },
    setCodeChallenge(state, action) {
      state.codeChallenge = action.payload;
    },
    savePkce(state, action) {
      state.codeChallenge = action.payload.codeChallenge;
      state.codeVerifier = action.payload.codeVerifier;
    },
  },
});

export const { setAccessToken, setCodeVerifier, setCodeChallenge, savePkce } = authSlice.actions;
export default authSlice.reducer;
