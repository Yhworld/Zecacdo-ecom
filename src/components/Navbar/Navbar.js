import React, { useState } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo/zecado.svg'
import "./navbar.css";
import { BsCart3 } from "react-icons/bs";
import data from "./navbardata";

function Navbar() {
  const [isOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const isHomepage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isOpen);
  };

  return (
    <div id="topbar" className={`sticky top-0 z-10 p-4 ${isHomepage ? 'bg-transparent' : 'bg-white'}`}>
      <div className="max-w-screen-xl flex items-center justify-between md:mx-auto p-4">
        <NavLink to="/">
        <Logo id="logo" fill={isHomepage ? '#fff' : '#65371F'}/>
        </NavLink>
        <div className="hidden space-x-8 lg:flex">
          {data.map((navigation) => {
            return (
              <NavLink
                to={navigation.link}
                className={`nav-link font-medium md:text-sm ${isHomepage ? 'text-white' : 'text-black'}`}
                style={{ cursor: "pointer" }}
              >
                {navigation.name}
              </NavLink>
            );
          })}
        </div>
        <div className="flex items-center font-medium p-4 md:p-0 md:space-x-10 lg:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent">
          {/* <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button> */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-3 h-3 text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="w-38 rounded-full p-2 ps-10 text-gray-900 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <NavLink  className={`flex items-center ${isHomepage ? 'text-white' : 'text-slate-600'} md:ml-0 space-x-2 py-2 lg:px-3 md:px-12 rounded md:border-0 md:p-0`}>
            <BsCart3 className="cart-icon" />
            <div className="hidden lg:inline-block">Cart</div>
          </NavLink>
          <NavLink
            to="/contact"
            id="btnRegister"
            className="hidden lg:inline-flex items-center justify-center h-10 px-4 font-medium tracking-wide text-black transition duration-200 hover:bg-gray-500 focus:shadow-outline focus:outline-none"
          >
            Sign in
          </NavLink>
        </div>

        <button
          id="menu-btn"
          className={`pr-8 block hamburger lg:hidden focus:outline-none ${
            isOpen ? "open" : ""
          }`}
          onClick={toggleMenu}
        >
          <span className={`hamburger-top ${isHomepage ? 'bg-white' : 'bg-black'}`}></span>
          <span className={`hamburger-middle ${isHomepage ? 'bg-white' : 'bg-black'}`}></span>
          <span className={`hamburger-bottom ${isHomepage ? 'bg-white' : 'bg-black'}`}></span>
        </button>
      </div>
      {isOpen && (
        <div className="lg:hidden">
          <div
            id="menu"
            className="relative inset-0 z-50 flex flex-col items-center justify-center bg-white font-bold py-8 space-y-6 drop-shadow-md"
          >
            <NavLink
              to="Home"
              spy={true}
              smooth={true}
              duration={800}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Home
            </NavLink>
            <NavLink
              to="About"
              spy={true}
              smooth={true}
              duration={800}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              About
            </NavLink>
            <NavLink
              to="services"
              spy={true}
              smooth={true}
              duration={800}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Services
            </NavLink>
            <NavLink
              to="contact"
              spy={true}
              smooth={true}
              duration={800}
              className="nav-link"
              style={{ cursor: "pointer" }}
            >
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
