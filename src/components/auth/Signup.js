import React from 'react'

function Signup() {
  return (
    <div id='auth' className='flex mx-auto container justify-center items-center'>

      <form id="login-form"
      className=' '
               >
                <div className='text-center font-medium text-2xl pb-4'>Create Account</div>
                 <div className="mb-6">
                   <div className="mx-0 mb-1 sm:mb-4">
                     <div className="mx-0 mb-1 sm:mb-4">
                       <label
                         for="name"
                         className="pb-1 text-xs tracking-wider"
                       >First Name</label>
                       <input
                         type="text"
                         id="name"
                         autocomplete="name"
                         placeholder="e.g John"
                         className="mb-2 w-full rounded-sm border border-gray-600 py-2 pl-2 pr-16 sm:mb-0"
                         name="user_name"
                       />
                     </div>
                     <div className="mx-0 mb-1 sm:mb-4">
                       <label
                         for="name"
                         className="pb-1 text-xs tracking-wider"
                       >Last Name</label>
                       <input
                         type="text"
                         id="name"
                         autocomplete="given-name"
                         placeholder="Doe"
                         className="mb-2 w-full rounded-sm border border-gray-600 py-2 pl-2 pr-16 sm:mb-0"
                         name="user_name2"
                       />
                     </div>
                     <div className="mx-0 mb-1 sm:mb-4">
                       <label
                         for="name"
                         className="pb-1 text-xs tracking-wider"
                       >Email address</label>
                       <input
                         type="text"
                         id="name"
                         autocomplete="given-email"
                         placeholder="Johndoe@example.com"
                         className="mb-2 w-full rounded-sm border border-gray-600 py-2 pl-2 pr-16 sm:mb-0"
                         name="email"
                       />
                     </div>
                     <div className="mx-0 mb-1 sm:mb-4">
                       <label
                         for="password"
                         className="pb-1 text-xs tracking-wider"
                       >Password</label>
                       <input
                         type="password"
                         id="email"
                         placeholder="Your Password"
                         className="mb-2 w-full rounded-sm border border-gray-600 py-2 pl-2 pr-16 sm:mb-0"
                         name="password"
                       />
                     </div>
                   </div>
                 </div>
                 <div className="text-center">
                   <button
                     type="submit"
                     value="Send"
                     className="w-full bg-brown font-medium text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                   >
                     Create Account
                   </button>
                   <button
                     type="submit"
                     value="Send"
                     className="w-full font-medium border-gray-600 text-brown px-6 py-3 font-xl mt-4 rounded-md sm:mb-0"
                   >
                     Sign in
                   </button>
                   
                 </div>
               </form>
    </div>
  )
}

export default Signup