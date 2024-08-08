import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactInformation from '../contactinfo/ContactInformation';
import DeliveryInformation from '../deliveryinfo/DeliveryInfo';
import PaymentInformation from '../paymentinfo/PaymentInfo';
import './checkout.css';
import { clearCart } from '../../slices/CartSlice';
import { submitOrder } from '../../slices/orderSlice';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const order = useSelector((state) => state.order);
  const orderId = order?.id;
  const orderStatus = order?.status;
  const orderError = order?.error;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  useEffect(() => {
    if (cart.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
  }, [cart, navigate, orderSuccess]);

  useEffect(() => {
    if (orderStatus === 'succeeded') {
      setOrderSuccess(true);
      console.log('Order succeeded with ID:', orderId); // Log order success and ID
      setTimeout(() => {
        dispatch(clearCart());
        navigate(`/orderid/${orderId}`);
      }, 3000);
    } else if (orderStatus === 'failed') {
      console.error('Order submission failed:', orderError);
    }
  }, [orderStatus, orderId, dispatch, navigate, orderError]);

  const handleNext = (data) => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Submitting order...');
    const orderItems = cart.map((item) => ({
      product: { id: item.id },
      quantity: item.quantity,
    }));

    const orderData = {
      order: {
        status: "PENDING",
        salesTax: 12.2,
        orderItem: orderItems,
      },
    };

    console.log('Order data being submitted:', orderData); // Log the order data being submitted
    dispatch(submitOrder(orderData));
  };

  // const renderStep = () => {
  //   switch (step) {
  //     case 1:
  //       return <ContactInformation onNext={handleNext} />;
  //     case 2:
  //       return <DeliveryInformation onNext={handleNext} onPrevious={handlePrevious} />;
  //     case 3:
  //       return <PaymentInformation onPrevious={handlePrevious} onNext={handleSubmit} />;
  //     default:
  //       return <ContactInformation onNext={handleNext} />;
  //   }
  // };

  return (
    <div className="max-w-screen-xl mx-auto container p-4">
      <div className="breadcrumb">
        Home / Checkout
      </div>
      <h2>CHECKOUT</h2>
      {/* <div className="checkout-steps md:space-x-6 space-x-4">
        <span className={step === 1 ? 'active' : ''}>1. Contact Information</span>
        &gt;
        <span className={step === 2 ? 'active' : ''}>2. Delivery Information</span>
        &gt;
        <span className={step === 3 ? 'active' : ''}>3. Payment Information</span>
      </div> */}
      <div className="great-box">
        {orderSuccess ? (
          <div className="order-success-message">
            <h2>Thank you for your order!</h2>
            <p>Your order ID is {orderId}. You will receive an email confirmation shortly.</p>
            <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Continue Shopping</button>
          </div>
        ) : (
          <>
          <ContactInformation />
            {/* {renderStep()} */}
            <div className="order-summary md:border border-gray-300 p-6">
              <div className='sticky'>
              {cart.map((item) => (
                
                <div key={item.id} className="summary-item mb-4">
                  <div className='flex items-center space-x-14'>
                  <div className='relative border border-grey-200'>
                     <img src={item.image} alt={item.name} className="w-24 h-24 mt-2" />
                     <span className="font-bold absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-full px-2">
                    × {item.quantity}
              </span>
                  </div>
                 
                  <div className="summary-item-details">
                    {item.title}
                    {/* <p>Qty: {item.quantity}</p> */}
                  </div>
                  </div>
                  <div className="summary-item-price">
                    $ {item.price}
                  </div>
                </div>
              ))}
              <div className="summary-total pt-4">
                <div className="total-items flex justify-between mb-2">
                  <span>Items [{totalItems}]</span>
                  <span>$ {totalPrice}</span>
                </div>
                <div className="shipping-fee flex justify-between mb-2">
                  <span>Shipping Fee</span>
                  <span>Enter shipping address</span>
                </div>
                <div className="order-total flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>$ {totalPrice}</span>
                </div>
              </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
