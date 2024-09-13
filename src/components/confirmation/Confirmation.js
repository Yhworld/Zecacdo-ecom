import React, { useEffect } from 'react';
import './confirm.css'
import { useDispatch } from 'react-redux';
import { clearCart } from '../../slices/CartSlice';
let bag = require('../../assets/bag.png')

function Confirmation() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart on confirmation page load
    const clearUserCart = async () => {
      try {
        // Optionally, verify payment status if needed
        dispatch(clearCart());
        console.log('Cart has been cleared.');
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    };

    clearUserCart();
  }, [dispatch]);

  return (
    <div className='max-w-screen-xl mt-4 container mx-auto p-4 md:pl-12'>
        <div className='flex items-center flex-col space-y-4'>
            <img className='w-36' src={bag} alt="shopping bag" />
            <h1 className='confirm-title text-2xl font-semibold text-center'>Thank You for Your Purchase!</h1>
            <p className='text-center md:w-2/3'>Your order has been successfully placed and is being processed. Further details, including tracking information, will be sent to your email shortly.
</p>
        </div>
    </div>
  )
}

export default Confirmation