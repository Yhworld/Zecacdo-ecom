import React from "react";
import { Link } from "react-router-dom";
import "./cta.css";
import { useSelector } from "react-redux";

function Cta() {
  const homepage = useSelector((state) => state.homepage.homepage || []);


  
  // ⛳ Filter for cta type section
  const ctaData = homepage.find(item => item.sectionType === "cta") || {};

  return (
    <section
      id="cta-hero"
      className="flex flex-col items-center justify-center rounded-lg relative mx-auto mt-32 p-32"
      style={{
        backgroundImage: `url(${ctaData.imageUrl || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    </section>
  );
}

export default Cta;
