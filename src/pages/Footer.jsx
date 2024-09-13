import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo/zecado.svg';

function Footer() {
  return (
    <footer className="bg-white mt-32 bottom-0 p-4 pl-6">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <NavLink to="/">
          <Logo id="logo" fill='#65371F'/>
        </NavLink>
        <div className="md:flex md:space-x-80 items-center"> 
          {/* <div className="mb-6 md:mb-0">
            <div className='mt-2 space-y-4'>
              <label htmlFor="small-input" className="block mb-2 text-md font-medium text-gray-900">
                Subscribe to our <br /> newsletter
              </label>
              <div className='flex items-center'>
                <input
                  type="text"
                  id="small-input"
                  className="block md:w-full p-2 text-gray-900 border-b border-gray-300 text-xs"
                  placeholder='Email address'
                />
                <button className='bg-brown text-white font-bold px-4 py-1'>&gt;</button>
              </div>
            </div>
          </div> */}
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-slate-900 uppercase">Services</h2>
              <ul className="text-brown font-medium space-y-4">
                <li><a href="#g" className="hover:underline">Shop</a></li>
                <li><a href="#h" className="hover:underline">Cart</a></li>
                <li><a href="#h" className="hover:underline">About</a></li>
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
              <ul className="text-brown font-medium">
                <li className="mb-4"><a href="#dse" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#sw" className="hover:underline">Terms &amp; Conditions</a></li>
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
