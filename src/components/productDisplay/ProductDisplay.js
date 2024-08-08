import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, incrementQuantity, decrementQuantity } from '../../slices/CartSlice';
import { PiHeartThin } from "react-icons/pi";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "./productdisplay.css";

const ProductDisplay = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [priceClass, setPriceClass] = useState('');
  
  const cartItem = useSelector(state => state.cart.cart.find(item => item.id === product.id));
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
    },
    // {
    //   original: product.imageUrl,
    //   thumbnail: product.imageUrl,
    // }
  ];

  return (
    <div className="mx-auto container mt-12 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col items-center md:w-2/5">
        <ImageGallery items={images}
        showPlayButton={false} 
        showFullscreenButton={false} 
        showNav={false}
        />
      </div>
      <div id="product-listing" className="space-y-6 p-4 md:p-4 md:w-1/2">
        <div className="flex justify-between items-center space-x-20">
          <h1 className="text-3xl font-medium" id="product-title">{product.name}</h1>
          <PiHeartThin className="text-2xl" />
        </div>
        <h2 className={`font-medium text-2xl price ${priceClass}`}>$ {product.price}</h2>
        <p>Quantity</p>
        <div className="flex space-x-2">
          <button className="border border-gray-300 px-2 py-2" onClick={decrementLocalQuantity}>-</button>
          <p className="border border-gray-300 px-6 py-2">{quantity}</p>
          <button className="border border-gray-300 px-2 py-2" onClick={incrementLocalQuantity}>+</button>
        </div>
        <div className="flex space-x-6">
          <button className="bg-brown text-white px-16 py-2">Buy Now</button>
          <button className="text-black border border-black px-16 py-2" onClick={handleAddToCart}>
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
          <div>{product.description}</div>
          <hr className="border border-gray-300 mt-4" />
        </div>
      </div>
    </div>
  );
};
export default ProductDisplay;
