import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import pkceChallenge from 'pkce-challenge';
import { savePkce } from './authSlice'; // Adjust import based on your file structure
import { useAuthorizeMutation } from '../Callback/Callback'; // Import from your API slice

const generateCodeVerifierAndChallenge = () => {
  return pkceChallenge();
}

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const search = useLocation().search;

  // Retrieve variables from redux store
  const accessToken = useSelector(state => state.auth.accessToken);
  const codeVerifier = useSelector(state => state.auth.codeVerifier);
  const codeChallenge = useSelector(state => state.auth.codeChallenge);

  // Token endpoint exposed using RTK Query
  const [getToken] = useAuthorizeMutation();
  // Get auth code from URL once it redirects back to the web app
  const code = new URLSearchParams(search).get('code');

  useEffect(() => {
    if (accessToken) {
      // Step 4 - Once the access token is received, navigate to the initial page
      navigate('/'); // Adjust the path to your initial page
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (!codeVerifier) {
      // Step 1 - When the user opens the web app, create the code verifier and challenge and store them in the redux store
      const { code_verifier, code_challenge } = generateCodeVerifierAndChallenge();
      // Store the code verifier and code challenge in the redux store
      dispatch(savePkce({ codeChallenge: code_challenge, codeVerifier: code_verifier }));
    }

    if (code && codeVerifier && !accessToken) {
      // Step 3 - Once the authorization server redirects back to the web app with the auth code, call the token endpoint to get the access token
      getToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, accessToken, dispatch, getToken]);

  useEffect(() => {
    if (!code && !accessToken && codeChallenge) {
      // Step 2 - Once the code challenge is created, redirect to the authorization server with the code challenge
      window.location.href = `${process.env.REACT_APP_AUTH_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}
      &response_type=code&response_mode=query&code_challenge_method=S256&code_challenge=${codeChallenge}
      &redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
    }
  }, [codeChallenge]);

  return null;
}
