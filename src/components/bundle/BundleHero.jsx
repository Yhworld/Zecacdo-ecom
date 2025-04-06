import React from "react";
import "./bundle.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { processImageUrl } from "../../utils/Timeout";



const DEFAULT_IMAGE = "../../public/default.jpg";

function BundleHero() {
  const { homepage, loading, error } = useSelector((state) => state.homepage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {JSON.stringify(error)}</p>;
  const divSections = homepage?.filter(item => item.sectionType === "div") || [];

 // ✅ Use first two divs as bundles
 const bundle1 = divSections[0] || {};
 const bundle2 = divSections[1] || {};

  const DEFAULT_IMAGE = "/default.jpg";

  const backgroundImageBlack = processImageUrl(bundle1.imageUrl)?.trim() || DEFAULT_IMAGE;
  const backgroundImageWhite = processImageUrl(bundle2.imageUrl)?.trim() || DEFAULT_IMAGE;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center relative mb-28 mt-36">

      {/* Black Bundle */}
      <div
        className="text-white flex flex-col justify-end pl-16 pb-12 bundle-section"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.6), rgb(12, 12, 12)), url(${backgroundImageBlack})`,
        }}
      >
        <p className="text-sm">{bundle1.highlightLabel || "JUST FOR YOU"}</p>
        <h2 className="font-bold text-3xl pt-2">{bundle1.title || "NEW BUNDLE COLLECTION"}</h2>
        <p className="text-sm">{bundle1.description || "Explore our exclusive bundles."}</p>
        <div className="mt-4">
          <Link to={bundle1?.buttonLink || "/shop"} className="shop-button">{bundle1.buttonText || "Shop now"}</Link>
        </div>
      </div>

      {/* White Bundle */}
      <div
        className="text-white flex flex-col justify-end pl-16 pb-12 bundle-section"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.6), rgb(12, 12, 12)), url(${backgroundImageWhite})`,
        }}
      >
        <p className="text-sm">{bundle2.highlightLabel || "JUST FOR YOU"}</p>
        <h2 className="font-bold text-3xl pt-2">{bundle2.title || "NEW BUNDLE COLLECTION"}</h2>
        <p className="text-sm">{bundle2.description || "Explore our exclusive bundles."}</p>
        <div className="mt-4">
          <Link to={bundle2?.buttonLink || "/shop"} className="shop-button">{bundle2.buttonText || "Shop now"}</Link>
        </div>
      </div>

    </div>
  );
}

export default BundleHero;
