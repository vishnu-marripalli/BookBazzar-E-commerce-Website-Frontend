import React,{ useState,useRef,useEffect } from 'react'
import Pagebanner from '../components/Pagebanner'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { gsap } from "gsap";
import { toast } from "sonner";
import { setCart } from '../features/cart';
import axios from 'axios';
import Summaryproduct from '../components/Summaryproduct';
import Input from '../components/ui/Input';
import { useForm, SubmitHandler } from "react-hook-form"
import ApiCall from '../lib/ApiCall';
const Checkout = () => {

    const navigate =useNavigate();
    const dispatch = useDispatch();
    const user =useSelector((state)=> state.user.user )
    const books = useSelector((state)=> state.cart.cart )
    const cart = useSelector((state)=> state.cart.cart )
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
        // {defaultValues: {
        //     firstName:''
        // }}
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

      const verifyPayment = async (paymentData) => {
        try {
          const response = await ApiCall(
          {  url:`https://bookbazzar-backend.onrender.com/api/v1/order/verify-payment`,
            method:"POST",
            data:paymentData,
        }  );
          if (response.data.success) {
            toast.success("Payment successful! Your order is placed");
            return true;
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          toast.error(
            error.response?.data?.message || "Payment verification failed. Please contact support.",
            'error'
          );
          return false;
        }
      };
    

const handlePayment = async () => {
const paymentData = await ApiCall({
  url:"https://bookbazzar-backend.onrender.com/api/v1/order/create-order",
  // url:"http://localhost:8000/api/v1/order/create-order",
  method:"POST",
  data:{
  cart:cart,
  discountedTotalPrice:discountedTotal,
  totalPrice:cartTotalprice
}});
const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
  );
const { order_id, amount, currency } = paymentData.data.data
      
const options = {
    key: "rzp_test_smsKR1iWFpPJQw", // Enter the Key ID generated from the Dashboard
    amount: amount,
    currency: currency,
    name: "BookBazzer",
    description: `Subscription for basic`,
    order_id: order_id, // Razorpay order ID
      handler: async function (response) {
        const verificationSuccess = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (verificationSuccess) {
         try {
          ApiCall({
            url:'https://bookbazzar-backend.onrender.com/api/v1/cart/clear',
            method:"DELETE",
          }).then((response) => {
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
              toast.error(response.error.data.message);
            }
          })
         } catch (error) {
          console.log(error)
         }
        }
      },
    prefill: {
        name: user.fullName || '',
        email: user.email || '',
    },
    theme: {
        color: "#937DC2"
    }
};

const rzp = new window.Razorpay(options);
rzp.open();
};
    


  return (
    <>
    <Pagebanner title={"Checkout"} />
    {cartCount>0 ?
    (books &&
        <div ref={cartRef} className="w-full flex flex-col-reverse md:flex-row h-full py-2 px-2">
            <div className="md:w-3/5 md:py-10 md:px-5 px-2 w-full ">
                <div className="shadow-lg border p-5 border-gray-200 ">
                    <h1 className="text-[#191C1F] font-bold text-3xl">Shipping Address</h1>
                    <form onSubmit={handleSubmit(handlePayment)}>
                      <div className=" flex md:flex-row gap-3">  
                          <Input 
                          label="First Name"
                          type='text'
                          {...register("firstName",{required:"Name is Required"})} />
                          <Input 
                          label="Second Name"
                          type='text'
                          {...register("secondName",{required:"Name is Required"})}
                          />
                          {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                      </div>
                      <Input 
                          label="Address Line 1"
                          type='text'
                          {...register("addressline1",{required:"Address is Required"})}
                          />
                          {errors.addressline1 && <p className="text-red-500">{errors.addressline1.message}</p>}
                      <Input 
                          label="Address Line 2"
                          type='text'
                          {...register("addressline2")}
                          />
                      <Input 
                          label="Mobile Number"
                          type='number'

                          {...register("mobileNumber", {
                            required: "Mobile number is required",
                            pattern: {
                              value: /^[0-9]{10}$/,
                              message: "Mobile number must be 10 digits",
                            }})}
                          />
                          {errors.mobileNumber && <p className="text-red-500">{errors.mobileNumber.message}</p>}
                      <div className=" flex md:flex-row gap-3">  
                          <Input 
                          label="City"
                          type='text'
                          {...register("city",{required:"City is Required"})} />
                          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
                          <Input 
                          label="State"
                          type='text'
                          {...register("state",{required:"State is Required"})}
                          />
                          {errors.state && <p className="text-red-500">{errors.state.message}</p>}
                      </div>
                      <div className=" flex md:flex-row gap-3">  
                          <Input 
                          label="Pincode"
                          type='text'
                          {...register("pincode",{required:"Pincode is Required"})} />
                          {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}
                          <Input 
                          label="Country"
                          type='text'
                          {...register("country",{required:"Country is Required"})}
                          />{errors.country && <p className="text-red-500">{errors.country.message}</p>}
                      </div>
                      <button type='submit' className='hover:bg-white hover:text-primary  mt-3  duration-200 ease-in border-2 border-primary bg-primary w-[100%] px-6 py-2 text-base sm:text-xl font-semibold text-white rounded-sm'
                        onClick={()=>{
                        
                      }}
                      >Place Order</button>
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
                                book={book.book}
                                quantity={book.quantity}
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
                navigate('/shop');
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
