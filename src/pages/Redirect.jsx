import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import ApiCall from '../lib/ApiCall';
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login, setIsAuthenticated } from '../features/auth';

const Redirect = () => {
    const navigate = useNavigate()
    const { accessToken = "", refreshToken = "" } = useParams();
    const dispatch = useDispatch()

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    
    useEffect(() => {
        const fetchData = async () => {
        if (!accessToken || accessToken.trim() === "") {
            dispatch(setIsAuthenticated(false));
            navigate("/login");
            }
      
        try {
            const response = await ApiCall({
                url: "/api/v1/user/self",
                method: "GET",
                data: {},
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
            });
            if (response.data) {
                console.log(response)
                const user = response.data?.data;
               
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
                navigate("/");
                // Todo Cart and whishlist
            } else if (response.error) {
                dispatch(setIsAuthenticated(false));
                navigate("/login");
            }
        } catch (error) {
            dispatch(setIsAuthenticated(false));
            navigate("/login");
        }
    }
        fetchData();
    }, [dispatch])
    
  return (
    <>
    <div className="w-full h-screen custom-flex fixed top-0 left-0 bg-white z-50">
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
  </>
  )
}

export default Redirect
