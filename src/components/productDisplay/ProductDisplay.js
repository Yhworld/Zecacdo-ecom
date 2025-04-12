import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from "../../slices/CartSlice";
import { addToWishlist, removeFromWishlist } from "../../slices/wishlistslice";
import { PiHeartThin, PiHeartFill } from "react-icons/pi";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./productdisplay.css";
import { processImageUrl } from "../../utils/Timeout"; // ✅ Adjust the path if needed

import SimilarProducts from "../similar/SimilarProducts";

const ProductDisplay = (props) => {
  const { product } = props;
  console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [priceClass, setPriceClass] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For spinner on "Add to Cart"
  const [showQuantityCounter, setShowQuantityCounter] = useState(false); // For showing/hiding counter
  const [showToast, setShowToast] = useState(false);

  const cartItem = useSelector((state) =>
    state.cart.cart.find((item) => item.id === product.id)
  );

  const cartID = useSelector((state) => state.cart.cartID);

  const wishlistItem = useSelector((state) =>
    state.wishlist.wishlist.find((item) => item.id === product.id)
  );

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    setIsLoading(true); // Start spinner
    dispatch(
      addToCart({
        id: product.id,
        image: product.imageUrl,
        title: product.name,
        price: product.price,
        quantity: quantity,
      })
    );

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Simulate async action like API call
    setTimeout(() => {
      setIsLoading(false); // Stop spinner
      setShowQuantityCounter(true); // Show counter after adding to cart
    }, 1000); // Simulate 1 second delay
  };

  const handleBuyNow = () => {
    // Add the product to the cart
    handleAddToCart();

    // Redirect to the checkout page after adding the item
    navigate("/checkout");
  };

  const handleWishlistToggle = () => {
    if (wishlistItem) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(
        addToWishlist({
          id: product.id,
          image: product.imageUrl,
          title: product.name,
          price: product.price,
        })
      );
    }
  };

  const incrementLocalQuantity = () => {
    if (!cartItem) {
      handleAddToCart();
    } else {
      dispatch(incrementQuantity(product.id));
    }
    setQuantity((prevQuantity) => prevQuantity + 1);
    triggerPriceAnimation();
  };

  const decrementLocalQuantity = () => {
    if (quantity > 1) {
      dispatch(decrementQuantity(product.id));
      setQuantity((prevQuantity) => prevQuantity - 1);
      triggerPriceAnimation();
    }
  };

  const triggerPriceAnimation = () => {
    setPriceClass("price-change");
    setTimeout(() => {
      setPriceClass("");
    }, 300);
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  const images = [
    {
      original: product.imageUrl,
      thumbnail: product.imageUrl,
    },
    {
      original: product.imageUrl,
      thumbnail: product.imageUrl,
    },
    {
      original: product.imageUrl,
      thumbnail: product.imageUrl,
    },
  ];

  const allImages = [
    product.imageUrl,
    product.image1,
    product.image2,
    product.image3,
  ].filter(Boolean); // removes null/undefined
  
  const galleryImages = allImages.map((img) => ({
    original: processImageUrl(img),
    thumbnail: processImageUrl(img),
  }));
  

    

  return (
    <div className="max-w-screen-xl mx-auto container">
      <div className="mt-12 flex p-4 flex-col md:flex-row justify-between">
        <div className="flex flex-col items-center md:w-2/5">
  


<ImageGallery
  items={galleryImages}
  showPlayButton={false}
  showFullscreenButton={false}
  showNav={false}
/>

        </div>
        <div id="product-listing" className="space-y-6 p-6 md:pr-12 md:w-1/2">
          <div className="flex pt-8 md:pt-0 justify-between items-center space-x-20">
            <h1 className="text-3xl font-medium" id="product-title">
              {product.name}
            </h1>
            <div className="relative group">
              <div
                className="cursor-pointer"
                onClick={handleWishlistToggle}
                title={
                  wishlistItem ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {wishlistItem ? (
                  <PiHeartFill className="text-2xl text-red-500" />
                ) : (
                  <PiHeartThin className="text-2xl" />
                )}
              </div>
            </div>
          </div>
          <h2 className={`font-medium text-2xl price ${priceClass}`}>
            $ {product.price}
          </h2>

          {/* Show Quantity Counter only after adding to cart */}
          {showQuantityCounter && (
            <>
              <p>Quantity</p>
              <div className="flex space-x-2">
                <button
                  className="border border-gray-300 px-2 py-2"
                  onClick={decrementLocalQuantity}
                >
                  -
                </button>
                <p className="border border-gray-300 px-6 py-2">{quantity}</p>
                <button
                  className="border border-gray-300 px-2 py-2"
                  onClick={incrementLocalQuantity}
                >
                  +
                </button>
              </div>
            </>
          )}

          <div className="flex space-x-6 pt-2">
            <button
              className="bg-brown text-white px-4 py-2 md:px-16"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
            <div className="flex space-x-6">
              {!cartItem || cartItem.quantity === 0 ? (
                <button
                  className="text-black border border-black px-8 md:px-12 py-2 flex items-center justify-center"
                  onClick={handleAddToCart}
                  disabled={isLoading} // Disable the button while loading
                >
                  {isLoading ? (
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              ) : (
                <button
                  className="bg-white border-black border text-brown px-4 py-2 md:px-16"
                  onClick={() => navigate("/cart")}
                >
                  View Cart
                </button>
              )}
            </div>
            {showToast && (
              <div
                id="toast-success"
                className="fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400"
                role="alert"
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="sr-only">Check icon</span>
                </div>
                <div className="ml-3 text-brown text-sm font-normal">
                  Item added to cart successfully.
                </div>
                <button
                  type="button"
                  className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white"
                  onClick={() => setShowToast(false)}
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            )}

            {/* "Add to Cart" Button with Spinner */}
          </div>
          <div className="space-y-4">
            <hr className="border border-gray-300 mt-4" />
            <h1 className="font">Description</h1>
            <div>{product.description}</div>
            <hr className="border border-gray-300 mt-4" />
          </div>
          <div className="space-y-4">
            <hr className="border border-gray-300 mt-4" />
            <h1>Scents Profile</h1>
            <div className="flex flex-wrap">{product.scentsProfile}</div>
            <hr className="border border-gray-300 mt-4" />
          </div>
        </div>
      </div>

      <SimilarProducts productId={product.id} />
    </div>
  );
};

export default ProductDisplay;
