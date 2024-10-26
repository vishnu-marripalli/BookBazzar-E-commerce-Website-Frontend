import React, { useRef } from "react";
import { useEffect } from "react";
import SignOut from "../assests/SignOut.svg";
import User from "../assests/User.svg";
import { CiLogin } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { gsap } from "gsap";
import { toggleHamburger } from "../features/features";
import SearchBar from "./ui/SearchBar";
import ApiCall from "../lib/ApiCall";
import { logout } from "../features/auth";
import { initCart } from "../features/cart";
import { initWishlist } from "../features/Wishlist";

export default function Drawer() {
  const draweref = useRef(null);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const Hamburger = () => {
    dispatch(toggleHamburger());
  };
  const logouthandler = () => {
    ApiCall({
      url: "https://bookbazzar-backend.onrender.com/api/v1/user/logout",
      method: "GET",
    })
      .then((response) => {
        if (response.data) {
          dispatch(logout());
          dispatch(initCart());
          dispatch(initWishlist());

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        } else {
          toast.error("Error while logging out");
        }
      })
      .catch(() => {
        toast.error("Error while logging out");
      });
  };
  useEffect(() => {
    function handleresize() {
      if (window.innerWidth > 768) {
        Hamburger();
      }
    }
    handleresize();

    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gsap.to(draweref.current, {
      duration: 1,
      x: 0,
      ease: "sine.in",
    });
    return () => {};
  }, []);

  return (
    <>
      <div
        ref={draweref}
        className="w-[100vw] h-[90vh] top-0 left-0 translate-x-[-100vh]"
      >
        <div className="w-full bg-white h-full flex flex-col justify-between">
          <ul>
            <li className="p-2 border-b-2 border-voilet-100">
              <SearchBar />
            </li>
            <li>
              <div className=" border-b-2 border-voilet-100 px-5 py-3 font-medium text-[15px]">
                <Link to="/" onClick={Hamburger}>
                  Home
                </Link>
              </div>
            </li>
            <li>
              <div className=" border-b-2 border-voilet-100 px-5 py-3 font-medium text-[15px]">
                <Link to="/shop" onClick={Hamburger}>
                  Shop
                </Link>
              </div>
            </li>
            <li>
              <div className=" border-b-2 border-voilet-100 px-5 py-3 font-medium text-[15px]">
                <Link
                  to="/sellyourbooks"
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast("Please Login to Sell Your Books ");
                      navigate("/login");
                    }
                    Hamburger();
                  }}
                >
                  Sell your books
                </Link>
              </div>
            </li>
            <li>
              <div className=" border-b-2 border-voilet-100 px-5 py-3 font-medium text-[15px]">
                <Link to="/contactus" onClick={Hamburger}>
                  Contact Us
                </Link>
              </div>
            </li>
          </ul>
          <div className="w-full">
            {isAuthenticated ? (
              <div className=" border-t-2 border-voilet-100 px-5 py-5 font-medium text-[15px]">
                <Link
                  to="/user"
                  className="flex  items-center gap-4"
                  onClick={() => {
                    Hamburger();
                    if (!isAuthenticated) {
                      toast("Please Login to Sell Your Books ");
                      navigate("/login");
                    }
                  }}
                >
                  <img src={User} className=" " alt="user" loading="lazy" />{" "}
                  <span className="font-medium text-base">Account</span>
                </Link>
              </div>
            ) : (
              <div className=" border-t-2 border-voilet-100 px-5 py-5 font-medium text-[15px]">
                <Link
                  to="/login"
                  className="flex  items-center gap-4"
                  onClick={() => {
                    Hamburger();
                  }}
                >
                  <CiLogin size={25} color="#937DC2" />
                  <span className="font-medium text-base">Login</span>
                </Link>
              </div>
            )}
            {isAuthenticated ? (
              <div className=" border-t-2 border-voilet-100 px-5 py-5 font-medium text-[15px]">
                <Link
                  className="flex  items-center gap-4"
                  onClick={() => {
                    Hamburger();
                    logouthandler();
                  }}
                >
                  <img src={SignOut} className=" " alt="user" loading="lazy" />{" "}
                  <span className="font-medium text-base">Logout</span>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </>
  );
}
