import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart } from '../../slices/CartSlice';

const PaymentInformation = ({ onNext, onPrevious, initialData }) => {
  const stripePromise = loadStripe('pk_test_51PgDnrRqi6j1CvUPecANJms2XRCq0af9Xnyo0TEiKFkCg94XfURKW8fUrVj5bTvfcfi9eFD53qrT1WQrw4Yqja660014M32xRx');
  const dispatch = useDispatch();

  // Callback to fetch the client secret from the server
  const fetchClientSecret = useCallback(async () => {
    if (!initialData) {
      console.error('Initial data is missing');
      return;
    }

    try {
      const payload = {
        items: initialData.items,
        customerName: initialData.customerName,
        customerEmail: initialData.customerEmail,
      };

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch client secret');
      }

      const data = await response.json();
      return data.clientSecret;
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  }, [initialData]);

  // Handle payment completion
  const handlePaymentComplete = () => {
    dispatch(clearCart()); // Clear the cart on payment success
    onNext(); // Move to the next step if needed
  };

  // Options for the EmbeddedCheckoutProvider
  const options = {
    fetchClientSecret,
    onComplete: handlePaymentComplete, // Add this callback to clear the cart on success
  };

  return (
    <div id="checkout" className=''>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default PaymentInformation;
