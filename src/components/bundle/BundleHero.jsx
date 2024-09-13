import React from "react";
import "./bundle.css";
import { Link } from "react-router-dom";

function BundleHero() {
  return (
    // <div className="relative mb-28 mt-36">
      <div className="flex flex-col md:flex-row justify-between items-center relative mb-28 mt-36">
        <div
          id="bundle-black"
          className="text-white flex flex-col justify-end pl-16 pb-12 "
        >
          <p className="text-sm">JUST FOR YOU</p>
          <h2 className="font-bold text-3xl pt-2">
            NEW BUNDLE
            <br />
            COLLECTION
          </h2>
          <div className="mt-4">
            <Link
              to='/shop'
              class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-transparent group"
            >
              {/* <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-white group-hover:h-full"></span> */}
              <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                Shop now
              </span>
            </Link>
          </div>
        </div>
        <div
          id="bundle-white"
          className="text-white flex flex-col justify-end pl-16 pb-12"
        >
          <p className="text-sm">JUST FOR YOU</p>
          <h2 className="font-bold text-3xl pt-2">
            NEW BUNDLE
            <br />
            COLLECTION
          </h2>
          <div className="mt-4">
            <Link
              to='/shop'
              class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-transparent group"
            >
              {/* <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-white group-hover:h-full"></span> */}
              <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                Shop now
              </span>
            </Link>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default BundleHero;
