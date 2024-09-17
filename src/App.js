import { React } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";




function App() {
  return (
   <BrowserRouter>
   <Routes >
     <Route  path='/' element={<Layout />} >
      <Route path=''element={<Home />} />
      <Route path="/shop" element={<Shop />}/>
      <Route path="/login" element={<Login />} />
      <Route key={"bookid"}
      path="/book/:booktitle/:bookid" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
     </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
