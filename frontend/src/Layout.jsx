import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { useSelector } from 'react-redux'



export default function Layout() {

  const hamburger = useSelector((state)=>(state.features.hamburger))
  return (
    <>
    <Header />
    {hamburger ? '':<Outlet />}
    {hamburger ? '':<Footer />}
    </>
  )
}
