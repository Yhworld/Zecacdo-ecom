import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo/zecado.svg';
import emailjs from "@emailjs/browser"; // Make sure emailjs is imported

function Footer() {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when email is being sent

    emailjs
      .sendForm("service_4mtguag", "template_9ywe9bq", form.current, {
        publicKey: "MRD9reDEIVCDMsfld",
      })
      .then(
        () => {
          setLoading(false);  // Stop loading once the email is sent
          setShowSuccessAlert(true);
          form.current.reset();
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 5000);
        },
        (error) => {
          setLoading(false);  // Stop loading if the email sending fails
        }
      );
  };

  return (
    <footer className="bg-peach mt-32 bottom-0 p-4 pl-6">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <NavLink to="/">
          <Logo id="logo" fill="#65371F" />
        </NavLink>
        <div className="md:flex md:space-x-80 items-center">
          <div className="mb-6 md:mb-0">
            <div className="mt-2 space-y-4">
              <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">
                Subscribe to our <br /> newsletter
              </label>
              <form ref={form} onSubmit={sendEmail} className="flex items-center">
                <input
                  type="email"
                  name="user_email"  // This should match the expected field in emailjs template
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}  // Update state on input change
                  className="block md:w-full p-2 text-gray-900 border-b border-gray-300 text-xs"
                  placeholder="Email address"
                  required
                />
                <button
                  type="submit"
                  className="bg-brown text-white font-bold px-4 py-1 flex items-center justify-center"
                  disabled={loading}  // Disable button when loading
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                      ></path>
                    </svg>
                  ) : (
                    '>'
                  )}
                </button>
              </form>
              {showSuccessAlert && (
                <p className="text-green-500 text-xs mt-2">Thank you for subscribing!</p>
              )}
            </div>
          </div>
          {/* Additional footer content */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-slate-900 uppercase">Services</h2>
              <ul className="text-brown font-medium space-y-4 flex flex-col">
                <NavLink to='/shop' className="hover:underline">Shop</NavLink>
                <NavLink to='/cart' className="hover:underline">Cart</NavLink>
                <NavLink to='/about' className="hover:underline">About</NavLink>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
              <ul className="text-brown font-medium">
                <li className="mb-4"><a href="https://www.instagram.com/zecado_/?api=1" className="hover:underline">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@zecadofragrance" className="hover:underline">Tiktok</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
              <ul className="text-brown font-medium flex flex-col">
                <NavLink to='/privacy-policy' className="mb-4">Privacy Policy</NavLink>
                <NavLink to='/terms-and-conditions' className="hover:underline">Terms &amp; Conditions</NavLink>
              </ul>
            </div>
          </div>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between md:justify-center mt-24 mb-2">
          <span className="text-brown sm:text-center">
            <a href="uy" className="hover:underline">© Copyright 2024 Zecado™</a>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
