import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../slices/CategorySlice';
import Item from '../item/Item';
import './shopfilter.css';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const ShopFilter = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const productsStatus = useSelector(state => state.products.status);
  const categories = useSelector(state => state.categories.categories);
  const categoriesStatus = useSelector(state => state.categories.status);

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visibility, setVisibility] = useState({
    categories: true,
    price: true
  });

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  const filteredProducts = products.filter(product => {
    if (minPrice !== '' && maxPrice !== '') {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (product.price >= min && product.price <= max) {
        return true;
      }
      return false;
    }

    if (selectedCategories.length > 0) {
      if (!product.category || !selectedCategories.includes(product.category.name)) {
        return false;
      }
    }
    return true;
  });

  const toggleVisibility = (section) => {
    setVisibility(prevState => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const handleCheckboxChange = (category) => {
    setSelectedCategories(prevState =>
      prevState.includes(category)
        ? prevState.filter(item => item !== category)
        : [...prevState, category]
    );
  };

  return (
    <div className="max-w-screen-xl grid grid-cols-1 md:grid-cols-4 gap-4 container mx-auto">
      <div className="filter-container col-span-1 md:col-span-1 mb-4 border border-black p-6 h-auto md:h-80 w-full lg:w-72 md:w-auto md:mt-12">
        <div className='text-center text-2xl mb-6' id='filter-title'>Filters Products</div>
        <div className='space-y-4'>
          <div className='font-medium flex justify-between items-center'>
            By Categories  
            <button onClick={() => toggleVisibility('categories')} className="focus:outline-none cursor-pointer">
              {visibility.categories ? <FaChevronUp className='text-brown' /> : <FaChevronDown className='text-brown'/>}
            </button>
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${visibility.categories ? 'max-h-screen' : 'max-h-0'}`}>
            <div className="flex flex-col space-y-2">
              {categories.map(category => (
                <label key={category.id} className="mr-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCheckboxChange(category.name)}
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className='space-y-4 mt-4'>
          <div className='font-medium flex items-center justify-between'>
            By Price 
            <button onClick={() => toggleVisibility('price')} className="focus:outline-none cursor-pointer">
              {visibility.price ? <FaChevronUp className='text-brown' /> : <FaChevronDown className='text-brown' />}
            </button>
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${visibility.price ? 'max-h-screen' : 'max-h-0'}`}>
            <div className='flex items-center space-x-2'>
              <input
                type="number"
                className="border border-gray-700 rounded px-3 py-1 w-full lg:w-20 text-sm"
                placeholder="$ Min"
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
              />
              <div>to</div>
              <input
                type="number"
                className="border border-gray-700 rounded px-3 py-1 w-full lg:w-20 text-sm"
                placeholder="$ Max"
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Items Grid */}
      <div className="col-span-1 md:col-span-3">
        {productsStatus === 'loading' ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : productsStatus === 'failed' ? (
          <div className="text-center text-gray-500">Failed to load products.</div>
        ) : filteredProducts.length === 0 ? (
          <div className=" text-center text-gray-500">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {filteredProducts.map(product => (
              <Item key={product.id} id={product.id} image={product.imageUrl} name={product.name} price={product.price} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopFilter;
