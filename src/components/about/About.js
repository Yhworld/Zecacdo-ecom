import React from "react";
// import Cta from "../CTA/Cta";
// import Footer from "../Footer/Footer";
import './about.css'
let aboutImg = require("../../assets/campaign-creators-gMsnXqILjp4-unsplash.jpg");

function About() {
  return (
    <>
    <div id="about" className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8 mt-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
            Our Story
          </h1>
          <p className="font-normal text-base leading-6 text-gray-600">
            Founded in 2023, AV-System is a leading provider of innovative
            audio, video, and networking solutions. Our founder, Ibrahim
            Bahloul, envisioned a company that prioritizes innovation and
            creativity in every project.
            <p className="pt-4 pb-4">
              With a focus on user satisfaction, AV-System delivers tailored
              solutions to meet the unique needs of each client. Our team of
              skilled professionals is dedicated to creating immersive
              audiovisual experiences that exceed expectations.
            </p>
            <p>
              From designing cutting-edge audiovisual systems to implementing
              reliable networking solutions, AV-System is committed to
              delivering exceptional quality and service. We pride ourselves on
              our commitment to innovation, reliability, and customer
              satisfaction, making us your trusted partner in technology.
            </p>
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
          At AV-System, our mission is simple: to provide top-quality audio, video, and networking solutions that exceed expectations and enhance user experiences. With a commitment to innovation and customer satisfaction, we aim to deliver cutting-edge technology and personalized service to every client. Our goal is to revolutionize the industry by offering reliable, user-friendly solutions that empower our clients to thrive in today's digital landscape.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;
