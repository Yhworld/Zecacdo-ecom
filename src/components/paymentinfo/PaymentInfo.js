import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PaymentInformation = ({ onNext, onPrevious, initialData }) => {
  const formik = useFormik({
    initialValues: initialData || {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string().required('Required'),
      expiryDate: Yup.string().required('Required'),
      cvv: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      onNext({ paymentInfo: values });
    },
  });

  return (
    <div className="payment-info">
      <h3>Payment Information</h3>
      <form className="payment-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="1234 5678 9012 3456"
          />
          {formik.touched.cardNumber && formik.errors.cardNumber ? (
            <div>{formik.errors.cardNumber}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="MM/YY"
          />
          {formik.touched.expiryDate && formik.errors.expiryDate ? (
            <div>{formik.errors.expiryDate}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="123"
          />
          {formik.touched.cvv && formik.errors.cvv ? (
            <div>{formik.errors.cvv}</div>
          ) : null}
        </div>
        <button type="button" className="continue-button" onClick={onPrevious}>Back</button>
        <button type="submit" className="continue-button">Submit Order</button>
      </form>
    </div>
  );
};

export default PaymentInformation;
