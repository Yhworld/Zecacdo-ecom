import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function ContactPage() {
  const form = useRef();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_4mtguag", "template_rreuvet", form.current, {
        publicKey: "MRD9reDEIVCDMsfld",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setShowSuccessAlert(true); // Show the success alert
          form.current.reset();
          setTimeout(() => {
            setShowSuccessAlert(false); // Hide the success alert after some time
          }, 5000); // Adjust the time as needed
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <>
      <section className="bg-white" id="contact">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {showSuccessAlert && ( // Display the success alert when showSuccessAlert is true
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline"> Your message has been sent successfully.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowSuccessAlert(false)}>
                <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.354 5.646a.5.5 0 0 1 0 .708L10.707 10l3.647 3.646a.5.5 0 0 1-.708.708L10 10.707l-3.646 3.647a.5.5 0 0 1-.708-.708L9.293 10 5.646 6.354a.5.5 0 0 1 .708-.708L10 9.293l3.646-3.647a.5.5 0 0 1 .708 0z"/></svg>
              </span>
            </div>
          )}
          <div className="mb-4">
            <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
              {/* <p className="text-base font-semibold uppercase tracking-wide text-black dark:text-black">
                    Contact
                </p> */}
              <h2 className="font-heading mb-4 font-bold tracking-tight text-brown text-3xl sm:text-5xl">
                Talk to Us
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600">
                Talk to Our Team of Experts
              </p>
            </div>
          </div>
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-700">
                  Our contact page makes it easy for you to reach
                  out to us. Whether you have questions about our services, need
                  assistance with a project, or simply want to say hello, we're
                  here to help. 
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-brown text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 ">
                        Our Address
                      </h3>
                      <p className="text-gray-600">
                        1230 Maecenas Street Donec Road
                      </p>
                      <p className="text-gray-600">New York, EEUU</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-brown text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                      </svg>
                    </div>
                    <div className="ml-4 mb-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                        Contact
                      </h3>
                      <p className="text-gray-600">Mobile: +1 (207) 891-1759</p>
                      <p className="text-gray-600">Mail: info@zecadofragrance.com</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                <h2 className="mb-4 text-2xl font-bold">
                  Ready to Get Started?
                </h2>
                <form id="contactForm"
               
                ref={form} onSubmit={sendEmail}
                >
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          for="name"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="text"
                          id="name"
                          autocomplete="given-name"
                          placeholder="Your name"
                          className="mb-2 w-full rounded-md border border-gray-600 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                          name="user_name"
                        />
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          for="email"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <input
                          type="email"
                          id="email"
                          autocomplete="email"
                          placeholder="Your email address"
                          className="mb-2 w-full rounded-md border border-gray-600 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                          name="user_email"
                        />
                      </div>
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        for="textarea"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <textarea
                        id="textarea"
                        name="message" 
                        cols="30"
                        rows="5"
                        placeholder="Write your message..."
                        className="mb-2 w-full rounded-md border border-gray-600 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                      ></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      value="Send"
                      className="w-full bg-brown text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
