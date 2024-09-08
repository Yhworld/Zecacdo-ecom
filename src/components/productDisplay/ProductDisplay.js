import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../../slices/CartSlice';
import { addToWishlist, removeFromWishlist } from '../../slices/wishlistslice';
import { PiHeartThin, PiHeartFill } from "react-icons/pi"; // Import the filled heart icon
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./productdisplay.css";
import SimilarProducts from "../similar/SimilarProducts";

const ProductDisplay = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [priceClass, setPriceClass] = useState('');
  
  const cartItem = useSelector(state => state.cart.cart.find(item => item.id === product.id));
  const wishlistItem = useSelector(state => state.wishlist.wishlist.find(item => item.id === product.id)); // Track wishlist state

  const initialQuantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      image: product.imageUrl,
      title: product.name,
      price: product.price,
      quantity: quantity
    }));
  };

  const handleWishlistToggle = () => {
    if (wishlistItem) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist({
        id: product.id,
        image: product.imageUrl,
        title: product.name,
        price: product.price
      }));
    }
  };

  const incrementLocalQuantity = () => {
    if (!cartItem) {
      handleAddToCart();
    } else {
      dispatch(incrementQuantity(product.id));
    }
    setQuantity(prevQuantity => prevQuantity + 1);
    triggerPriceAnimation();
  };

  const decrementLocalQuantity = () => {
    if (quantity > 1) {
      dispatch(decrementQuantity(product.id));
      setQuantity(prevQuantity => prevQuantity - 1);
      triggerPriceAnimation();
    }
  };

  const triggerPriceAnimation = () => {
    setPriceClass('price-change');
    setTimeout(() => {
      setPriceClass('');
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
      thumbnail:product.imageUrl,
    },
    {
      original: product.imageUrl,
      thumbnail: product.imageUrl,
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto container">
    <div className=" mt-12 flex p-4 flex-col md:flex-row justify-between">
      <div className="flex flex-col items-center md:w-2/5">
        <ImageGallery items={images}
        showPlayButton={false} 
        showFullscreenButton={false} 
        showNav={false}
        />
      </div>
      <div id="product-listing" className="space-y-6 p-6 md:pr-12 md:w-1/2">
        <div className="flex pt-8 md:pt-0 justify-between items-center space-x-20">
          <h1 className="text-3xl font-medium" id="product-title">{product.name}</h1>
          {/* Heart Icon with Tooltip and Toggle Functionality */}
          <div className="relative group">
            <div 
              className="cursor-pointer" 
              onClick={handleWishlistToggle} 
              title={wishlistItem ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlistItem ? (
                <PiHeartFill className="text-2xl text-red-500" />
              ) : (
                <PiHeartThin className="text-2xl" />
              )}
            </div>
            <span className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
              {wishlistItem ? "Remove from wishlist" : "Add to wishlist"}
            </span>
          </div>
        </div>
        <h2 className={`font-medium text-2xl price ${priceClass}`}>$ {product.price}</h2>
        <p>Quantity</p>
        <div className="flex space-x-2">
          <button className="border border-gray-300 px-2 py-2" onClick={decrementLocalQuantity}>-</button>
          <p className="border border-gray-300 px-6 py-2">{quantity}</p>
          <button className="border border-gray-300 px-2 py-2" onClick={incrementLocalQuantity}>+</button>
        </div>
        <div className="flex space-x-6">
          <button className="bg-brown text-white px-8 py-2 md:px-16">Buy Now</button>
          <button className="text-black border border-black px-8 md:px-12 py-2" onClick={handleAddToCart}>
            Add to cart
          </button>
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
          <div className="flex flex-wrap">{product.description}</div>
          <hr className="border border-gray-300 mt-4" />
        </div>
      </div>
      </div>
      <SimilarProducts currentProduct={product} />
    </div>
  );
};

export default ProductDisplay;
