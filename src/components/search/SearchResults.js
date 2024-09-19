import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../slices/ProductSlice'
import Item from '../item/Item';
import Spinner from '../spinner/Spinner';

const SearchResult = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const nameMatches = product.name.toLowerCase().includes(query.toLowerCase());
    const categoryMatches = product.category && product.category.name.toLowerCase().includes(query.toLowerCase());
    return nameMatches || categoryMatches;
  });

  if (loading) return <div><Spinner /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className='container mx-auto pl-10'>Search Results for "{query}"</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Item key={product.id} id={product.id} image={product.imageUrl} name={product.name} price={product.price} />
          ))}
        </div>
      ) : (
        <div className='flex justify-center mt-36'>No products found.</div>
      )}
    </div>
  );
};

export default SearchResult;
