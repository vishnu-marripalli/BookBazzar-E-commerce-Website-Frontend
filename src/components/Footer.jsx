import React ,{useState} from 'react'
import { FaInstagram, FaSquareGithub, FaLinkedin } from "react-icons/fa6";
import { MdOutlineSendToMobile } from "react-icons/md";
import { Link } from 'react-router-dom';
import { Toaster,toast } from 'sonner';
import { TailSpin } from 'react-loader-spinner';
import ApiCall from '../lib/ApiCall';




export default function Footer() {

  const [email,setEmail] = useState('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isLoading, setIsLoading] = useState(false)

  const subscribeHandler = () => {
    if (!email || email.trim().length === 0) {
      toast.error("Email is required");
      return;
    }
    if (!email.match(emailRegex)) {
      toast.error("Invalid Email");
      return;
    // } else {
    //   setIsLoading(true);
    //   ApiCall({
    //     url: "/api/v1/subscribe/",
    //     method: "POST",
    //     data: {
    //       email: email,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data) {
    //         const message = response.data.message;
    //         setIsLoading(false);
    //         toast.success(message);
    //         return;
    //       }
    //       if (response.error) {
    //         setIsLoading(false);
    //         const errorMessage = response.error.data.message;
    //         toast.error(errorMessage);
    //         return;
    //       }
    //     })
    //     .catch(() => {
    //       setIsLoading(false);
    //       toast.error("Try again something went wrong");
    //       return;
    //     });
    }
  };


  return (
    <>
    <div className="w-full bg-primary flex items-center justify-center text-white py-10 px-5">
      <div className='sm:max-w-[75%] w-full'>
        <div className="w-full flex md:flex-row flex-col sm:py-10 py-3">
          <div className="md:w-[45%] md:p-2 flex flex-col ">
            <h1 className='font-medium text-base'>NEWSLETTER</h1>
            <p className="font-normal my-2 text-base">Subscribe and Get Your Rs.500 FLAT OFF Coupon Today!</p>
            <div className="flex flex-row h-auto w-full my-4 max-w-[400px] ">
              <input type="text"
              className='w-full sm:p-[9px] p-2 text-black text-sm focus:outline-none'
              placeholder='Enter your email'
              onChange={(e)=>(setEmail(e.target.value))} />
              <button className='font-bold border-2 p-1 text-[12px] min-w-20 flex items-center justify-center sm:text-sm sm:p-[9px] border-white'
              onClick={subscribeHandler}>
              
                {isLoading ?
                (<TailSpin
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass="" />):
                'Subscribe'}
              </button>
            </div>
            <div className='flex  gap-2 '>
              <a href="https://www.instagram.com/vish_nu0022"
              className=""
              target="_blank"
              rel="noopener noreferrer">
              
              <FaInstagram size={30}/></a>
              <a href="https://www.linkedin.com/in/vishnuvardhan-marripalli/"
              className=""
              target="_blank"
              rel="noopener noreferrer">
              
              <FaLinkedin size={30}/></a>
              <a href="https://github.com/vishnu-marripalli"
              className=""
              target="_blank"
              rel="noopener noreferrer">
              
              <FaSquareGithub size={30}  /></a>
          </div>
          </div>
          <div className="md:w-[55%] w-full md:px-16 flex sm:flex-row flex-col sm:gap-16 px-2 py-5  gap-5">
            <ul className="sm:text-base text-sm text-white ">
              <li className="mb-2 font-bold">Customer Care</li>
              <li>
                <Link to='#'>Orders</Link>
              </li>
              <li>
                <Link to='#'>My account</Link>
              </li>
              <li>
                <Link to='#'>Order Tracking</Link>
              </li>
              <li>
                <Link to='#'>FAQ</Link>
              </li>
              <li>
                <Link to='#'>Contact Us</Link>
              </li>
            
            </ul>
            <ul className="sm:text-base text-sm text-white ">
              <li className="mb-2 font-bold">Service</li>
              <li>
                <Link to='#'>About Us</Link>
              </li>
              <li>
                <Link to='#'>Office</Link>
              </li>
              <li>
                <Link to='#'>Carrers</Link>
              </li>

            </ul>
          </div>
        </div>
        <div className=''>
          <h3 className=" w-full h-auto flex  items-center justify-center gap-1  sm:text-sm text-[10px] pb-1">
            <MdOutlineSendToMobile /> <span>Call Us: +91 8309459006</span>
          </h3>
          <h2 className="sm:text-sm text-[9px] text-center ">
            Copyright © 2024 by Group Book Bazzer. All rights reserved Privacy
            Policy Legal Use  Do not sell my personal information
          </h2>
        </div>
      </div>
      <Toaster position='top-center' />
   </div>
    </>
  )
}

