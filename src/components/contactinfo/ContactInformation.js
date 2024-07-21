import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactInformation = ({ onNext, initialData }) => {
  const formik = useFormik({
    initialValues: initialData || {
      firstName: '',
      lastName: '',
      email: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required')
    }),
    onSubmit: (values) => {
      onNext({ contactInfo: values });
    },
  });

  return (
    <div className="contact-info">
      {/* <h3>Contact Information</h3> */}
      <form className="contact-form" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="jane doe"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div  className='text-red-600'>*{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="jane doe"
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div  className='text-red-600'>*{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label>Email Address</label>
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
        <button type="submit" className="continue-button">Continue Delivery</button>
      </form>
    </div>
  );
};

export default ContactInformation;
