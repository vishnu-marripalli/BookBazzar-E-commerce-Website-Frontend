import React, { useRef } from 'react'
import { useEffect } from 'react';
import SignOut from '../assests/SignOut.svg'
import User from '../assests/User.svg'
import { CiLogin } from "react-icons/ci";
import { useSelector,useDispatch } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import {gsap} from 'gsap'
import { toggleHamburger } from '../features/features';



export default function Drawer() {

    const draweref = useRef(null)
    const isAuthenticated = true


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const Hamburger= ()=>{

        dispatch(toggleHamburger())
    }

    useEffect(() => {
     function handleresize(){
        if(window.innerWidth > 768){
            Hamburger();
        }
     }
     handleresize();

    window.addEventListener('resize',handleresize)
      return () => {
        window.removeEventListener('resize',handleresize)
      }
    }, [])
    

    useEffect(() => {
      gsap.to(draweref.current,
        {
            duration:1,
            x:0,
            ease:"sine.in",
        }
      )
      return () => { 
      }
    }, [])


    
    


  return (
    <>
    <div ref={draweref} className='w-[100vw] h-[90vh] top-0 left-0 translate-x-[-100vh]'>
        <div className='w-full bg-white h-full flex flex-col justify-between'>
            <ul>
                <li>
                    <div className=" border-b-2 border-voilet-100 px-5 py-3 font-medium text-[15px]" >
                    <Link
                    to='/'
                    onClick={Hamburger}>
                    Home
                    </Link>
                    </div>
                </li>
                <li>
                    <div className=" border-b-2 border-voilet-100 px-5 py-3 font-medium text-[15px]" >
                    <Link
                    to='/shop'
                    onClick={Hamburger}>
                    Shop
                    </Link>
                    </div>
                </li>
                <li>
                    <div className=" border-b-2 border-voilet-100 px-5 py-3 font-medium text-[15px]" >
                    <Link
                    to='/'
                    onClick={()=>{
                        Hamburger();
                        if(!isAuthenticated){
                            toast('Please Login to Sell Your Books ')
                            // navigate('/login')

                          }
                    }}>
                    Sell your books
                    </Link>
                    </div>
                </li>
                <li>
                    <div className=" border-b-2 border-voilet-100 px-5 py-3 font-medium text-[15px]" >
                    <Link
                    to='/contactus'
                    onClick={Hamburger}>
                    Contact Us
                    </Link>
                    </div>
                </li>
            </ul>
            <div className='w-full'>
                {isAuthenticated ? (<div className=" border-t-2 border-voilet-100 px-5 py-3 font-medium text-[15px]" >
                <Link
                to='/user'
                className='flex  items-center gap-4'
                onClick={()=>{
                    Hamburger();
                    if(!isAuthenticated){
                        toast('Please Login to Sell Your Books ')
                        navigate('/login')
                    }
                }}>
                    <img src={User}
                        className=' '
                        alt="user"
                        loading='lazy'
                     /> <span className='font-medium text-base'>Account</span>
                </Link>
                </div>)
                 :(<div className=" border-t-2 border-voilet-100 px-5 py-3 font-medium text-[15px]" >
                <Link
                to='/login'
                className='flex  items-center gap-4'
                onClick={()=>{
                    Hamburger();
                }}>
                    <CiLogin size={25

                    } color='#937DC2'/> 
                    <span className='font-medium text-base'>Login</span>
                </Link>
                </div>)}
                {isAuthenticated  ?
                (  <div className=" border-t-2 border-voilet-100 px-5 py-3 font-medium text-[15px]" >
                    <Link
                    to='/logout'
                    className='flex  items-center gap-4'
                    onClick={()=>{
                        Hamburger();
                    }}>
                        <img src={SignOut}
                            className=' '
                            alt="user"
                            loading='lazy'
                         /> <span className='font-medium text-base'>Logout</span>
                    </Link>
                    </div>):''}
            </div>
        </div>
        <Toaster position='top-center' />
    </div>
    </>
  )
}
