import React ,{useRef, useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import book from '../assests/bookpng.png'
import Slider from 'react-slick'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toast } from 'sonner'
import {Toaster} from '../components/ui/Sonner'
import Sliderproduct from '../components/Sliderproduct'
import { IoIosStar } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa6";
import Truck from '../assests/Truck.svg'
import { useSelector } from 'react-redux'
gsap.registerPlugin(ScrollTrigger);

const Home =()=>{

  const [currentSlide, setCurrentSlide] = useState(0);
  const Homebanner =useRef(null)
  const navigate =useNavigate()
  const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)



  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.to(Homebanner.current,{
      opacity: 1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: Homebanner.current,
        start: "top 20%", // Start animation when the top of the element is 80% in view
      },
    })
  
    return () => {
   
    }
  }, [])
  



  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplayspeed:3000,
    nextArrow: <></>,
    prevArrow: <></>,
    
   
    customPaging: (i) => (
      <div className="progress-bar-wrapper">
        <div
          className={`progress-bar ${
            i === currentSlide ? "active" : ""
          }`}
        />
      </div>
    ),
  };

  return(
    <>
    <div className="w-full sm:h-[70vh] bg-white  py-2 sm:py-10 opacity-0 " ref={Homebanner}>
      <div className='h-full flex flex-col md:flex-row gap-4 sm:gap-0 justify-center'>
        <div className=" h-full flex flex-col sm:justify-evenly gap-6 py-2">
          <div className="sm:px-4 px-1 text-black sm:truncate sm:text-5xl text-4xl  flex flex-col gap-2 sm:gap-4" style={{overflow:"visible"}}>
            <h1 className=" font-bold">Discover.</h1>
            <h1 className=" font-bold">Buy.</h1>
            <h1 className="font-bold" >Sell Books in One Place !!</h1>
            <span className="text-sm">Join the community of book lovers.</span>
          </div>
          <div className="sm:px-4 px-1 flex sm:gap-16 gap-4">

            <button className='hover:bg-white hover:text-primary   duration-200 ease-in border-2 border-primary bg-primary w-[150px] px-6 py-2 text-sm text-white rounded-sm'
            onClick={()=>{
              navigate('/shop')
             }}>Shop Now</button>
            <button className='hover:bg-primary hover:text-white   duration-200 ease-in border-2 border-primary bg-white w-[150px] px-6 py-2 text-sm text-primary rounded-sm
            'onClick={()=>{
              if(!isAuthenticated){
                toast('Please login to Sell your Books');
                navigate('/login');
              }
              else{
                navigate('/sellyourbooks')
              }
              }}>Sell your Books</button>

          </div>
        </div>
        <div className="   flex flex-col sm:flex-row items-center sm:items-start ">
          <div className="  ">
            <h1 className="sm:w-28 h-auto" style={{color:'rgba(32, 31, 31, 0.8)'}}>30% DISCOUNT ON NEW ARRAVIALS</h1>
          </div>
          <div className="slider-container max-w-[300px]  ">
              {/* <Slider {...settings}>
                  <img src={book} alt="" />
                  <img src={book} alt="" />
              </Slider> */}
              <img src={book} alt="" />
          </div>
        </div>
      </div>
    </div>
    <div className="w-full h-full flex flex-col sm:flex-row sm:items-center items-start sm:gap-0 gap-4 sm:justify-around px-2 sm:px-20">
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="w-0 block sm:hidden h-16 border-[1px] border-primary"></div>
        <img src={Truck} alt="" className='w-7' />
        <h1 className="font-semibold text-2xl">Free Shipping Over Rs.500</h1>
      </div>
      <div className="w-0 sm:block hidden h-16 border-[1px] border-primary"></div>
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="w-0 block sm:hidden h-16 border-[1px] border-primary"></div>
        <IoIosStar size={40}/>
        <h1 className="font-semibold text-2xl">GET Rs.500 FLAT OFF Coupon Today!</h1>
      </div>
      <div className="w-0 h-16 sm:block hidden border-[1px] border-primary"></div>
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="w-0 block sm:hidden h-16 border-[1px] border-primary"></div>
        <FaBookOpen size={30}/>
        <h1 className="font-semibold text-2xl">Read a few pages </h1>
      </div>
    </div>
    <div>
      <Sliderproduct title={"Trending"} />
    </div>
    <div className=''>
      <Sliderproduct title={"Most Rated"} />
    </div>
    <Toaster position='top-center'  />
    </>
    )
}

export default Home;