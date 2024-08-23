import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../productDisplay/ProductDisplay'; // Ensure correct import path
import Breadcrumb from '../breadcrumbs/Breadcrumb';
import { fetchProductById } from '../../slices/ProductSlice'; // Ensure correct import path

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.selectedProduct);
  const loading = useSelector(state => state.products.loading);
  const error = useSelector(state => state.products.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const pathMapping = {
    '/shop': 'Shop',
    [`/product/${id}`]: product.name,
  };

  const extraBreadcrumbs = [
    { name: 'Shop', path: '/shop' },
    { name: product.name, path: `/product/${id}` }
  ];

  return (
    <div>
      <div className='pl-8'><Breadcrumb pathMapping={pathMapping} extraBreadcrumbs={extraBreadcrumbs} /></div>
      <ProductDisplay product={product} />
    </div>
  );
};

export default ProductDetail;
