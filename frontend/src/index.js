import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter , Routes,Route} from 'react-router-dom';
import Signup from './landing_page/signup/Signup';
import AboutPage from './landing_page/about/Aboutpage';
import ProductsPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import HomePage from './landing_page/home/Homepage';
import Footer from './landing_page/Footer';
import Navbar from './landing_page/Navbar';
import Notfound from './landing_page/NotFound';
import Login from './landing_page/signup/Login';
const rootElement = document.getElementById('root');

// Create a root and render the application component
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/about' element={<AboutPage/>}/>
    <Route path='/product' element={<ProductsPage/>}/>
    <Route path='/pricing' element={<PricingPage/>}/>
    <Route path='/support' element={<SupportPage/>}/>
    <Route path='*' element={<Notfound/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
);
