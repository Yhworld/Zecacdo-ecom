import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useDispatch } from 'react-redux';
import { setContactInfo } from '../../slices/contactInfoSlice';

const ContactInformation = ({ onNext, initialData }) => {
  
  const [countries, setCountries] = useState([]);
  const [phone, setPhone] = useState(initialData?.phone || '');
  
  const formik = useFormik({
    initialValues: initialData || {
      firstName: '',
      lastName: '',
      email: '',
      country: initialData?.country || 'United States',
      street: initialData?.street || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      zip: initialData?.zip || '',
      phone: initialData?.phone || '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      street: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      zip: Yup.string().required('Required').length(5, 'Must be exactly 5 digits'),
      phone: Yup.string().required('Required'),
      cardNumber: Yup.string().required('Required'),
      expiryDate: Yup.string().required('Required'),
      cvv: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      onNext({ contactInfo: values });
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
      <label className=''>Contact</label>
      <div className="form-group">
          
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="janedoe@gmail.com"
          />
          {formik.touched.email && formik.errors.email ? (
            <div  className='text-red-600'>*{formik.errors.email}</div>
          ) : null}
        </div>
        <label>Delivery</label>
        <div className='flex justify-between space-x-5'>
        <div className="form-group w-1/2">
          
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="First Name"
          />    
          {formik.touched.firstName && formik.errors.firstName ? (
            <div  className='text-red-600'>*{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div className="form-group w-1/2">
          {/* <label>Last Name</label> */}
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Last Name"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div  className='text-red-600'>*{formik.errors.lastName}</div>
          ) : null}
        </div>
        </div>
        <div className="delivery-form">
        <div className='flex space-x-4'>
        <div className={`form-group ${formik.touched.country && formik.errors.country ? 'error' : ''} w-3/5`}>
          {/* <label>Country</label> */}
          <div className="select-wrapper">
            <select
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="country-select"
            >
              <option value="" disabled>Select Country</option>
              {countries.map(country => (
                <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
              ))}
            </select>
          </div>
          {formik.touched.country && formik.errors.country ? (
            <div className="text-red-700">{formik.errors.country}</div>
          ) : null}
        </div>
        
        <div className={`form-group ${formik.touched.phone && formik.errors.phone ? 'error' : ''} w-2/5`}>
        
          <PhoneInput
            className="phone"
            defaultCountry="us"
            value={formik.values.phone}
            onChange={(phone) => formik.setFieldValue('phone', phone)}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-700">{formik.errors.phone}</div>
          ) : null}
        </div>
        </div>
        
        <div className={`form-group ${formik.touched.street && formik.errors.street ? 'error' : ''}`}>
          {/* <label></label> */}
          <input
            type="text"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Street Address"
            className={`street-input ${formik.touched.street && formik.errors.street ? 'error' : ''}`}
          />
          {formik.touched.street && formik.errors.street ? (
            <div className="text-red-700">{formik.errors.street}</div>
          ) : null}
        </div>
        <div className="location-group">
          <div className={`form-group ${formik.touched.zip && formik.errors.zip ? 'error' : ''}`}>
            <label></label>
            <input
              type="text"
              name="zip"
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="ZIP Code"
              className={`zip-input ${formik.touched.zip && formik.errors.zip ? 'error' : ''} `}
            />
            {formik.touched.zip && formik.errors.zip ? (
              <div className="text-red-700">{formik.errors.zip}</div>
            ) : null}
          </div>
          <div className={`form-group ${formik.touched.city && formik.errors.city ? 'error' : ''}`}>
            {/* <label>City</label> */}
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`city-input ${formik.touched.city && formik.errors.city ? 'error' : ''}`}
              placeholder="City"
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-700">{formik.errors.city}</div>
            ) : null}
          </div>
          <div className={`form-group ${formik.touched.state && formik.errors.state ? 'error' : ''}`}>
            {/* <label>State</label> */}
            <input
              type="text"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`state-input ${formik.touched.state && formik.errors.state ? 'error' : ''}`}
              placeholder="State"
            />
            {formik.touched.state && formik.errors.state ? (
              <div className="text-red-700">{formik.errors.state}</div>
            ) : null}
          </div>
        </div>
      </div>
        <button type="submit" className="continue-button">Continue Delivery</button>
      </div>
    </form>
  );
};

export default ContactInformation;
