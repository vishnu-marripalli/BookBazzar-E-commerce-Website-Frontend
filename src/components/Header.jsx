import React from 'react'
import { useState,useEffect } from 'react';
import { Link,NavLink,useNavigate } from 'react-router-dom';
import Cart from '../assests/Cart.svg';
import Wishlistlogo from '../assests/Whishlistlogo.svg';
import User from '../assests/User.svg'
import hamburgericon from '../assests/hamburger.svg'
import openhamburger from '../assests/openhamburger.svg'

import Logowithname from '../assests/Logowithname.svg'
import SearchBar from './ui/SearchBar';
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { ThemeProvider } from '@mui/material';
import {createTheme} from '@mui/material';
import {Toaster} from '../components/ui/Sonner'
import {toast} from 'sonner'

import {useSelector,useDispatch} from 'react-redux'
import { toggleHamburger } from '../features/features';
import Drawer from './Drawer';

import ApiCall from '../lib/ApiCall'
import { logout } from '../features/auth'
import { initCart } from '../features/cart';
import { initWishlist } from '../features/Wishlist';

function Header(){
  const [isFixed,setisFixed] =useState(false)

  const hamburger = useSelector((state)=> state.features.hamburger)
  const cartCount = useSelector((state) => state.cart.cart?.length);


  const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logouthandler=()=>{
    ApiCall({
      url: "https://bookbazzar-backend.onrender.com/api/v1/user/logout",
      method: "GET",
      
    })
      .then((response) => {
        if (response.data) {
          dispatch(logout());
          dispatch(initCart());
          dispatch(initWishlist());
         
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        } else {
          toast.error("Error while logging out");
        }
      })
      .catch(() => {
        toast.error("Error while logging out");
      });
  }


  const toggleHamburgerHander = ()=>{
      dispatch(toggleHamburger())
  }
  useEffect(() => {
    const handleScroll = () =>{

          const scrollThreshold = 100;
          if (window.scrollY >scrollThreshold ) {
            setisFixed(true)
          }else{
            setisFixed(false)
          }
    }
    window.addEventListener("scroll",handleScroll)
    return () => {
      window.removeEventListener("scroll",handleScroll)
    }

  }, [])
  




  const theme =createTheme({
      palette:{
        primary:{
          main: "#937DC2",
        },
      },
  })

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 0, // Note: right was -0, changed to 0
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  
    return(
        
      <>
       <ThemeProvider theme={theme}>

          <div className={`w-full h-auto
              ${isFixed ? "fixed top-0 z-40 transition-all duration-500":""}`}>
            <div className='w-full h-auto bg-white flex justify-between items-center md:px-16 border-b-2 border-primary py-2 px-4'>
                <div>
                  <Link to='/'>
                  <img src={Logowithname}
                  alt="BookBazzar" 
                  loading="lazy"
                  className='w-[100px] cursor-pointer'
                  />
                  </Link>
                </div>
                <div className='hidden md:block min-w-[250px]'>
                  <SearchBar />
                </div>
                <div className='hidden md:block'>
                    <ul className='flex justify-evenly'>
                      <li>
                        <NavLink 
                        to='/'
                        className={({ isActive }) =>
                          isActive
                            ? "text-sm px-3 text-[#937DC2]"
                            : "text-sm px-3 hover:text-[#937DC2]"
                        }
                        >
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink 
                        to='/shop'
                        className={({ isActive }) =>
                          isActive
                            ? "text-sm px-3 text-[#937DC2]"
                            : "text-sm px-3 hover:text-[#937DC2]"
                        }
                        >
                          Shop
                        </NavLink>
                      </li>
                      <li>
                        <NavLink 
                        to='/SellYourBooks'
                        className={({ isActive }) =>
                          isActive
                            ? "text-sm px-3 text-[#937DC2]"
                            : "text-sm px-3 hover:text-[#937DC2]"
                        }
                        onClick={()=>{
                          if(!isAuthenticated){
                            toast('Please Login to Sell Your Books ')
                            navigate('/login')

                          }}
                        }
                        >
                          Sell your Books
                        </NavLink>
                      </li><li>
                        <NavLink 
                        to='/ContactUs'
                        className={({ isActive }) =>
                          isActive
                            ? "text-sm px-3 text-[#937DC2]"
                            : "text-sm px-3 hover:text-[#937DC2]"
                        }
                        >
                          Contact Us
                        </NavLink>
                      </li>
                    </ul>
                </div>
                <div className='flex justify-evenly items-center gap-2'>
                    {!hamburger && (    <ul className="w-[125px] flex justify-evenly items-center">
                          <li>
                            <Link
                            to='/cart'
                            onClick={()=>{
                              if(!isAuthenticated){
                                navigate('/login');

                              }}}
                            ><IconButton aria-label="cart">
                            <StyledBadge badgeContent={cartCount} color="primary">
                            <img src={Cart}
                              className=' hover:scale-110'
                              alt="Cart"
                              loading='lazy' 
                              onClick={()=>{
                                if(!isAuthenticated){
                                  toast('Please login to Open Cart ')
                                  navigate('/login');
      
                                }}}
                              />
                            </StyledBadge>
                          </IconButton>
                              
                            </Link>
                          </li>
                          <div className='border-[1px] rounded h-[24px]  border-primary'></div>
                          <li>
                            <Link
                            to='/wishlist'
                            onClick={()=>{
                              if(!isAuthenticated){
                                toast('Please login to open Whishlist ')
                                navigate('/login');

                              }}
                            }>
                              <img src={Wishlistlogo}
                              className=' hover:scale-110'
                              alt="user"
                              loading='lazy' />
                            </Link>
                          </li>
                          <div className='border-[1px] rounded h-[24px]  border-primary'></div>
                          <li>
                            <Link
                            to='/user'
                            onClick={()=>{
                              if(!isAuthenticated){
                                toast('Please login to open profile ')

                                navigate('/login');

                              }}}>
                              <img src={User}
                              className=' hover:scale-110'
                              alt="user"
                              loading='lazy' />
                            </Link>
                          </li>
                        </ul>    )}
                
                  {!isAuthenticated ? 
                  (<button className='hidden md:block border-2 border-primary bg-primary px-6 py-1 text-sm text-white rounded-sm'
                    onClick={()=>{
                      navigate('/login')
                    }}>
                      Login</button>)
                  :(<button className='hidden md:block border-2 border-primary bg-primary px-6 py-1 text-sm text-white rounded-sm'
                  onClick={logouthandler}>
                    Logout</button>)}
                <div className='block md:hidden'>
                  {hamburger ? 
                  (<img src={openhamburger} alt="ham" onClick={toggleHamburgerHander} />)
                  :<img src={hamburgericon} alt="ham"   onClick={toggleHamburgerHander} />}
                </div>
                </div>
            </div>
            
            <Toaster position='top-center'  />
          {hamburger? <Drawer />: ''}
          </div>
       </ThemeProvider>
      </>

    );
}

export default Header;