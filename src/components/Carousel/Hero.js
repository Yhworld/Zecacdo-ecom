import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './hero.css'
import { useSelector } from "react-redux";

import { processImageUrl } from "../../utils/Timeout"; // Make sure this is imported


function Hero() {
  const [current, setCurrent] = useState(0);
  
  const { homepage } = useSelector((state) => state.homepage);
  const imagePaths = homepage?.filter(item => item.sectionType === "slider") || [];


  // const previousSlide = () => {
  //   const newIndex = (current === 0) ? (imagePaths.length - 1) : (current - 1);
  //   setCurrent(newIndex);
  // };

  const nextSlide = () => {
    const newIndex = (current === imagePaths.length - 1) ? 0 : (current + 1);
    setCurrent(newIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(nextSlide, 2000); // Change slide every 5 seconds
    return () => clearInterval(intervalId); // Cleanup the interval
  },); // Re-run effect when current changes


  if (imagePaths.length === 0) return null;

  const currentSlide = imagePaths[current];
  const backgroundImage = processImageUrl(currentSlide.imageUrl)?.trim() || "/default.jpg";


  return (
    <div
      className={`flex transition ease-out duration-40 overflow-hidden`}
      id="emotions"
      style={{
        backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.4) 21.84%, rgba(12, 12, 12, 0.1) 71.03%), url(${backgroundImage})`
      }}
    >
      {/* <div id="hero-container" className="max-w-screen-xl flex flex-col mx-auto container text-white pt-48 pl-10 p-8">
        <div className="hidden md:block">{currentSlide?.title || "SCENTS THAT COMMAND ATTENTION"}</div>
        <Link to='/shop' className="md:hidden leading-normal flex justify-center text-2xl font-semibold text-center">
          {currentSlide?.title }
        </Link>
        <br />
        <div id="hero-text" className="hidden md:block md:text-5xl text-2xl">
          <p>{currentSlide?.description || "TIMELESS FRAGRANCES"}</p>
        </div>
        <div className="cta-btn">
          <div className="flex justify-center">
            <Link to='/shop' id="hero-shop" className="mb-6 md:hidden bg-transparent border-white border-2 rounded-3xl text-white md:hover:bg-gray-200 xs:w-full">
              {currentSlide?.buttonText || "Shop scents"}
            </Link>
          </div>
          <div className="flex">
            <Link to='/shop' id="hero-link" className="hidden md:block mb-6 bg-white border-2 rounded-md text-black md:hover:bg-gray-200">
              {currentSlide?.buttonText || "Shop scents"}
            </Link>
          </div>
        </div>
        <div id="tudot" className="py-12 flex items-end justify-center gap-3 w-full">
          {imagePaths.map((_, i) => (
            <div
              onClick={() => setCurrent(i)}
              key={"circle" + i}
              className={`rounded-full w-3 h-3 cursor-pointer ${i === current ? "bg-white" : "bg-gray-500"}`}
            ></div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Hero;
