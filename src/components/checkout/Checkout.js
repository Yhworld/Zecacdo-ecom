import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactInformation from '../contactinfo/ContactInformation';
import DeliveryInformation from '../deliveryinfo/DeliveryInfo';
import PaymentInformation from '../paymentinfo/PaymentInfo';
import './checkout.css';
import { clearCart } from '../../slices/CartSlice';
import { submitOrder } from '../../slices/orderSlice';
import { submitCustomer } from '../../slices/customerSlice';
import { setContactInfo } from '../../slices/contactInfoSlice';
import { setDeliveryInfo } from '../../slices/deliveryInfoSlice';
import { setPaymentInfo } from '../../slices/paymentInfoSlice';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const order = useSelector((state) => state.order);
  const customer = useSelector((state) => state.customer);
  const contactInfo = useSelector((state) => state.contactInfo) || {};
  const deliveryInfo = useSelector((state) => state.deliveryInfo) || {};
  const paymentInfo = useSelector((state) => state.paymentInfo) || {};

  const orderId = order ? order.id : null;
  const orderStatus = order ? order.status : null;
  const orderError = order ? order.error : null;
  const customerStatus = customer ? customer.status : null;
  const customerError = customer ? customer.error : null;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

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
      setTimeout(() => {
        dispatch(clearCart());
        navigate(`/orderid/${orderId}`, { state: { userDetails } });
      }, 3000);
    } else if (orderStatus === 'failed') {
      console.error('Order submission failed:', orderError);
    }
  }, [orderStatus, orderId, dispatch, navigate, orderError, userDetails]);

  const handleNext = (data) => {
    if (step === 1) {
      dispatch(setContactInfo(data.contactInfo));
    } else if (step === 2) {
      dispatch(setDeliveryInfo(data.deliveryInfo));
    } else if (step === 3) {
      dispatch(setPaymentInfo(data.paymentInfo));
    }
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Verify that all address fields are present
    const address = {
      stateCode: deliveryInfo.stateCode,
      state: deliveryInfo.state,
      city: deliveryInfo.city,
      country: deliveryInfo.country,
      postalCode: deliveryInfo.postalCode,
      countryCode: deliveryInfo.countryCode,
      latitude: deliveryInfo.latitude,
      longitude: deliveryInfo.longitude,
    };

    // Check if address fields are properly populated
    if (!address.stateCode || !address.state || !address.city || !address.country || !address.postalCode) {
      console.error('Address fields are missing');
      setLoading(false);
      return;
    }

    const customerData = {
      customer: {
        email: contactInfo.email,
        phoneNumber: contactInfo.phoneNumber,
        address: [address],
      },
    };

    try {
      console.log('Submitting customer data:', customerData);
      const customerResponse = await dispatch(submitCustomer(customerData)).unwrap();
      console.log('Customer response:', customerResponse);

      setUserDetails({
        firstName: contactInfo.firstName,
        email: contactInfo.email,
        customerId: customerResponse.customer.id,
      });

      const orderItems = cart.map((item) => ({
        product: { id: item.id },
        quantity: item.quantity,
      }));

      const orderData = {
        order: {
          status: 'PENDING',
          salesTax: 12.2,
          orderItem: orderItems,
          customer: {
            ...contactInfo,
            address: [deliveryInfo],
          },
        },
      };

      console.log('Submitting order data:', orderData);
      const orderResult = await dispatch(submitOrder(orderData)).unwrap();
      console.log('Order result:', orderResult);

      const linkCustomerToOrder = {
        username: contactInfo.firstName,
      };

      await fetch(`http://localhost:8080/orders/${orderResult.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(linkCustomerToOrder),
      });

      setLoading(false);
    } catch (error) {
      console.error('Submission failed:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ContactInformation onNext={handleNext} initialData={contactInfo} />;
      case 2:
        return <DeliveryInformation onNext={handleNext} onPrevious={handlePrevious} initialData={deliveryInfo} />;
      case 3:
        return <PaymentInformation onPrevious={handlePrevious} onNext={handleSubmit} initialData={paymentInfo} />;
      default:
        return <ContactInformation onNext={handleNext} />;
    }
  };


  return (
    <div className="max-w-screen-xl mx-auto container p-4">
      <div className="breadcrumb">
        Home / Checkout
      </div>
      <h2>CHECKOUT</h2>
      <div className="checkout-steps md:space-x-6 space-x-4">
        <span className={step === 1 ? 'active' : ''}>1. Contact Information</span>
        &gt;
        <span className={step === 2 ? 'active' : ''}>2. Delivery Information</span>
        &gt;
        <span className={step === 3 ? 'active' : ''}>3. Payment Information</span>
      </div>
      <div className="great-box">
        {orderSuccess ? (
          <div className="order-success-message">
            <h2>Thank you for your order!</h2>
            <p>Your order ID is {orderId}. You will receive an email confirmation shortly.</p>
            <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Continue Shopping</button>
          </div>
        ) : (
          <>
            {renderStep()}
            <div className="order-summary md:border border-gray-300 p-6">
              {cart.map((item) => (
                <div key={item.id} className="summary-item mb-4 border border-black p-2">
                  <img src={item.image} alt={item.name} className="w-24 h-24 mb-2" />
                  <div className="summary-item-details">
                    {item.title}
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">
                    $ {item.price}
                  </div>
                </div>
              ))}
              <div className="summary-total">
                <div className="total-items flex justify-between mb-2">
                  <span>Items [{totalItems}]</span>
                  <span>$ {totalPrice}</span>
                </div>
                <div className="shipping-fee flex justify-between mb-2">
                  <span>Shipping Fee</span>
                  <span>Enter shipping address</span>
                </div>
                <div className="order-total flex justify-between font-bold">
                  <span>ORDER TOTAL:</span>
                  <span>$ {totalPrice}</span>
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
