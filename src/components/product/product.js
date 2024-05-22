import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../productDisplay/ProductDisplay'; // Ensure correct import path

const ProductDetail = () => {
  const { id } = useParams(); // Get the product id from URL params
  const product = useSelector(state => state.products.products.find(p => p.id === id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDisplay product={product} />
    </div>
  );
};

export default ProductDetail;
