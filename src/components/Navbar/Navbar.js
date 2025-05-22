import React, { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo/zecado.svg";
import "./navbar.css";
import { BsCart3 } from "react-icons/bs";
import data from "./navbardata";
import pkceChallenge from "pkce-challenge";
import { useSelector } from "react-redux";
import CountdownBanner from "../counter/counter";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const isHomepage = location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isOpen);
  };

  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const cart = useSelector((state) => state.cart.cart);

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const handleLogin = () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_REDIRECT_URI;

    if (!authUrl || !clientId || !redirectUri) {
      console.error("Environment variables are missing");
      return;
    }

    const { code_verifier, code_challenge } = pkceChallenge();
    sessionStorage.setItem("code_verifier", code_verifier);
    sessionStorage.setItem("code_challenge", code_challenge);

    const url = `${authUrl}?client_id=${clientId}&response_type=code&response_mode=query&code_challenge_method=S256&code_challenge=${code_challenge}&redirect_uri=${redirectUri}`;
    window.location.href = url;
  };

  return (
    <>
      <div
        id="topbar"
        className= {`${isHomepage ? "absolute" : "relative"} top-0 z-10 p-4 ${
          isHomepage ? "bg-peach" : "bg-peach"
        }`}
      >
        <div className="max-w-screen-xl container flex items-center justify-between md:mx-auto p-4 bg-peach md:pl-8">
          <NavLink to="/">
            <Logo id="logo" fill={isHomepage ? "#fff" : "#65371F"} />
          </NavLink>
          <div className="hidden space-x-8 lg:flex">
            {data.map((navigation) => (
              <NavLink
                key={navigation.name}
                to={navigation.link}
                className={({ isActive }) =>
                  `nav-link font-medium md:text-sm ${
                    isHomepage ? "text-black homepage" : "text-black"
                  } ${isActive ? "active-link" : ""}`
                }
                style={{ cursor: "pointer" }}
              >
                {navigation.name}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center font-medium p-4 md:p-0 md:space-x-10 lg:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-transparent">
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div
              onClick={() => navigate("/cart")}
              className={`relative flex items-center ${
                isHomepage ? "text-black" : "text-slate-600"
              } md:ml-0 py-2 lg:px-3 md:px-3 px-2 rounded md:border-0 md:p-0`}
            >
              <BsCart3
                className={`cart-icon text-2xl cursor-pointer transition-colors duration-300 ${
                  isHomepage ? `hover:text-gray-200` : `hover:text-gray-300`
                } `}
              />
              {getTotalQuantity() > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-1">
                  {getTotalQuantity()}
                </span>
              )}
            </div>
          </div>
          <button
            id="menu-btn"
            className={`pr-8 block hamburger lg:hidden focus:outline-none ${
              isOpen ? "open" : ""
            }`}
            onClick={toggleMenu}
          >
            <span
              className={`hamburger-top ${isHomepage ? "bg-white" : "bg-black"}`}
            ></span>
            <span
              className={`hamburger-middle ${
                isHomepage ? "bg-white" : "bg-black"
              }`}
            ></span>
            <span
              className={`hamburger-bottom ${
                isHomepage ? "bg-white" : "bg-black"
              }`}
            ></span>
          </button>
        </div>
        <div id="menu" className={`${isOpen ? "open" : ""}  lg:hidden`}style={{ backgroundColor: '#c5945a' }}>
          <div className="relative mt-64 uppercase inset-0 z-50 flex flex-col h-full pl-4 c font-semibold px-4 space-y-6 drop-shadow-md">
            {data.map((navigation) => (
              <NavLink
                key={navigation.name}
                to={navigation.link}
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => setIsMenuOpen(false)}
              >
                {navigation.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full text-white text-center py-2">
        {/* <CountdownBanner /> */}
      </div>
    </>
  );
}

export default Navbar;
