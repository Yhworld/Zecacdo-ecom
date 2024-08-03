import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const userDetails = state?.userDetails || {};

  return (
    <div className='flex flex-col items-center space-y-4 mt-8'>
      <h1 className='text-2xl font-bold'>Order Confirmation</h1>
      <p>Thank you for your order!</p>
      <p className='text-center'>Your order ID is <span className='font-semibold'>{orderId}</span>.</p>
      <p className='text-center'>You will receive an email confirmation shortly.</p>
      <p className='text-center'>Customer Name: <span className='font-semibold'>{userDetails.firstName}</span></p>
      <p className='text-center'>Customer Email: <span className='font-semibold'>{userDetails.email}</span></p>
      <button onClick={() => navigate('/')} className="mt-4 bg-brown text-white px-4 py-2 rounded">Continue Shopping</button>
    </div>
  );
};

export default OrderConfirmation;
