// src/components/NotFound.js
import React from 'react';
import './notfound.css'
const broken = require('../../assets/Leonardo_Phoenix_A_whimsical_handdrawn_cartoon_image_of_a_deli_1-removebg-preview.png')


function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div className='flex justify-center'>
    <img className='perfume-broken' src={broken} loading='lazy' alt='broken-perfume' /></div>
     <div className='pt-4 space-y-2'>
      <h1 className='font-bold text-2xl'>404</h1>
      <p className='text-2xl'>Page Not Found</p></div>
    </div>
  );
}

export default NotFound;
