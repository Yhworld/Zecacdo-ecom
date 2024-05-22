import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../slices/ProductSlice.js'; // Adjust the import path as needed

import Item from '../item/Item.jsx'; 
import './feature.css';

function Feature() {
  const products = useSelector(state => state.products.products);
  const loading = useSelector(state => state.products.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch products when component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className='mx-auto container mt-20 mb-24'>
      <h1 className="md:text-3xl text-2xl text-center text-slate-700" id='featured-header'>FEATURED PRODUCTS</h1>
      {loading ? (
        // Render skeleton loader while products are being fetched
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg p-4">
              <div className="w-full h-80 bg-gray-200 mb-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          {products.map(product => (
            <Item
              key={product.id}
              id={product.id}
              image={product.imageUrl}  // Ensure imageUrl is passed correctly
              name={product.name}       // Ensure name is passed correctly
              price={product.price}     // Ensure price is passed correctly
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Feature;
