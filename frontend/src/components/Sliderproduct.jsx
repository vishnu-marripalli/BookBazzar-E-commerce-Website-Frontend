import React,{useEffect,useRef,useState} from 'react'
import ProductCard from './Productcard'
import gsap from 'gsap';
import { useSelector } from 'react-redux';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Skeleton } from './ui/skeleton';
import Slider from 'react-slick';
gsap.registerPlugin(ScrollTrigger);




const Sliderproduct =({title})=> {

const books = useSelector((state)=>(state.features.books))



      const [isLoading, setIsLoading] = useState(false);

      const productSliderRef = useRef(null);
      useEffect(() => {
        const productSliderElement = productSliderRef.current; // Access the current DOM element
    
        if (!productSliderElement) return;
        gsap.to(
          productSliderElement,
    
          {
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: productSliderElement,
              start: "top 80%", // Start animation when the top of the element is 80% in view
            },
          }
        );
      }, []);

      const settings = {
        
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable:true,
        autoplay: true,
       
        autoplaySpeed: 3000,
        
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              centerMode: true,  
              centerPadding: "50px",
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
        prevArrow: <></>, // Hide the default previous arrow button
        nextArrow: <></>,
      //   customPaging: function (i) {
      //     return (
      //       <div
      //         style={{
      //           width: "50%", // Adjust the width of each slide to half the container width
      //           textAlign: "center",
      //         }}>
      //         {i + 1}
      //       </div>
      //     );
      //   },
      };
    
      
  return (
    <>
   <div
      ref={productSliderRef}
      className="w-full   sm:px-16 md:pl-[8rem] my-10 px-1 opacity-0 overflow-hidden ">
      <div className="sm:mb-10 my-3 ">
        <h3 className=" sm:text-4xl text-2xl font-semibold main-heading-font px-4">
          {title}
        </h3>
      </div>
      <div className="slider-container relative">
        {isLoading ? (
          <div className="flex gap-6">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] sm:w-[250px] w-[200px]  rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
              </div>
            </div>
            <div className="flex hidden md:block flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex hidden sm:block flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex hidden sm:block flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] sm:w-[250px] w-[200px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
                <Skeleton className="h-4 sm:w-[250px] w-[200px] w-1/2" />
              </div>
            </div>
          </div>
        ) : (
          <div className=''>
            {books.length > 4 ? (
              <Slider {...settings} className=''>
                {/* Render the Product component within Slider */}
                {books.map((book) => (
                  <div key={books._id}>
                    <ProductCard book={book} />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="grid md:grid-cols-4 grid-cols-2">
                {books.map((book) => (
                  <div key={books._id}>
                    <ProductCard book={book} />
                  </div>
                ))}
                  </div>
            )}
            
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Sliderproduct;