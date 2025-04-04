import React, { useEffect, useState } from "react";
import Hero from '../components/Carousel/Hero';
import Feature from '../components/Feature/Feature';
import BundleHero from '../components/bundle/BundleHero';
import Cta from '../components/cta/Cta';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchHomepage } from "../slices/homepageSlice"; 

function HomePage()
 {
  const dispatch = useDispatch();
  const { homepage, loading, error } = useSelector((state) => state.homepage);

  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    
  console.log("Dispatching fetchHomepage...");
  dispatch(fetchHomepage());
    AOS.init({ duration: 1200 });
    const handleZoomChange = () => {
      const ratio = window.outerWidth / window.innerWidth;
      setZoomLevel(ratio);
      
    };

    window.addEventListener("resize", handleZoomChange);
    return () => {
      window.removeEventListener("resize", handleZoomChange);
    };
  }, [dispatch]);

  return (
    <div className={`${zoomLevel < 0.3 ? "mx-auto container" : ""}`}>
        <Hero />
      <div data-aos="fade-up" data-aos-delay="200">
        <Feature />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <BundleHero />
      </div>
      <div data-aos="fade-up" data-aos-delay="600">
        <Cta />
      </div>
      {loading && <p>Loading homepage...</p>}{error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}

    </div>
    
  );


}

export default HomePage;
