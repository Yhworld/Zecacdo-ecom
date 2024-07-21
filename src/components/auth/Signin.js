import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import './auth.css';

function Signin() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSignup = () => {
    navigate('/signup'); // Navigate to the Sign-up page
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div id='auth' className='flex mx-auto container justify-center items-center'>
      <form id="login-form" className=''>
        <div className='text-center font-medium text-2xl pb-4'>Sign in</div>
        <div className="mb-6">
          <div className="mx-0 mb-1 sm:mb-4">
            <div className="mx-0 mb-1 sm:mb-4">
              <label htmlFor="email" className="pb-1 text-xs tracking-wider">Email address</label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="Your email"
                className="mb-2 w-full rounded-sm border border-gray-600 py-2 pl-2 pr-16 sm:mb-0"
                name="user_email"
              />
            </div>
            <div className="mx-0 mb-1 sm:mb-4 relative">
              <label htmlFor="password" className="pb-1 text-xs tracking-wider">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Your Password"
                className="mb-2 w-full rounded-sm border border-gray-600 py-2 pl-2 pr-10 sm:mb-0"
                name="password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-12 transform -translate-y-1/2 text-gray-600"
              >
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-brown font-medium text-white px-6 py-3 font-xl rounded-md sm:mb-0"
          >
            Sign in
          </button>
          <button
            type="button"
            className="w-full border-gray-600 text-brown px-6 py-3 font-xl mt-4 rounded-md sm:mb-0"
            onClick={handleSignup}
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signin;