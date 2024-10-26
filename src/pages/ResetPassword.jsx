import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import ApiCall from "../lib/ApiCall";
import Input from "../components/ui/Input";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const navigate = useNavigate();
  const { token } = useParams();
  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordErrorMessage("Password must be at least 8 characters long");
    } else {
      setPasswordErrorMessage("");
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (passwordErrorMessage === "") {
      if (password === confirmPassword) {
        try {
          setIsLoading(true);
          const response = await ApiCall({
            url: `https://bookbazzar-backend.onrender.com/api/v1/user/reset-password/${token}`,
            // url: `http://localhost:8000/api/v1/user/reset-password/${token}`,
            method: "POST",
            data: {
              newPassword: password,
              confirmPassword,
            },
          });
          setIsLoading(false);
          if (response.data) {
            toast.success(response.data.message, {
              position: "top-center",
              autoClose: 3000,
            });
            navigate("/login");
          }
          if (response.error) {
            toast.error(response.error.data.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
            });
          }
        } catch (error) {
          toast.error("Reset Password Failed", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } else {
        toast.error("Password and Confirm Password do not match", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full sm:p-16 px-6 h-full flex justify-center items-center">
          <div className="md:w-[500px] w-full h-auto md:px-16 px-8 md:py-10 py-6">
            <form onSubmit={resetPasswordHandler}>
              <h2 className="text-[#000] main-heading-font sm:text-3xl text-2xl text-center">
                Reset Password
              </h2>

              <Input
                label="New Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                type="password"
                placeholder="At least 8 characters"
                value={password}
              />
              {passwordErrorMessage && (
                <span className="text-red-600 sm:text-xs text-[10px]">
                  {passwordErrorMessage}
                </span>
              )}
              <Input
                label="Confirm your new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Re-enter new password"
                value={confirmPassword}
              />

              <div className="sm:my-4 my-2 flex flex-col gap-4">
                <button className="hover:bg-white hover:text-primary  my-4  duration-200 ease-in border-2 border-primary bg-primary w-[100%] px-6 py-2 text-base sm:text-xl font-semibold text-white rounded-sm">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
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

export default ResetPassword;
