import React from 'react';

const Item = ({ image, name, price }) => {
  return (
    <div className='flex flex-col items-center pt-12'>
        <img src={image} alt='' loading='lazy' className='' />
        <p className='font-medium'>{name}</p>
        <div className='font-medium'>
           $ {price}
        </div>
    </div>
  );
};

export default React.memo(Item);
