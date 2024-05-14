import React, { useEffect, useState } from "react";
import Hero from '../components/Carousel/Hero'
import Feature from '../components/Feature/Feature'
import BundleHero from '../components/bundle/BundleHero'
import Cta from '../components/cta/Cta'


function HomePage() {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    const handleZoomChange = () => {
      const ratio = window.outerWidth / window.innerWidth;
      setZoomLevel(ratio);
    };

    window.addEventListener("resize", handleZoomChange);
    return () => {
      window.removeEventListener("resize", handleZoomChange);
    };
  }, []);
  return (
    <div className={`${zoomLevel < 0.7 ? "mx-auto container" : ""}`}>
    <Hero />
    <Feature />
    <BundleHero />
    <Cta />
    </div>
  )
}

export default HomePage