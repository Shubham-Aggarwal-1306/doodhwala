import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import ProductCatalogue from './components/Product/ProductCatalogue';
import Product from './components/Product/Product';
import Process from './components/Process/Process';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import Signup from "./components/Signup/Signup";
import Layout from './components/Layout/Layout';
import Location from './components/Signup/Location';
import Auth from './components/Auth/Auth';
import Forgot from './components/Forgot/Forgot';
import PhoneAuth from './components/OAuth/PhoneAuth';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import { useEffect } from 'react';
import Profile from './components/Profile/Profile';
import HowWeDo from './components/HowWeDo/HowWeDo';
import WhatWeDo from './components/WhatWeDo/WhatWeDo';
import Gallery from './components/Gallery/Gallery';
import PleaseLogin from './components/PleaseLogin/PleaseLogin';
import Contact from './components/Contact/Contact';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { loading, isAuthenticated } = useSelector(state => state.userReducer);
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<Home />} />
          <Route path="/howwedo" element={<HowWeDo />} />
          <Route path="/whatwedo" element={<WhatWeDo />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/product" element={<ProductCatalogue />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={loading ? (
            <div className="loading"><div className='loading__circle'></div></div>
          ) : isAuthenticated ? <Checkout /> : (<PleaseLogin />)} />
          <Route path="/profile" element={loading ? (
            <div className="loading"><div className='loading__circle'></div></div>
          ) : isAuthenticated ? (<Profile />) : (<PleaseLogin />)} />
        </Route>
        {!isAuthenticated &&
          <Route path="/" element={<Auth />} >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/location" element={<Location />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/phone" element={<PhoneAuth />} />
          </Route>
        }
        {/* 404 Not Found */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
