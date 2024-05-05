import { useState, useEffect } from "react";
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
  <div id="hero-container" className="flex flex-col mx-auto container text-white pt-48 pl-4">
    <div>
      SCENTS THAT COMMAND ATTENTION
    </div>
    <br/>
    <div id="hero-text" className="md:text-5xl text-2xl">
      <p>CRAFTING FOR THE DISCERNING</p>
      <p>MAN:TIMELESS FRAGRANCES</p>
      <p>FOR EVERY OCCASION</p>
    </div>
    <div className="cta-btn">
    <button id="hero-shop" className="bg-white text-black md:hover:bg-gray-200 xs:w-full">Shop</button> 
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
