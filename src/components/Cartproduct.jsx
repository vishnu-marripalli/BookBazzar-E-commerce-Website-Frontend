import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { gsap } from "gsap";
import { useDispatch } from "react-redux";
import { setCart } from "../features/cart";
import { toast } from "sonner";
import { Toaster } from "../components/ui/Sonner";
import ApiCall from "../lib/ApiCall";

const Cartproduct = ({ book, quantity }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ourquantity, setQuantity] = useState(quantity);
  const [hovered, setHovered] = useState(false);
  const [total, setTotal] = useState(quantity * book.price);
  const [isLoading, setIsLoading] = useState(false);

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
        stars.push(
          <span key={i} className="text-star text-xl">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300 text-xl">
            ★
          </span>
        );
      }
    }
    return stars;
  };
  const itemRemoveHandler = async () => {
    await ApiCall({
      url: `https://bookbazzar-backend.onrender.com/api/v1/cart/item/${book._id}`,
      method: "DELETE",
    })
      .then((response) => {
        if (response.data) {
          dispatch(
            setCart({
              cart: [...response.data.data.items],
              totalPrice: response.data.data.cartTotal,
              discountedTotalPrice: response.data.data.discountedTotal,
            })
          );
          toast.error("Item removed successfully");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch(() => {
        dispatch(
          setCart({
            cart: [],
            totalPrice: 0,
            discountedTotalPrice: 0,
          })
        );
      });
  };

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    (async () => {
      setIsLoading(true);
      await ApiCall({
        url: `https://bookbazzar-backend.onrender.com/api/v1/cart/item/${book._id}`,
        method: "POST",
        data: {
          quantity: ourquantity,
        },
      })
        .then((response) => {
          setIsLoading(false);
          if (response.data) {
            dispatch(
              setCart({
                cart: [...response.data.data.items],
                totalPrice: response.data.data.cartTotal,
                discountedTotalPrice: response.data.data.discountedTotal,
              })
            );
          }
          if (response.error) {
            setIsLoading(false);
            toast.error(response.error.data.message);
          }
        })
        .catch(() => {
          setIsLoading(false);
          dispatch(
            setCart({
              cart: [],
              totalPrice: 0,
              discountedTotalPrice: 0,
            })
          );
        });
    })();
  }, [ourquantity]);

  return (
    <>
      <div
        ref={itemRef}
        className=" opacity-0 sm:max-w-[800px] w-full flex border-[1px] rounded-lg shadow-lg border-gray-200 p-3 "
      >
        <div className="md:w-1/2 w-full flex gap-2 ">
          <div className="overflow-hidden p-2">
            <img
              src={hovered ? book.subImages[0]?.url : book.mainImage?.url}
              alt={book.description}
              className="w-[150px]  max-h-[200px] rounded-lg cursor-pointer transition-all duration-500 ease-in-out delay-500 hover:scale-105"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => {
                navigate(`/book/${book.title}/${book._id}`);
              }}
              loading="lazy"
            />
          </div>
          <div className="p-2 overflow-hidden  flex flex-col justify-between ">
            <div className="flex flex-col gap-2">
              <h2 className="sm:text-2xl text-[#382C2C] font-bold text-xl">
                {book.title}
              </h2>
              <h2 className="sm:text-base text-[#4F4C57] text-[12px] mb-2">
                {book.author}
              </h2>
              <div className="flex items-center">
                {renderStars(book.rating?.averageRating)}
                <span className="ml-2 text-xs text-gray-600">
                  ({book.rating?.totalReviews} reviews)
                </span>
              </div>
            </div>
            <h3 className="sm:text-sm md:hidden block font-semibold text-base">
              Rs. {book.price}
            </h3>
            <div className="flex md:hidden flex-row text-[#231F2D] items-center  gap-2">
              <CiCircleMinus
                className="cursor-pointer text-[#231F2D]"
                size={30}
                onClick={() => {
                  if (ourquantity > 1) {
                    setQuantity((prev) => prev - 1);
                    setTotal((prev) => prev - book.price);
                  }
                }}
              />
              <span
                className=" sm:text-lg text-base"
                style={{ userSelect: "none" }}
              >
                {ourquantity}
              </span>
              <CiCirclePlus
                className="cursor-pointer text-[#231F2D]"
                size={30}
                onClick={() => {
                  if (ourquantity < book.stock) {
                    setQuantity((prev) => prev + 1);
                    setTotal((prev) => prev + book.price);
                  }
                }}
              />
            </div>
            <h3 className="sm:text-base text-sm underline mt-2">
              <p
                className="sm:text-base text-sm cursor-pointer"
                onClick={itemRemoveHandler}
              >
                Remove
              </p>
            </h3>
          </div>
        </div>
        <div className="md:w-1/2 md:flex hidden  justify-evenly items-center">
          <p className="sm:text-sm text-[12px]">Rs. {book.price}</p>
          <div className="flex flex-row text-[#231F2D] items-center  gap-2">
            <CiCircleMinus
              className="cursor-pointer text-[#231F2D]"
              size={30}
              onClick={() => {
                if (ourquantity > 1) {
                  setQuantity((prev) => prev - 1);
                  setTotal((prev) => prev - book.price);
                }
              }}
            />
            <span
              className=" sm:text-lg text-base"
              style={{ userSelect: "none" }}
            >
              {ourquantity}
            </span>
            <CiCirclePlus
              className="cursor-pointer text-[#231F2D]"
              size={30}
              onClick={() => {
                if (ourquantity < book.stock) {
                  setQuantity((prev) => prev + 1);
                  setTotal((prev) => prev + book.price);
                }
              }}
            />
          </div>
          <p className="sm:text-sm text-[12px]">Rs. {total.toFixed(2)}</p>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
};

export default Cartproduct;
