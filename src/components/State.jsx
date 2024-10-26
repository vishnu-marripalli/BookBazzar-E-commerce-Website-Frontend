import React, { useState, useEffect } from 'react'
import Layout from '../Layout'
import { useDispatch } from 'react-redux'
import Loading from './Loading';
import { setIsAuthenticated, login } from '../features/auth';
import ApiCall from '../lib/ApiCall';
import { setCart } from '../features/cart';
import { setWishlist } from '../features/Wishlist';



const State = () => {

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetechdata = async () => {
      setIsLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || accessToken.trim() === "") {
        dispatch(setIsAuthenticated(false));
        setIsLoading(false);
        return;
      }
      try {
        const response = await ApiCall({
          url: "https://bookbazzar-backend.onrender.com/api/v1/user/self",
          method: "GET",
          data: {},
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        if (response.data) {
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
          // add cart
          const cartResponse = await ApiCall({
            url: 'https://bookbazzar-backend.onrender.com/api/v1/cart/',
            method: "GET"
          })
          dispatch(setCart({
            cart: [...cartResponse.data.data.items],
            totalPrice: cartResponse.data.data?.cartTotal,
            discountedTotalPrice: cartResponse.data.data.discountedTotal,
          }
          ))

          const wishlistResponse = await ApiCall({
            url: 'https://bookbazzar-backend.onrender.com/api/v1/wishlist/',
            method: "GET"
          })
          const bookIds = wishlistResponse.data.data.Books;
          dispatch(setWishlist(bookIds));


          setIsLoading(false);
        } else if (response.error) {
          dispatch(setIsAuthenticated(false));
          setIsLoading(false);
          return;
        }
      } catch (error) {
        dispatch(setIsAuthenticated(false));
      } finally {
        setIsLoading(false);

      }
    }
    fetechdata()
  }, [dispatch])

  if (isLoading) {
    return <Loading />;
  }
  return <Layout />
}

export default State
