// api.js or your API slice file
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }), // Adjust base URL if needed
  endpoints: (builder) => ({
    authorize: builder.mutation({
      query: ({ code, codeVerifier }) => ({
        url: '/oauth2/token',
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
          client_id: process.env.REACT_APP_CLIENT_ID,
          code_verifier: codeVerifier,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${process.env.REACT_APP_AUTH_HEADER}`,
        },
      }),
    }),
  }),
});

export const { useAuthorizeMutation } = api;
