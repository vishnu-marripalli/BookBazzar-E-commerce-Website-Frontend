import { Component, React } from "react";
import './App.css';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
// import Layout from "./Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Razorpay from "./pages/razorpay";
import BookCreationForm from "./pages/Sellyourbooks";
import VerifyEmailSuccess from "./pages/VerifyemailSuccess";
import VerifyEmail from "./pages/Verifyemail";
import { useSelector } from "react-redux";
import Redirect from "./pages/Redirect";
import State from "./components/State";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import ErrorMessage from "./pages/Errormessage";




function App() {
   const isAuthenticated = useSelector((state)=>state.user.isAuthenticated)

  const AuthRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to={'/login'} />;
  };
  return (
   <BrowserRouter>
   <Routes >
     <Route  path='/' element={<State />} >
      <Route path=''element={<Home />} />
      <Route path="/shop" element={<Shop />}/>
      <Route path="/login" element={<Login />} />
      <Route key={"bookid"}
      path="/book/:booktitle/:bookid" element={<Product />} />
     
      <Route path="/login" element={<Login />} />
      <Route path="/razor-pay" element={<Razorpay />} />
      
      <Route path="/email-verification" element={<VerifyEmail />} />
      <Route key={"token"} path="/email-verification/:token" element={<VerifyEmailSuccess />} />
      <Route  path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="user/:accessToken/:refreshToken" element={<Redirect />} />
      <Route path="ContactUs" element={<ContactUs />} />



      <Route path="/cart" element={<AuthRoute element={<Cart />}/>} />

      <Route path="/user" element={<AuthRoute element={<Profile />}/>} />

      <Route path="/checkout" element={<AuthRoute element={<Checkout />}/>} />
      <Route path="/wishlist" element={<AuthRoute element={<Wishlist />}/>} />
      <Route path="/sellyourbooks" element={<AuthRoute element={<BookCreationForm />}/>}/>



      <Route path="/error" element={<ErrorMessage />} />
      <Route path="*" element={<NotFound />} />

     </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
