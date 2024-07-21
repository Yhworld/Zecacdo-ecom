import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../cartItem/CartItem';
import './cart.css';
import Breadcrumb from '../breadcrumbs/Breadcrumb';

function Cart() {
  const cart = useSelector(state => state.cart.cart); // Ensure this matches your state structure
  const navigate = useNavigate();

  const pathMapping = {
    '/cart': 'cart',
  };

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach(item => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    totalPrice = parseFloat(totalPrice.toFixed(2)); // Round to two decimal places and convert back to number
    return { totalPrice, totalQuantity };
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    } else {
      alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
    }
  };

  return (
    <div className="max-w-screen-xl p-4 container mx-auto">
      <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
      <Breadcrumb pathMapping={pathMapping} />
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          Your cart is currently empty.
        </div>
      ) : (
        <div className='flex flex-col md:flex-row space-x-4 md:justify-between'>
          <div className='w-full'>
            {cart.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className="space-y-8 md:bg-zpink p-6 h-80 w-full md:w-1/3">
            <div className="order-summary hidden md:block md:text-center text-2xl">ORDER SUMMARY</div>
            <p className="flex justify-between text-2xl items-center">
              <span>Total:</span> <strong>${getTotal().totalPrice}</strong>
            </p>
            <p className="text-sm w-3/4">
              *Shipping & taxes calculated at checkout
            </p>
            <button onClick={handleCheckout} className="bg-brown text-white py-4 w-full text-xs font-semibold">
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
