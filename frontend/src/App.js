import { React } from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";




function App() {
  return (
   <BrowserRouter>
   <Routes >
     <Route  path='/' element={<Layout />} >
      <Route path=''element={<Home />} />
      <Route path="/login" element={<Login />} />
     </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
