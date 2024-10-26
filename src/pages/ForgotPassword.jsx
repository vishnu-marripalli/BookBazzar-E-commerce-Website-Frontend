import { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import ApiCall from "../lib/ApiCall";
import Input from "../components/ui/Input";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [currentState, setCurrentState] = useState("sendEmail");
  const [otp, setOtp] = useState(Array(6).fill("")); // Initialize an array with 6 empty strings for OTP
  const otpInputs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // OTP Verification
  const handleChange = (index, value, e) => {
    if (!isNaN(Number(value)) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input field if not the last one
      if (index < otpInputs.current.length - 1 && value !== "") {
        otpInputs.current[index + 1]?.focus();
      }
    } else if (e.key === "Backspace" && index > 0) {
      // Move focus to the previous input field on backspace press
      otpInputs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    // Set focus to the first input field when the component mounts
    otpInputs.current[0]?.focus();
  }, []);

  // API calls
  const emailHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await ApiCall({
        //   url:'http://localhost:8000/api/v1/user/forgot-password',
        url: `https://bookbazzar-backend.onrender.com/api/v1/user/forgot-password`,
        method: "POST",
        data: {
          email,
        },
      });
      setIsLoading(false);
      if (res.data) {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
        setCurrentState("otpVerification");
      }
      if (res.error) {
        toast.error(res.error.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    if (otp.join("").length < 6) {
      toast.error("Invalid OTP", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      try {
        setIsLoading(true);
        const response = await ApiCall({
          url: "https://bookbazzar-backend.onrender.com/api/v1/user/verify-otp",
          // url: `http://localhost:8000/api/v1/user/verify-otp`,

          method: "POST",
          data: {
            email: email,
            otp: otp.join(""),
          },
        });
        setIsLoading(false);
        if (response.data) {
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 3000,
          });
          navigate(`/reset-password/${response.data.data.token}`);
        }
        if (response.error) {
          toast.error(response.error.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        toast.error("Verify OTP Failed", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <div className="z-50">
        {currentState === "sendEmail" && (
          <div className="w-full h-screen custom-flex">
            <div className="w-full sm:p-16 px-6 h-full custom-flex">
              <div className="md:w-auto w-full h-auto py-12 px-7 sm:px-10 custom-flex flex-col">
                <form onSubmit={emailHandler}>
                  <h2 className="text-[#000] roboto-bold sm:text-3xl text-2xl text-center">
                    Forgot your Password?
                  </h2>
                  <Input
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                  />
                  <div className="sm:my-4 my-2 flex flex-col gap-4">
                    <button className="hover:bg-white hover:text-primary  my-4  duration-200 ease-in border-2 border-primary bg-primary w-[100%] px-6 py-2 text-base sm:text-xl font-semibold text-white rounded-sm">Conform mail</button>
                  </div>
                  <div className="text-center">
                    <Link
                      className="text-primary sm:text-sm text-[10px] font-medium"
                      to="/login">
                      Back to log in
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {currentState === "otpVerification" && (
          <div className="w-full h-screen flex justify-center items-center">
            <div className="max-w-[450px] h-auto px-4 sm:px-16 sm:py-8 py-4">
              <form onSubmit={verifyOtpHandler}>
                <h2 className="text-[#000] font-bold sm:text-3xl text-2xl text-center mb-3">
                  OTP Verification!
                </h2>
                <p className="text-center sm:text-sm text-[12px] text-gray-500 mb-6">
                  Enter the 6-digit "OTP" that has been sent <br /> to your
                  email address
                </p>
                <div className="flex justify-center gap-3 my-8">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      value={value}
                      maxLength={1}
                      inputMode="numeric"
                      onChange={(e) => handleChange(index, e.target.value, e)}
                      className="no-arrows sm:w-12 sm:h-12 sm:text-3xl text-2xl w-10 h-10 text-center border rounded-lg border-[#000]"
                      ref={(input) => (otpInputs.current[index] = input)}
                    />
                  ))}
                </div>
                <div className="flex justify-center my-2">
                  <button className="hover:bg-white hover:text-primary  my-4  duration-200 ease-in border-2 border-primary bg-primary w-[100%] px-6 py-2 text-base sm:text-xl font-semibold text-white rounded-sm">Conform OTP</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <ToastContainer />
        {isLoading && (
          <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-white z-50">
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
      </div>
    </>
  );
};

export default ForgotPassword;
