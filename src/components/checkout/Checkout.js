import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContactInformation from '../contactinfo/ContactInformation';
import DeliveryInformation from '../deliveryinfo/DeliveryInfo';
import PaymentInformation from '../paymentinfo/PaymentInfo';
import './checkout.css'; // Ensure you have relevant styles
import { clearCart } from '../../slices/CartSlice'; // Assuming you have a cartSlice to manage cart state

const Checkout = () => {
  const cart = useSelector(state => state.cart.cart); // Assuming cart state structure
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalItems = cart.length;
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contactInfo: {},
    deliveryInfo: {},
    paymentInfo: {}
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
  }, [cart, navigate, orderSuccess]);

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, [data.type]: data.info }));
    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const orderItems = cart.map(item => ({
      product: { id: item.id },
      quantity: item.quantity
    }));

    const orderData = {
      order: {
        orderNumber: "12345666", // You might want to generate this dynamically
        status: "PENDING",
        salesTax: 12.2, // Calculate this based on your logic
        orderItem: orderItems
      }
    };

    try {
      const response = await fetch('http://localhost:8080/rest/services/create_order/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order submitted successfully:', result);
        setOrderSuccess(true);
        dispatch(clearCart());
      } else {
        console.error('Order submission failed');
        // Handle order submission failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      // Handle error during order submission (e.g., show an error message)
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ContactInformation onNext={handleNext} initialData={formData.contactInfo} />;
      case 2:
        return <DeliveryInformation onNext={handleNext} onPrevious={handlePrevious} initialData={formData.deliveryInfo} />;
      case 3:
        return <PaymentInformation onPrevious={handlePrevious} onNext={handleSubmit} initialData={formData.paymentInfo} />;
      default:
        return <ContactInformation onNext={handleNext} initialData={formData.contactInfo} />;
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
            <p>Your order number is 12345666. You will receive an email confirmation shortly.</p>
            <button onClick={() => navigate('/')} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Continue Shopping</button>
          </div>
        ) : (
          <>
            {renderStep()}
            <div className="order-summary md:border border-gray-300 p-6">
              {cart.map(item => (
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
