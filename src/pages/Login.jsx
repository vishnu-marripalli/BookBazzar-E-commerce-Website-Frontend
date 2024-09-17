import React,{useRef, useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Pagebanner from '../components/Pagebanner'
import Input from '../components/ui/Input'
import SSOButton from '../components/SSOButton'
import gsap from 'gsap'
import { ThreeDots } from "react-loader-spinner";
import { useForm, SubmitHandler } from "react-hook-form"

const Login = () => {
  const [page, setPage] = useState('Signin')
  const [isLoading, setIsLoading] = useState(false);

  const Sliderref =useRef()
  const signupref=useRef()
  const signinref=useRef()

  const moveSlider = () => {
   
    gsap.to(Sliderref.current, { x: '100%', duration: 1 });
 
    
  };

  const resetSlider = () => {
    // Return the slider to its original position
    gsap.to(Sliderref.current, { x: 0, duration: 1 });
  };
  const signintoggle=()=>{
    gsap.to(signinref.current, { 
      x: 0,
      duration: 1,
      opacity:1, });
      gsap.to(signupref.current, { 
        x: "-100vh",
        duration: 1,
        opacity:0, });
  }
  const signuptoggle=()=>{
    gsap.to(signupref.current, { 
      x: 0,
      duration: 1,
      opacity:1, });
      gsap.to(signinref.current, { 
        x: "100vh",
        duration: 1,
        opacity:0, });

  }
  const { register: registerForm1, handleSubmit: handleSubmitForm1, reset: resetForm1, formState: { errors: errorsForm1 } } = useForm();
  const { register: registerForm2, handleSubmit: handleSubmitForm2, reset: resetForm2,watch, formState: { errors: errorsForm2 } } = useForm();
  const setpassword = watch("setpassword");

  const handlelogin =(data)=>{
    console.log(data)
   
  }
  const handleregister = (data) =>{
    console.log(data)
    
  }
  const SSOHandler =()=>{

  }

   useEffect(() => {
    signintoggle()
   }, [])
  
  return (
    <>
    <div>
      <Pagebanner title={page==="Signin" ? "Sign In ": "Sign Up"} /> 
      <div className="flex justify-center  w-full  px-4">
        <div className="shadow-lg border  my-10 border-gray-200 overflow-hidden w-full h-auto  md:w-[25%]">
          <div className="w-full ">
            <div className="flex felx-row text-[#191C1F] font-semibold text-2xl">
                <div className="flex justify-center items-center p-4 w-1/2"
                  onClick={()=>{
                    resetSlider()
                    setPage("Signin")
                    signintoggle()
                  }}>
                  <h1 className="" style={{ userSelect: "none" }}>Sign In</h1>
                </div>
                <div className="flex justify-center items-center p-4 w-1/2"
                onClick={()=>{
                  moveSlider()
                  setPage("Signup")
                  signuptoggle()
                }}>
                  <h1 className="" style={{ userSelect: "none" }}>Sign Up</h1>
                </div>
            </div>
            <div  className="border-[1px] w-full border-gray-200"></div>
            <div ref={Sliderref} className="border-[2px] w-1/2 border-primary"></div>
          </div>
          <div ref={signinref} className={page==="Signin" ? "opacity-0 translate-x-[100vh]  px-4": "opacity-0 hidden translate-x-[100vh]  px-4"}>
            <form onSubmit={handleSubmitForm1(handlelogin)}>
            <Input 
            label="Email"
            // placeholder="Enter your email"
            type="email"
            {...registerForm1("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invaild email",
              }})}
            />
            {errorsForm1.email && <p className="text-red-500">{errorsForm1.email.message}</p>}
            <Input 
            label="Password"
            type='password'
            {...registerForm1("password",{required:"Password is Required"})} />
            {errorsForm1.password && <p className="text-red-500">{errorsForm1.password.message}</p>}
            <div className="text-right">
                <Link
                  className="text-primary sm:text-sm text-[11px] font-medium"
                  to="/forgot-password">
                  Forgot Password?
                </Link>
             </div>   
            <button type='submit' className='hover:bg-white hover:text-primary  my-4  duration-200 ease-in border-2 border-primary bg-primary w-[100%] px-6 py-2 text-base sm:text-xl font-semibold text-white rounded-sm'
              onClick={()=>{
              
            }}
            >Sign In
            </button>
            </form>
            <div  className="border-[1px] w-full border-gray-200"></div>
            <SSOButton onClick={SSOHandler} />
          </div>
          <div ref={signupref} className={page==="Signup" ? "opacity-0 translate-x-[-100vh]  px-4": "opacity-0 hidden translate-x-[-100vh]  px-4"}>
            <form onSubmit={handleSubmitForm2(handleregister)}>
            <Input 
            label="Name"
            // placeholder="Enter your email"
            type="email"
            {...registerForm2("name", {
              required: "Name is required",
              })}
            /> 
            {errorsForm2.name && <p className="text-red-500">{errorsForm2.name.message}</p>}
            <Input 
            label="Email"
            // placeholder="Enter your email"
            type="email"
            {...registerForm2("setemail", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invaild email",
              }})}
            />
            {errorsForm2.setemail && <p className="text-red-500">{errorsForm2.setemail.message}</p>}
            <Input 
            label="Password"
            type='password'
            id="setpassword"
            {...registerForm2("setpassword",{required:"Password is Required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              }
            })}
             />
            {errorsForm2.setpassword && <p className="text-red-500">{errorsForm2.setpassword.message}</p>} 
            <Input 
            label="Confirm Password"
            type='password'
            {...registerForm2("setconfirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === setpassword || "Passwords do not match",
            })}
             />
            {errorsForm2.setconfirmPassword && <p className="text-red-500">{errorsForm2.setconfirmPassword.message}</p>} 

            <button type='submit' className='hover:bg-white hover:text-primary  my-4  duration-200 ease-in border-2 border-primary bg-primary w-[100%] px-6 py-2 text-base sm:text-xl font-semibold text-white rounded-sm'
              onClick={()=>{
              
            }}
            >Sign Up
            </button>
            </form>
            <div  className="border-[1px] w-full border-gray-200"></div>
            <SSOButton onClick={SSOHandler} />
          </div>
        </div>
      </div>
    </div>
    {isLoading && (
      <div className="w-full h-screen flex justify-center items-center  fixed top-0 left-0 bg-white z-50">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#937DC2"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    )}
    </>
  )
}

export default Login
