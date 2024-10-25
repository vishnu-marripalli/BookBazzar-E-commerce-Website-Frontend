import { useNavigate } from "react-router-dom";
import righttick from '../assests/righttick.png';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import  ApiCall  from '../lib/ApiCall'
import { ThreeDots } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";

const VerifyEmailSuccess = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await ApiCall({
          url: `https://bookbazzar-backend.onrender.com/api/v1/user/verify-email/${token}`,
          method: "GET",
        });
        setIsLoading(false);
        if (response.data) {
          console.log(response)
          setEmailVerified(true);
        }
        if (
          response.error &&
          response.error.data &&
          response.error.data.message
        ) {
          toast.error(response.error.data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
          });
        }
      } catch (error) {
        console.log("verifyemailsuccess error", error);
      }
    })();
  }, [token]);

  const verifySuccessHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full sm:p-16 px-6 h-full justify-center items-center">
          {emailVerified && (
            <div className="md:w-[600px] w-full h-auto px-7 sm:px-16 py-4 justify-center items-center flex-col">
              <>
                <img
                  src={righttick}
                  className="w-[50px] my-3"
                  alt="successful"
                />
                <h2 className="text-[#000] roboto-medium sm:text-3xl text-2xl text-center mt-1">
                  Your email has been verified successfully
                </h2>
                <div className="w-full custom-flex sm:my-4 my-4">
                  <button
                    className="w-[200px] rounded-lg sm:p-[9px] p-1 text-center sm:text-sm text-[12px] font-bold text-[#000] border-2 border-black hover:scale-[1.02]"
                    onClick={verifySuccessHandler}
                  >
                    Go Back to Log in
                  </button>
                </div>
              </>
            </div>
          )}
        </div>
      </div>
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
    </>
  );
};

export default VerifyEmailSuccess;
