import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { setCart } from "../features/cart";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";
const Summaryproduct = ({book,quantity}) => {


    const naviagate = useNavigate();
    const dispatch = useDispatch();
    const [ourquantity, setQuantity] = useState(quantity);
    const [hovered, setHovered] = useState(false);
    const [total, setTotal] = useState(quantity * book.price);
  
    const itemRef = useRef(null);
    useEffect(() => {
      gsap.to(itemRef.current, {
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        stagger: 0.5,
      });
    });

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
            stars.push(<span key={i} className="text-star ">★</span>);
          } else {
            stars.push(<span key={i} className="text-gray-300 ">★</span>);
          }
        }
        return stars;
      };
  return (
    <>
    <div
    ref={itemRef}
    className=" opacity-0 sm:max-w-[800px] w-full flex border-[1px] rounded-lg shadow-lg border-gray-200 p-3 ">
    <div className="md:w-3/4 w-full flex gap-2 ">
      <div className="overflow-hidden p-2">
        <img
          src={hovered ? book.subImages[0].url : book.mainImage.url}
          alt={book.description}
          className="w-[150px]  max-h-[200px] rounded-lg cursor-pointer transition-all duration-500 ease-in-out delay-500 hover:scale-105"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            naviagate(`/book/${book.title}/${book._id}`);
          }}
          loading="lazy"
        />
      </div>
      <div className="p-2 overflow-hidden  flex flex-col justify-between ">
          <div className="flex flex-col gap-2">
              <h2 className="sm:text-base text-[#382C2C] font-bold ">{book.title}</h2>
              <h2 className="sm:text-base text-[#4F4C57] text-[12px] mb-2">
              {book.author}
              </h2>
              <div className="flex items-center">
                  {renderStars(book.rating.averageRating)}
                  <span className="ml-2 text-xs text-gray-600">({book.rating.totalReviews})</span>
              </div>
              <h3 className="sm:text-sm  text-base">
                Rs. {book.price}×{ourquantity}
            </h3>
          </div>
        
          
    
      </div>
    </div>
    <div className="md:w-1/4 md:flex hidden  justify-evenly items-center">
      <p className="sm:text-sm font-semibold  text-[12px]">Rs. {total.toFixed(2)}</p>
    </div>
    <Toaster position="top-center" />
  </div>
</>
  )
}

export default Summaryproduct
