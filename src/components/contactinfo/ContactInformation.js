import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useDispatch } from 'react-redux';
import { setContactInfo } from '../../slices/contactInfoSlice';

const ContactInformation = ({ onNext, initialData }) => {
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialData || {
      firstName: '',
      lastName: '',
      email: '',
      country: 'United States',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      country: Yup.string().required('Required'),
      street: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      zip: Yup.string().required('Required').length(5, 'Must be exactly 5 digits'),
      phone: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(setContactInfo(values));  // Save contact info in Redux store
      onNext(values);  // Pass form values to the parent component
    },
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sortedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <form className="contact-info" onSubmit={formik.handleSubmit}> 
      <div className="contact-form">
        <label className='form-label'>Contact Information</label>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="janedoe@gmail.com"
            className="form-input"
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-red-600'>{formik.errors.email}</div>
          )}
        </div>
        <label className='form-label'>Delivery Information</label>
        <div className='flex justify-between space-x-5'>
          <div className="form-group w-1/2">
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="First Name"
              className="form-input"
            />    
            {formik.touched.firstName && formik.errors.firstName && (
              <div className='text-red-600'>{formik.errors.firstName}</div>
            )}
          </div>
          <div className="form-group w-1/2">
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Last Name"
              className="form-input"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className='text-red-600'>{formik.errors.lastName}</div>
            )}
          </div>
        </div>
        <div className="delivery-form">
          <div className='flex space-x-4'>
            <div className="form-group w-3/5">
              <select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-input"
              >
                <option value="" disabled>Select Country</option>
                {countries.map(country => (
                  <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                ))}
              </select>
              {formik.touched.country && formik.errors.country && (
                <div className="text-red-700">{formik.errors.country}</div>
              )}
            </div>
            <div className="form-group w-2/5">
              <PhoneInput
                className="form-input"
                defaultCountry="us"
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue('phone', phone)}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-700">{formik.errors.phone}</div>
              )}
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="street"
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Street Address"
              className="form-input"
            />
            {formik.touched.street && formik.errors.street && (
              <div className="text-red-700">{formik.errors.street}</div>
            )}
          </div>
          <div className="flex space-x-4">
            <div className="form-group w-1/3">
              <input
                type="text"
                name="zip"
                value={formik.values.zip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="ZIP Code"
                className="form-input"
              />
              {formik.touched.zip && formik.errors.zip && (
                <div className="text-red-700">{formik.errors.zip}</div>
              )}
            </div>
            <div className="form-group w-1/3">
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="City"
                className="form-input"
              />
              {formik.touched.city && formik.errors.city && (
                <div className="text-red-700">{formik.errors.city}</div>
              )}
            </div>
            <div className="form-group w-1/3">
              <input
                type="text"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="State"
                className="form-input"
              />
              {formik.touched.state && formik.errors.state && (
                <div className="text-red-700">{formik.errors.state}</div>
              )}
            </div>
          </div>
        </div>
        <button type="submit" className="continue-button">Continue Payment</button>
      </div>
    </form>
  );
};

export default ContactInformation;
