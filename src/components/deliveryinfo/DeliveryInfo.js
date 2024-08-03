import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { PhoneInput } from 'react-international-phone';
import * as Yup from 'yup';
import debounce from 'lodash/debounce';
import 'react-international-phone/style.css';
import './delivery.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDeliveryInfo } from '../../slices/deliveryInfoSlice';

const DeliveryInformation = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const initialData = useSelector((state) => state.deliveryInfo);

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [phone, setPhone] = useState(initialData?.phone || '');

  // Fetch countries on component mount
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

  const formik = useFormik({
    initialValues: {
      country: initialData?.country || 'United States',
      street: initialData?.street || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      zip: initialData?.zip || '',
      phone: initialData?.phone || ''
    },
    validationSchema: Yup.object({
      street: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      zip: Yup.string().required('Required').length(5, 'Must be exactly 5 digits'),
      phone: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      dispatch(setDeliveryInfo(values));
      onNext();
    },
  });

  useEffect(() => {
    const fetchLocationData = async (zip) => {
      setLoading(true);
      try {
        const apiUrl = `https://api.zipcodestack.com/v1/search?codes=${zip}&country=us&apiKey=01J2NHN1AW06Y7D1S3F93DMXDN`;
        const response = await fetch(`https://fierce-peak-54647-2ba39afbb261.herokuapp.com/${apiUrl}`, {
          headers: {
            'Accept': 'application/json',
            'apiKey': '01J2NHN1AW06Y7D1S3F93DMXDN',
            'Origin': 'http://localhost:3000'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.results[zip] && data.results[zip].length > 0) {
          const { city, state } = data.results[zip][0];
          formik.setFieldValue('city', city);
          formik.setFieldValue('state', state);
        } else {
          formik.setFieldValue('city', '');
          formik.setFieldValue('state', '');
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        formik.setFieldValue('city', '');
        formik.setFieldValue('state', '');
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = debounce((zip) => {
      fetchLocationData(zip);
    }, 500);

    if (formik.values.zip.length === 5) {
      debounceFetch(formik.values.zip);
    }

    return () => {
      debounceFetch.cancel();
    };
  }, [formik.values.zip]);

  return (
    <div className="delivery-info">
      <form className="delivery-form" onSubmit={formik.handleSubmit}>
        <div className={`form-group ${formik.touched.country && formik.errors.country ? 'error' : ''}`}>
          <label>Country</label>
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
        <div className={`form-group ${formik.touched.phone && formik.errors.phone ? 'error' : ''}`}>
          <label>Phone</label>
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
        <div className={`form-group ${formik.touched.street && formik.errors.street ? 'error' : ''}`}>
          <label>Street Address</label>
          <input
            type="text"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="123 Main St"
            className={`street-input ${formik.touched.street && formik.errors.street ? 'error' : ''}`}
          />
          {formik.touched.street && formik.errors.street ? (
            <div className="text-red-700">{formik.errors.street}</div>
          ) : null}
        </div>
        <div className="location-group">
          <div className={`form-group ${formik.touched.zip && formik.errors.zip ? 'error' : ''}`}>
            <label>ZIP Code</label>
            <input
              type="text"
              name="zip"
              value={formik.values.zip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="00100"
              className={`zip-input ${formik.touched.zip && formik.errors.zip ? 'error' : ''}`}
            />
            {formik.touched.zip && formik.errors.zip ? (
              <div className="text-red-700">{formik.errors.zip}</div>
            ) : null}
          </div>
          <div className={`form-group ${formik.touched.city && formik.errors.city ? 'error' : ''}`}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled
              className={`city-input ${formik.touched.city && formik.errors.city ? 'error' : ''}`}
              placeholder="New York"
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-700">{formik.errors.city}</div>
            ) : null}
          </div>
          <div className={`form-group ${formik.touched.state && formik.errors.state ? 'error' : ''}`}>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled
              className={`state-input ${formik.touched.state && formik.errors.state ? 'error' : ''}`}
              placeholder="NY"
            />
            {formik.touched.state && formik.errors.state ? (
              <div className="text-red-700">{formik.errors.state}</div>
            ) : null}
          </div>
        </div>
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
        <div className="flex justify-between">
          <button type="button" className="back-button" onClick={onPrevious}>
            Back
          </button>
          <button type="submit" className="continue-button">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryInformation;
