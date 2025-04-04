import React from "react";
import "./bundle.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { processImageUrl } from "../../utils/Timeout";

// ✅ Fallback/default image (make sure this exists in your public folder)
const DEFAULT_IMAGE = "../../public/default.jpg";

function BundleHero() {
  const { homepage, loading, error } = useSelector((state) => state.homepage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {JSON.stringify(error)}</p>;

  const homepageData = homepage?.[0] || {};

  // ✅ Ensure fallback image if URL is empty/null/invalid
  const backgroundImageBlack =
    processImageUrl(homepageData.imageUrl)?.trim() || DEFAULT_IMAGE;

  const backgroundImageWhite =
    processImageUrl(homepageData.imageUrl1)?.trim() || DEFAULT_IMAGE;

  const title = homepageData.title || "NEW BUNDLE COLLECTION";
  const description = homepageData.description || "Explore our exclusive bundles.";

  return (
    <div className="flex flex-col md:flex-row justify-between items-center relative mb-28 mt-36">
      {/* Black Bundle */}
      <div
        className="text-white flex flex-col justify-end pl-16 pb-12 bundle-section"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.6), rgb(12, 12, 12)), url(${backgroundImageBlack})`,
        }}
      >
        <p className="text-sm">JUST FOR YOU</p>
        <h2 className="font-bold text-3xl pt-2">{title}</h2>
        <p className="text-sm">{description}</p>
        <div className="mt-4">
          <Link to="/shop" className="shop-button">Shop now</Link>
        </div>
      </div>

      {/* White Bundle */}
      <div
        className="text-white flex flex-col justify-end pl-16 pb-12 bundle-section"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.6), rgb(12, 12, 12)), url(${backgroundImageWhite})`,
        }}
      >
        <p className="text-sm">JUST FOR YOU</p>
        <h2 className="font-bold text-3xl pt-2">{title}</h2>
        <p className="text-sm">{description}</p>
        <div className="mt-4">
          <Link to="/shop" className="shop-button">Shop now</Link>
        </div>
      </div>
    </div>
  );
}

export default BundleHero;
