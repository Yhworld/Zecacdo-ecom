import React from "react";
// import Cta from "../CTA/Cta";
// import Footer from "../Footer/Footer";
import "./about.css";
let aboutImg = require("../../assets/groupzecado.webp");
let aboutImg2 = require("../../assets/bosszecado.webp");

function About() {
  return (
    <>
      <div id="about" className="max-w-screen-xl container mx-auto p-12">
        <div className="flex flex-col lg:flex-row justify-around gap-8 mt-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              <div class="font-normal text-base leading-6 text-gray-600">
                <p>
                  Our journey at Zecado began with a vision to redefine the
                  fragrance industry, offering a fresh perspective that speaks
                  to individuality and style. While traditional niche and
                  designer fragrances have shaped the market for over 50 years,
                  we set out to create our own unique path as a niche brand,
                  crafting scents that are more than just products—they’re
                  experiences.
                </p>

                <p class="pt-4 pb-4">
                  Zecado was born from a simple, unforgettable moment. In 2022,
                  while living in Lancaster, UK, I was wearing Dior Sauvage when
                  a lady approached me and said, “You smell good.” That
                  compliment did more than just lift my spirits; it sparked
                  something deep within me. It was a rush of dopamine, that
                  unmistakable surge of joy. In that moment, I discovered the
                  profound power of fragrance—not just as a scent, but as an
                  experience, a memory, a feeling that lingers.
                </p>

                <p class="pt-4 pb-4">
                  Inspired by my upbringing in a small town surrounded by
                  nature’s beauty—from serene lakes and golden beaches to the
                  changing seasons—I developed a deep appreciation for the
                  scents of the world around me. These aromas evoke comfort,
                  joy, and nostalgia, and I wanted to create fragrances that
                  carry these sentiments forward.
                </p>

                <p class="pt-4 pb-4">
                  At Zecado, our mission is simple yet profound: to create
                  scents that exude nostalgia, confidence, and simplicity. I
                  believe a fragrance should be more than an accessory; it
                  should be an extension of who you are. Our vision is to make
                  Zecado a rare and essential part of life, a must-have for
                  everyone who seeks depth in their personal scent. With each
                  fragrance, we’re committed to creating something meaningful,
                  luxurious, and entirely unique—each telling its own story,
                  just as we each have our own.
                </p>
              </div>
            </h1>
          </div>
          <div className="about-image">
            <img
              className="aboutimg2"
              src={aboutImg2}
              alt="A group of People"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex lg:flex-row flex-col gap-8 justify-around mt-24">
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
              Rooted in the belief that confidence begins with the way you
              smell, our slogan, "Zecado, The Place Where Your Confidence
              Begins," embodies our mission to empower you through the power of
              scent. We believe that the right fragrance has the ability to
              evoke a sense of confidence that radiates from within, leaving a
              lasting impression on those around you. Our fragrances not only
              make you feel good but also have the potential to transport you to
              moments of nostalgia, reminding you of cherished memories and
              experiences.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
