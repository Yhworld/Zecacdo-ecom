import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/ProductSlice';
import ShopBg from '../components/shopBg/ShopBg';
import ShopFilter from '../components/shopFilter/ShopFilter';
import ContentLoader from 'react-content-loader'; // Import react-content-loader
import Breadcrumb from '../components/breadcrumbs/Breadcrumb';

function Shop() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.products.loading);
  const products = useSelector(state => state.products.products);

  const pathMapping = {
    '/shop': 'Shop',
  };

  useEffect(() => {
    if (!loading && products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [loading, products.length, dispatch]);

  if (loading) {
    return (
      <div className="mb-24">
            <div className="animate-pulse rounded-lg p-4">
            <div className="w-full h-80 bg-gray-200 mb-4"></div>
            </div>


        <div className='flex flex-col md:justify-between md:flex-row'>
        <div className="animate-pulse rounded-lg p-4">
              <ContentLoader 
                speed={9}
                width={300}
                height={380}
                viewBox="0 0 300 380"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="5" ry="5" width="300" height="300" />
                <rect x="0" y="320" rx="5" ry="5" width="300" height="20" />
                <rect x="0" y="350" rx="5" ry="5" width="300" height="20" />
              </ContentLoader>
            </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 place-items-center">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg p-4">
              <ContentLoader 
                speed={9}
                width={300}
                height={380}
                viewBox="0 0 300 380"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <rect x="0" y="0" rx="5" ry="5" width="300" height="300" />
                <rect x="0" y="320" rx="5" ry="5" width="300" height="20" />
              </ContentLoader>
            </div>
          ))}
        </div></div> 
      </div>
    );
  }

  return (
    <>
      <ShopBg />
      <Breadcrumb pathMapping={pathMapping} />
      <ShopFilter />
    </>
  );
}

export default Shop;
