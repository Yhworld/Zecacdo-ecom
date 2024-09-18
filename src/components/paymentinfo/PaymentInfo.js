import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart } from '../../slices/CartSlice';
import { persistor } from '../../store/store';

const PaymentInformation = ({ onNext, onPrevious, initialData }) => {
  const stripePromise = useMemo(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY), []); // memoize stripe initialization
  const dispatch = useDispatch();

  // Callback to fetch the client secret from the server
  const fetchClientSecret = useCallback(async () => {
    if (!initialData || !initialData.items) {
      // console.error('Initial data or items are missing');
      return;
    }

    try {
      const payload = {
        items: initialData.items, // Only send the items, no customer details
      };


      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}create-checkout-session`, {
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
      console.log('Client secret fetched:', data.clientSecret);
      return data.clientSecret;
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  }, [initialData]);

  // Memoize the handlePaymentComplete function to avoid prop change
  const handlePaymentComplete = useCallback(async () => {
    try {
      // Clear the cart
      dispatch(clearCart());

      // Wait for the persistor to flush
      await persistor.flush();

      // console.log('Cart has been cleared and localStorage updated');
    } catch (error) {
      // console.error('Error handling payment completion:', error);
    }
  }, [dispatch]);

  // Memoize the options to prevent prop change on EmbeddedCheckoutProvider
  const options = useMemo(() => ({
    fetchClientSecret,
    onComplete: handlePaymentComplete,
  }), [fetchClientSecret, handlePaymentComplete]);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default PaymentInformation;
