import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/CartSlice';
import { PiHeartThin } from "react-icons/pi";
import "./productdisplay.css";

export const ProductDisplay = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [priceClass, setPriceClass] = useState('');

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      quantity: quantity
    }));
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    triggerPriceAnimation();
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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

  return (
    <div className="mx-auto container mt-12 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col items-center md:w-2/5">
        <div id="main-img">
          <img src={product.image} alt="mainimage" />
        </div>
        <div id="sub-images" className="flex w-20 md:w-28 items-center justify-center">
          <img className="border border-black pt-4" src={product.image2} alt="" />
          <img src={product.image3} alt="" />
          <img src={product.image4} alt="" />
        </div>
      </div>
      <div id="product-listing" className="space-y-6 md:mr-4 md:w-1/2">
        <div className="flex justify-between items-center space-x-20">
          <h1 className="text-3xl font-medium" id="product-title">{product.title}</h1>
          <PiHeartThin className="text-2xl" />
        </div>
        <h2 className={`font-medium text-2xl price ${priceClass}`}>$ {totalPrice}</h2>
        <p>Quantity</p>
        <div className="flex space-x-2">
          <button className="border border-gray-300 px-2 py-2" onClick={decrementQuantity}>-</button>
          <p className="border border-gray-300 px-6 py-2">{quantity}</p>
          <button className="border border-gray-300 px-2 py-2" onClick={incrementQuantity}>+</button>
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
          <div className="">{product.description}</div>
          <hr className="border border-gray-300 mt-4" />
        </div>
        <div className="space-y-4">
          <hr className="border border-gray-300 mt-4" />
          <h1>Scents Profile</h1>
          <div className="">{product.description}</div>
          <hr className="border border-gray-300 mt-4" />
        </div>
      </div>
    </div>
  );
};
