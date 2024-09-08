import './styles.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import Footer from './pages/Footer';
import Product from './components/product/product';
import Shop from './pages/Shop';
import Cart from './components/cart/Cart';
import Checkout from './components/checkout/Checkout';
import OrderConfirmation from './components/order/OrderConfirmation';
import About from './components/about/About';
import PaymentInformation from './components/paymentinfo/PaymentInfo';
import Confirmation from './components/confirmation/Confirmation';
import Privacy from './components/Legal/Privacy';
import Terms from './components/Legal/Terms';

function App() {
  return (
    <div className="app-container">  
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/return" element={<Confirmation/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/orderid/:orderId" element={<OrderConfirmation />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
