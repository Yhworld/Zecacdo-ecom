import React from 'react';
import { Link } from 'react-router-dom';
import './item.css';

const Item = ({ id, image, name, price }) => {
  return (
    <Link to={`/product/${id}`}>
      <div className='flex flex-col items-center pt-12'>
          <img src={image} alt='' loading='lazy' className='' />
          <p className='font-medium'>{name}</p>
          <div className='font-medium'>
             $ {price}
          </div>
      </div>
      </Link>
  );
};

export default React.memo(Item);
