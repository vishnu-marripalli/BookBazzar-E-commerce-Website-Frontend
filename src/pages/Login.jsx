import React,{useRef, useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Pagebanner from '../components/Pagebanner'
import Input from '../components/ui/Input'
import SSOButton from '../components/SSOButton'
import gsap from 'gsap'
import { ThreeDots } from "react-loader-spinner";
import { useForm, SubmitHandler } from "react-hook-form"
import ApiCall from '../lib/ApiCall'
import { useDispatch } from 'react-redux'
import { register,login,loginFailed } from '../features/auth'
import { toast } from 'sonner'

const Login = () => {
  const [page, setPage] = useState('Signin')
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch()
  const navigate =useNavigate()

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
        opacity:0,
       });

  }
  const { register: registerForm1, handleSubmit: handleSubmitForm1, reset: resetForm1, formState: { errors: errorsForm1 } } = useForm();
  const { register: registerForm2, handleSubmit: handleSubmitForm2, reset: resetForm2,watch, formState: { errors: errorsForm2 } } = useForm();
  const setpassword = watch("setpassword");

  const handlelogin =async(data)=>{
    console.log(data)
    try {
      setIsLoading(true);
      const response = await ApiCall({
        url: "/api/v1/user/login",
        method: "POST",
        data: data
      });
      // console.log(response)
      if (response.data) {
        const user = response.data?.data?.user;
        const accessToken = response.data?.data?.accessToken;
        const refreshToken = response.data?.data?.refreshToken;

        await Promise.all([
          localStorage.setItem("accessToken", accessToken),
          localStorage.setItem("refreshToken", refreshToken),
        ]);

        const userState = {
          userId: user?._id,
          fullName: user?.fullName,
          email: user?.email,
          isEmailVerified: user?.isEmailVerified,
          role: user?.role,
          accessToken: accessToken,
          refreshToken: refreshToken,
          isLoggedIn: true,
        };

        const loginPayload = {
          isAuthenticated: true,
          user: userState,
          error: null,
        };

        dispatch(login(loginPayload));
        setIsLoading(false);
        navigate('/')
      }  
      if (response.error) {
        setIsLoading(false);
        toast.error("Error While Login")
        // if (response.error.data.errors) {
        //   const errorKeys = Object.keys(response.error.data.errors);
        //   if (errorKeys.length > 0) {
        //     const firstErrorKey = errorKeys[0];
        //     const errorObject =
        //       response.error.data.errors[firstErrorKey];
        //     const errorMessage = Object.values(errorObject)[0];
        //     toast.error(errorMessage, {
        //       position: "top-center",
        //       autoClose: 3000,
        //     });
        //     dispatch(loginFailed(errorMessage));
        //   } else if (response.error.data.message) {
        //     toast.error(response.error.data.message, {
        //       position: "top-center",
        //       autoClose: 3000,
        //       hideProgressBar: false,
        //     });
        //     dispatch(loginFailed(response.error.data.message));
        //   }
        // } else if (response.error.data.message) {
        //   toast.error(response.error.data.message, {
        //     position: "top-center",
        //     autoClose: 3000,
        //     hideProgressBar: false,
        //   });
        //   dispatch(loginFailed(response.error.data.message));
        // }
      }
    } catch (error) {
      console.log("error is : ", error);
      setIsLoading(false);
      toast.error("Login Failed", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(loginFailed("Login Failed"));
    
    }
    
  }
  const handleregister = async(data) =>{
    console.log(data)
    try {
      setIsLoading(true)
     const response= await ApiCall({
        url:'/api/v1/user/register',
        method:"POST",
        data:data,
      })
      setIsLoading(false);
      if(response.data){
        console.log(response)
        dispatch(register(response.data.data.user.email))
        navigate("/email-verification");

      }
     } catch (error) {
      
     }
    
  }
  const SSOHandler =()=>{
    try {
      // window.open(
      //   "https://domain/api/v1/user/google",
      //   "_self"
      // );
      window.open("http://localhost:8000/api/v1/user/google", "_self");
    } catch (error) {
      toast.error("Sing in Failed", {
        position: "top-center",
        autoClose: 5000,
      });
    }
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
            type="text"
            {...registerForm2("fullName", {
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
