import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Item from '../item/Item';
import './shopfilter.css'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const ShopFilter = () => {
  const products = useSelector(state => state.products.products);

 
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedScents, setSelectedScents] = useState([]);
  const [visibility, setVisibility] = useState({
    categories: true,
    price: true
  });



 
  const filteredProducts = products.filter(product => {
    
    if (minPrice !== '' && maxPrice !== '') {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (product.price >= min && product.price <= max) {
        return true;
      }
      return false;
    }
   
    if (selectedScents.length > 0) {
      if (!selectedScents.includes(product.category)) {
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

  const categories = [...new Set(products.map(product => product.category))];

  const handleCheckboxChange = (category) => {
    setSelectedScents(prevState =>
      prevState.includes(category)
        ? prevState.filter(item => item !== category)
        : [...prevState, category]
    );
  };

  return (
    <div className=" p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="col-span-1 md:col-span-1 mb-4 border border-black p-6  lg:h-72 h-full md:h-auto w-full lg:w-64 md:w-auto md:mt-12">
      <div className='text-center text-2xl mb-6' id='filter-title'>Filter Products</div>
      <div className='space-y-4'>
      <div className='font-medium flex justify-between items-center'>
            By Categories  
            <button onClick={() => toggleVisibility('categories')} className="focus:outline-none cursor-pointer">
              {visibility.categories ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        <div className={`transition-all duration-300 overflow-hidden ${visibility.categories ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="flex flex-col space-y-2">
          {categories.map(category => (
            <label key={category} className="mr-4">
              <input
                type="checkbox"
                className="mr-2"
                value={category}
                checked={selectedScents.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              {category}
            </label>
          ))}
        </div></div>
      </div>
      <div className='space-y-4 mt-4'>
      <div className='font-medium flex items-center justify-between'>
            By Price 
            <button onClick={() => toggleVisibility('price')} className="focus:outline-none cursor-pointer">
              {visibility.price ? <FaChevronUp /> : <FaChevronDown />}
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
    <div className="col-span-1 md:col-span-3 container mx-auto">
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No products found.</div>
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
