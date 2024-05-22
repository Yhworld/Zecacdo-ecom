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

function App() {
  return (
    <>  
     <Navbar />
     <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/product/:id" element={<Product />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
