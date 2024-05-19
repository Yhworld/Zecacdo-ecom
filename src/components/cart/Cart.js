import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../cartItem/CartItem';

function Cart() {
  const cart = useSelector(state => state.cart.cart); // Ensure this matches your state structure

  return (
    <div className="cart__left p-4">
      <div>
        <h3 className="text-2xl font-bold mb-4">Shopping Cart</h3>
        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is currently empty.
          </div>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
