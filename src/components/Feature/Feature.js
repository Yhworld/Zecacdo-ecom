import React, { useState } from 'react';
import Item from '../item/Item.jsx'; 
import './feature.css'
import dataProduct from '../../assets/data.js';

function Feature() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  return (
    <div className='mx-auto container mt-20 mb-24'>
      <h1 className="md:text-3xl text-2xl text-center text-slate-700" id='featured-header'>FEATURED PRODUCTS</h1>
      {loading ? (
        // Render skeleton loader while products are being fetched
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg bg-gray-200 p-4">
              <div className="w-full h-48 bg-gray-300 mb-4"></div>
              <div className="h-6 bg-gray-300 mb-2"></div>
              <div className="h-6 bg-gray-300"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          {dataProduct.map(product => (
            <Item key={product.id} image={product.image} name={product.title} price={product.price} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Feature;
