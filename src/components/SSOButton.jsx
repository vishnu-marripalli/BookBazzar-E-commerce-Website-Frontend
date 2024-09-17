import React from "react";

const SSOButton = ({ onClick }) => {
  return (
    <div className="button-wrapper rounded-lg">
      <button
        type="button"
        onClick={onClick}
        className="button w-full border-2  my-4 border-primary  sm:p-[9px] p-2 text-center text-sm font-medium flex items-center justify-center gap-2 text-black rounded-md">
        <img
          src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
          alt="Google Logo"
          className="w-[15px] sm:w-[20px]"
          loading="lazy"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default SSOButton;
