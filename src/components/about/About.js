import React from "react";
// import Cta from "../CTA/Cta";
// import Footer from "../Footer/Footer";
import './about.css'
let aboutImg = require("../../assets/campaign-creators-gMsnXqILjp4-unsplash.jpg");

function About() {
  return (
    <>
    <div id="about" className="max-w-screen-xl container mx-auto p-12">
      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
            Our Story
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600">
          Our journey at Zecado began with a vision to revolutionize the perfume industry by offering a fresh perspective on fragrances. While traditional niche and designer fragrances have dominated the market for over 50 years, we set out to carve our own path as a niche fragrance brand with a focus on crafting unique scents that tell a story of individuality and style.
            <p className="pt-4 pb-4">
            Inspired by my upbringing in a small town surrounded by nature's beauty – from serene lakes and beaches to the changing seasons – We here at Zecado developed a deep appreciation for the scents of the world around. These scents became a part of our most cherished memories, evoking feelings of comfort, joy, and nostalgia. It was during these moments that I discovered the transformative power of fragrances. The right scent had the ability to lift my mood, transport us to a different time and place, and even provide therapeutic benefits through its carefully curated ingredients.
            </p>
            {/* <p>
              
            </p> */}
          </p>
        </div>
        <div className="">
          <img
            className=""
            src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
            alt="A group of People"
            loading="lazy"
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-8 justify-between mt-24">
        <div className="">
          <img
            className="aboutimg2"
            src={aboutImg}
            alt="A group of People"
            loading="lazy"
          />
        </div>
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
            Our Mission
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600">
          Rooted in the belief that confidence begins with the way you smell, our slogan, "Zecado, The Place Where Your Confidence Begins," embodies our mission to empower you through the power of scent. We believe that the right fragrance has the ability to evoke a sense of confidence that radiates from within, leaving a lasting impression on those around you. Our fragrances not only make you feel good but also have the potential to transport you to moments of nostalgia, reminding you of cherished memories and experiences.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;
