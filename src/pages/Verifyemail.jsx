import { useEffect, useState } from "react";
import blueEnvelope from "../assests/blueEnvelope.jpg"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

const VerifyEmail = () => {
  const userEmail = useSelector((state) => state.user.user?.email);
  const [email, setEmail] = useState(userEmail || "");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userEmail || userEmail.trim().length === 0) {
      navigate("/login");
    }
    setEmail(userEmail);
  }, [userEmail, navigate]);

//   const resendEmailVerificationHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setIsLoading(true);
//       const response = await ApiCall({
//         url: "/api/v1/users/resend-verify-email",
//         method: "POST",
//         data: {
//           email,
//         },
//       });
//       setIsLoading(false);
//       if (response.data) {
//         const message = response.data?.message;
//         toast.success(message, {
//           position: "top-center",
//           autoClose: 3000,
//         });
//       }
//       if (response.error?.data?.message) {
//         toast.error(response.error.data.message, {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//         });
//       }
//     } catch (error) {
//       console.log("verify email error: " + error);
//     }
//   };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full sm:p-16 px-4 h-full flex justify-center items-center">
        <div className="md:w-[500px] h-auto px-7 sm:px-16 sm:py-10 py-6 flex flex-col items-center">
          <img
            src={blueEnvelope}
            className="sm:w-[80px] w-[60px]"
            alt="envelope"
          />
          <form  className="w-full">
            <h2 className="text-[#000] main-heading-font font-bold text-2xl sm:text-3xl text-center mt-4">
              Verify your email address
            </h2>
            <p className="text-center text-xs sm:text-sm text-gray-500 my-4">
              A verification link has been sent to your email address:{" "}
              <span className="text-primary">{email}</span>
              <br />
              Please check your email and click on the link provided to complete
              your account registration.
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-white z-50">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#f68c23"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
