import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { clearCart } from '../../slices/CartSlice';
import { persistor } from '../../store/store';
import Spinner from '../spinner/Spinner'

const PaymentInformation = ({ onNext, onPrevious, initialData }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  // Memoize stripe initialization
  const stripePromise = useMemo(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY), []);

  // Fetch client secret from server
  const fetchClientSecret = useCallback(async () => {
    if (!initialData || !initialData.items) {
      setErrorMessage('No items available for checkout.');
      return;
    }
    console.log(initialData);
    console.log('Items in cart:', initialData.cartID);

    try {
      const payload = {
        items: initialData.items,
        cartID: initialData.cartID,
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
      setClientSecret(data.clientSecret);
      return data.clientSecret;
    } catch (error) {
      setErrorMessage('Error fetching payment details. Please try again.');
      console.error('Error fetching client secret:', error);
    }
  }, [initialData]);

  // Clear cart after payment
  const handlePaymentComplete = useCallback(async () => {
    try {
      dispatch(clearCart());
      await persistor.flush();
      console.log('Cart has been cleared');
    } catch (error) {
      console.error('Error handling payment completion:', error);
    }
  }, [dispatch]);

  // Memoize options
  const options = useMemo(() => ({
    fetchClientSecret,
    onComplete: handlePaymentComplete,
  }), [fetchClientSecret, handlePaymentComplete]);

  // Fetch client secret on component mount
  useEffect(() => {
    fetchClientSecret();
  }, [fetchClientSecret]);

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!clientSecret) {
    return <Spinner />
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default PaymentInformation;
