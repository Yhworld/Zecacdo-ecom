import React from 'react'
import { Link } from "react-router-dom";
import './cta.css'

function Cta() {
  return (
    // <div id='cta-hero' className='flex flex-col items-center justify-center mt-32 '>
    //   <div className='lg:w-3/4 flex flex-col items-center'>
    //     <p className='mb-4 text-3xl tracking-tight font-semibold text-center text-white'>Explore Zecado's unique fragrances & discover the power of scent. Your journey to self-discovery starts here.</p>
    //     <Link to="/contact" class="mt-8 text-black bg-white hover:bg-brown hover:border-white hover:text-white focus:ring-4 focus:ring-primary-300 font-medium text-sm px-20 py-3.5 mr-2 mb-2  focus:outline-none ">Shop</Link>
    //   </div>
    // </div>
    <section id='cta-hero' className=" flex flex-col items-center justify-center rounded-lg relative mx-auto mt-32 p-32">
    <div className="md:w-3/4 flex flex-col items-center ">
      <h2 className="hidden md:block mb-4 md:text-4xl tracking-tight font-semibold text-center text-white">
      Explore Zecado's unique fragrances & discover the power of scent. Your journey to self-discovery starts here.
      </h2>
      <h2 className="md:hidden mb-4 tracking-tight font-semibold text-center text-white">
      Explore Zecado's unique fragrances. Your journey to self-discovery starts here.
      </h2>
      <Link to="/shop" class="mt-8 rounded-2xl text-black bg-white hover:bg-brown hover:border-white hover:text-white focus:ring-4 focus:ring-primary-300 font-medium text-sm px-12 py-3.5 mr-2 mb-2  focus:outline-none ">Shop</Link>
      </div>
    </section>
  )
}

export default Cta