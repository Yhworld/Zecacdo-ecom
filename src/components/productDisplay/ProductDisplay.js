import React from 'react'
import { PiHeartThin } from "react-icons/pi";
import './productdisplay.css'

export const ProductDisplay = (props) => {
    const { product } = props
  return (
    <>
    <div className='mx-auto container mt-12 flex md:flex-row flex-col justify-between'>
        <div className='flex flex-col items-center md:w-2/5'>
            <div id='main-img'>
                <img src={product.image} alt='mainimage'></img>
            </div>
            <div id='sub-images' className='flex w-20 md:w-28 items-center justify-center'>
                <img className='border border-black pt-4' src={product.image2} alt="" />
                <img src={product.image3} alt="" />
                <img src={product.image4} alt="" />
            </div>
        </div>
        <div id='product-listing' className='space-y-6 md:mr-4 md:w-1/2' >
            <div className='flex justify-between items-center space-x-20'>
                <h1 className='text-3xl font-medium' id='product-title'>{product.title}</h1>
                <PiHeartThin className='text-2xl' />
            </div>
            <h2 className='font-medium text-2xl'>$ {product.price}</h2>
            <p>Quantity</p>
            <div className='flex space-x-2'>
                <button className='border border-gray-300 px-2 py-2'>-</button>
                <p className='border border-gray-300 px-6 py-2'>1</p>
                <button className='border border-gray-300 px-2 py-2'>+</button>
            </div>
            <div className='flex space-x-6'>
            <button className='bg-brown text-white px-16 py-2'>Buy Now</button>
            <button className='text-black border border-black px-16 py-2'>Add to cart</button>
            </div>

            <div className='space-y-4'>
            <hr className='border border-gray-300 mt-4'/>
            <h1 className='font'>Description</h1>
            <div className=''>{product.description}</div>
            <hr className='border border-gray-300 mt-4'/>
            </div>
            <div className='space-y-4'>
            <hr className='border border-gray-300 mt-4'/>
            <h1>Scents Profile</h1>
            <div className=''>{product.description}</div>
            <hr className='border border-gray-300 mt-4'/>
            </div>
        </div>
    </div>
    {/* <div>
        <h1 className="md:text-3xl text-2xl text-center text-slate-700" id='featured-header'>FEATURED PRODUCTS</h1>
    </div> */}
    </>
  )
}
