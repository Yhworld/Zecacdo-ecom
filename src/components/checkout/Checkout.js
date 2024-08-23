import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactInformation from '../contactinfo/ContactInformation';
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
  const [contactInfo, setContactInfo] = useState(null); // Store contact information

  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const items = cart.map(item => ({ id: item.id, quantity: item.quantity })); // Map to array of objects with id and quantity

  useEffect(() => {
    if (cart.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
  }, [cart, navigate, orderSuccess]);

  useEffect(() => {
    if (orderStatus === 'succeeded') {
      setOrderSuccess(true);
      console.log('Order succeeded with ID:', orderId);
      setTimeout(() => {
        dispatch(clearCart());
        navigate(`/orderid/${orderId}`);
      }, 3000);
    } else if (orderStatus === 'failed') {
      console.error('Order submission failed:', orderError);
    }
  }, [orderStatus, orderId, dispatch, navigate, orderError]);

  const handleNext = (values) => {
    setContactInfo(values); // Save contact information when moving to the next step
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        items, // Pass the array of item objects with id and quantity
        customerName: `${contactInfo.firstName} ${contactInfo.lastName}`,
        customerEmail: contactInfo.email,
      };

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const session = await response.json();

      if (session && session.url) {
        window.location.href = session.url; // Redirect to Stripe Checkout
      } else {
        console.error('Failed to create Stripe session');
      }
    } catch (error) {
      console.error('Error redirecting to Stripe:', error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto container p-4 pl-12">
      {step === 1 && (
        <>
          <div className="breadcrumb">
            Home / Checkout
          </div>
          <h2>CHECKOUT</h2>
        </>
      )}
      <div className="great-box">
        {orderSuccess ? (
          <div className="order-success-message">
            <h2>Thank you for your order!</h2>
            <p>Your order ID is {orderId}. You will receive an email confirmation shortly.</p>
            <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Continue Shopping</button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <>
                <ContactInformation onNext={handleNext} />
                <div className="order-summary md:border border-gray-300 p-6 mx-auto max-w-md">
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
            {step === 2 && (
              <div className="checkout-payment">
                <PaymentInformation
                  onPrevious={handlePrevious}
                  initialData={{ ...contactInfo, items }} // Pass the structured items array
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
