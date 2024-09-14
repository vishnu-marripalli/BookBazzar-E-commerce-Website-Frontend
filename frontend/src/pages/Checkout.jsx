import React,{ useState,useRef,useEffect } from 'react'
import Pagebanner from '../components/Pagebanner'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";
import { toast } from "sonner";
import { setCart } from '../features/cart';
import Cartproduct from '../components/Cartproduct'
import Summaryproduct from '../components/Summaryproduct';
import Input from '../components/ui/Input';
import { useForm, SubmitHandler } from "react-hook-form"
const Checkout = () => {

    const navigate =useNavigate();
    const dispatch = useDispatch();

    const books = useSelector((state)=> state.cart.cart )
    const cartTotalprice =useSelector((state)=> state.cart.totalPrice)
    const  discountedTotal=useSelector((state)=> state.cart.discountedTotalPrice)
    const cartRef = useRef(null);
    const cartCount = useSelector((state) => state.cart.cart.length);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm(
        {defaultValues: {
            firstName:''
        }}
      )
    

    useEffect(() => {
        window.scroll(0, 0);
        gsap.to(cartRef.current, {
          opacity: 1,
          duration: 2,
          delay: 1,
          ease: "power3.out",
        });
      }, [cartCount]);
      const submit=(data)=>{
        console.log(data)
      }


  return (
    <>
    <Pagebanner title={"Checkout"} />
    {cartCount>0 ?
    (books &&
        <div className="w-full flex flex-col-reverse md:flex-row h-full py-2 px-2">
            <div className="md:w-3/5 md:pl-24 px-2 w-full ">
                <div className="w-full text-[#7B7881] text-base md:flex hidden flex-row">
                    <div className="w-1/2 flex justify-center">
                    <h1 className=''>Book</h1>
                    </div>
                    <div className="w-1/2 pr-8 flex flex-row justify-evenly">
                    <h1 className=''>Price</h1>
                    <h1 className=''>Quantity</h1>
                    <h1 className=''>Total</h1>
                    </div>
                </div>
                <div className="">
                    <form onSubmit={handleSubmit(submit)}>
                    <Input 
                    label="First Name"
                    type='text'
                     {...register("firstName")} />
                     <input type="submit" />
                    </form>
                </div>
            </div>
            <div className="md:w-2/5 flex flex-col items-center md:gap-4 h-full w-full py-2 md:py-10">
                <div className="shadow-lg border flex flex-col gap-4 justify-between border-gray-200 w-full md:w-[80%] p-4 h-[70%]">
                <h2 className="sm:text-2xl text-[#382C2C] font-bold text-xl">Order Summary</h2>
                <div className="w-full ">
                    {books.map((book)=>{
                        return (
                            <div key={book._id} className="w-full md:flex flex-col items-center sm:my-4 my-2">
                                <Summaryproduct
                                book={book}
                                quantity={2}
                                />
                            </div>
                            );
                    })}
                </div>
                <div className="flex flex-col md:gap-2">
                    <div className=" flex flex-row justify-between">
                        <h2 className='md:text-sm text-[#5F6C72]'>Sub total</h2>
                        <h2 className="md:text-sm font-bold text-[#191C1F]">{cartTotalprice}</h2>
                    </div>
                    <div className=" flex flex-row justify-between">
                        <h2 className='md:text-sm text-[#5F6C72]'>Shipping </h2>
                        <h2 className="md:text-sm font-bold text-[#191C1F]">Free</h2>
                    </div>
                    <div className=" flex flex-row justify-between">
                        <h2 className='md:text-sm text-[#5F6C72]'>Discount </h2>
                        <h2 className="md:text-sm font-bold text-[#191C1F]">0</h2>
                    </div>
                </div>
                <div className="border-[1px] "></div>
                <div className="flex flex-row justify-between">
                    <h2 className='md:text-base text-[#191C1F] '>Total </h2>
                    <h2 className="md:text-base font-bold text-[#191C1F]">{discountedTotal}</h2>
                </div>
                {/* <button className='hover:bg-white hover:text-primary   duration-200 ease-in border-2 border-primary bg-primary w-[100%] px-6 py-2 text-base sm:text-xl font-semibold text-white rounded-sm'
                    onClick={()=>{
                        navigate('/checkout')
                    }}
                    >Proceed to Checkout</button> */}
                </div>
                
            </div>
        </div> 
    ):
    ((
        <div ref={cartRef} className=" opacity-0 w-full h-[60vh] flex items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <h3 className="md:text-4xl text-xl main-heading-font">
              Cart is Empty
            </h3>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="py-2 px-3 border-[2px] border-primary text-sm rounded-sm hover:bg-primary hover:text-white duration-200 ease-in focus:outline-none">
              Continue Shopping
            </button>
          </div>
        </div>
      )) 
   }
    </>
  )
}

export default Checkout
