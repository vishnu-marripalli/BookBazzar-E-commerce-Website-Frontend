import React, { useEffect, useRef } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Pagebanner(props) {

  const { title } = { ...props }

  let path = useLocation();
  function formatTitle() {
    return title
      .split("");
  }
  const pagebannerref = useRef(null)
  useEffect(() => {
    window.scroll(0, 0);
    gsap.to(pagebannerref.current, {
      opacity: 1,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: pagebannerref.current,
        start: "top 50%", // Start animation when the top of the element is 80% in view
      },
    });
  }, []);


  return (
    <>
      <div ref={pagebannerref} className="w-full h-full bg-[#FAFAFA] border-b-2 px-4 py-4 opacity-0 border-primary">
        <div className="flex flex-row justify-around py-2 text-[#252B42]">
          <h1 className="sm:text-3xl text-xl   font-bold">{title}</h1>
          <div className=" flex flex-row items-center">
            <Link to='/'><h1 className='sm:text-lg hidden sm:block font-semibold'>Home</h1></Link>
            <h1 className=' flex-row items-center hidden sm:flex  text-[#BDBDBD]'><IoIosArrowForward size={30} /> {formatTitle(path.pathname)}</h1>
          </div>
        </div>
      </div>
    </>
  )
}
