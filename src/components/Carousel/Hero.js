import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './hero.css'


function Hero() {
  const [current, setCurrent] = useState(0);
  
  const imagePaths = ['/image2.jpeg', '/image3.jpeg', '/image4.jpeg']
  

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

  return (

      <div
        className={`flex transition ease-out duration-40 overflow-hidden`}
        id="emotions"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.4) 21.84%, rgba(12, 12, 12, 0.1) 71.03%), url(${process.env.PUBLIC_URL + imagePaths[current]})`
        }}
      >
  <div id="hero-container" className="max-w-screen-xl flex flex-col mx-auto container text-white pt-48 pl-10 p-8">
    <div className="hidden md:block">
      SCENTS THAT COMMAND ATTENTION
    </div>
    <Link to='/shop' className="md:hidden leading-normal flex justify-center text-2xl font-semibold text-center">Timeless Fragrances for Every Occasion</Link>
    <br/>
    <div id="hero-text" className="hidden md:block md:text-5xl text-2xl">
      <p>CRAFTING FOR THE DISCERNING</p>
      <p>TIMELESS FRAGRANCES</p>
      <p>FOR EVERY OCCASION</p>
    </div>
    <div className="cta-btn">
    <div className="flex justify-center">
    <Link to="/shop" id="hero-shop" className="mb-6 md:hidden bg-transparent border-white border-2 rounded-3xl text-white md:hover:bg-gray-200 xs:w-full">Shop scents</Link> 
   </div> 
   <div className="flex ">
    <Link to='/shop' id="hero-link" className="hidden md:block mb-6 bg-white border-2 rounded-md text-black md:hover:bg-gray-200">Shop scents</Link> 
   </div> 
    </div>
    <div id="tudot" className="py-12 flex items-end justify-center gap-3 w-full">
        {imagePaths.map((imagePath, i) => (
          <div
            onClick={() => {
              setCurrent(i);
            }}
            key={"circle" + i}
            className={`rounded-full w-3 h-3 cursor-pointer  ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
  </div>
    </div>
  );
}

export default Hero;
