import React from 'react'
import { Link } from "react-router-dom";
import './cta.css'

function Cta() {
  return (
    <div id='cta-hero' className='flex flex-col items-center justify-center mt-32 '>
      <div className='lg:w-3/4 flex flex-col items-center'>
        <p className='mb-4 lg:text-4xl tracking-tight font-extrabold text-center text-white'>Unfold your confidence & create lasting memories. Explore Zecado's unique fragrances & discover the power of scent. Your journey to self-discovery starts here.</p>
        <Link to="/contact" class="mt-8 text-black bg-white hover:bg-brown hover:border-white hover:text-white focus:ring-4 focus:ring-primary-300 font-medium text-sm px-20 py-3.5 mr-2 mb-2  focus:outline-none ">Shop</Link>
      </div>
    </div>
  )
}

export default Cta