import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './pages/Footer';
import ScrollToTop from './pages/ScrollToTop';
import Spinner from './components/spinner/Spinner'; 

// Lazy loading components
const Signin = lazy(() => import('./components/auth/Signin'));
const Signup = lazy(() => import('./components/auth/Signup'));
const HomePage = lazy(() => import('./pages/HomePage'));
const Product = lazy(() => import('./components/product/product'));
const Shop = lazy(() => import('./pages/Shop'));
const Cart = lazy(() => import('./components/cart/Cart'));
const Checkout = lazy(() => import('./components/checkout/Checkout'));
const OrderConfirmation = lazy(() => import('./components/order/OrderConfirmation'));
const About = lazy(() => import('./components/about/About'));
const PaymentInformation = lazy(() => import('./components/paymentinfo/PaymentInfo'));
const Confirmation = lazy(() => import('./components/confirmation/Confirmation'));
const Privacy = lazy(() => import('./components/Legal/Privacy'));
const Terms = lazy(() => import('./components/Legal/Terms'));
const Callback = lazy(() => import('./components/Callback/Callback'));
const Profile = lazy(() => import('./components/profile/Profile'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const SearchResults = lazy(() => import('./components/search/SearchResults'));
const NotFound = lazy(() => import('./pages/404/NotFound'));


function App() {
  return (
    <div className="bg-peach app-container">  
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="/return" element={<Confirmation/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/orderid/:orderId" element={<OrderConfirmation />} />
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
