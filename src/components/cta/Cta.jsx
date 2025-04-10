import React from "react";
import { Link } from "react-router-dom";
import "./cta.css";
import { useSelector } from "react-redux";

function Cta() {
  const homepage = useSelector((state) => state.homepage.homepage || []);
  const ctaData = homepage[2] || {};

  return (
    <section
      id="cta-hero"
      className="flex flex-col items-center justify-center rounded-lg relative mx-auto mt-32 p-32"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.7), rgb(12, 12, 12)), url(${ctaData.imageUrl || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="md:w-3/4 flex flex-col items-center">
        <h2 className="hidden md:block mb-4 md:text-4xl tracking-tight font-semibold text-center text-white">
          {ctaData.description || "Explore Zecado's unique fragrances & discover the power of scent. Your journey to self-discovery starts here."}
        </h2>
        <h2 className="md:hidden mb-4 tracking-tight font-semibold text-center text-white">
          {ctaData.title || "Explore Zecado's unique fragrances. Your journey to self-discovery starts here."}
        </h2>
        <Link
          to='/shop'
          className="mt-8 rounded-2xl text-black bg-white hover:bg-brown hover:border-white hover:text-white focus:ring-4 focus:ring-primary-300 font-medium text-sm px-12 py-3.5 mr-2 mb-2  focus:outline-none"
        >
          {ctaData.buttonText || "Shop"}
        </Link>
      </div>
    </section>
  );
}

export default Cta;
