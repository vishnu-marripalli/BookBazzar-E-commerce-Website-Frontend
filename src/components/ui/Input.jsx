import React,{useId,useState} from 'react'
 const Input =React.forwardRef(function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  isRequired = true,
  disabled = false,
  error = '',
  success = false,
  className = '',
  ...props
 },ref){
  const [showPassword, setShowPassword] = useState(false);
  const confirmPassword = type;

  if (confirmPassword === "confirmPassword") {
    type = "password";
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;
    const id = useId()
    const inputClasses = `
    w-full 
    px-4 
    py-2.5
    border 
    rounded-lg 
    outline-none 
    transition-all 
    duration-200
    focus:ring-2
    focus:ring-offset-1
    ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
    ${error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
      : success
      ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
    }
    ${className}
  `;
  return (
    <>
      <div className="w-full my-1 sm:mt-5 mt-2 relative">
        <label className="sm:text-[16px] text-[12px] ">{label}</label>
        <br />
        <input
          type={type === "password" ? inputType : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={isRequired}
          className="sm:p-3 p-[5px] remove-arrow w-full border-gray-300 hover:border-gray-400 border-2 rounded-md text-gray-800  appearance-none  sm:text-sm text-[12px] tracking-wider focus:border-gray-400 outline-none duration-200 ease-out"
          {...props}
          ref={ref}
          id={id}
        />
        <div
          className={`${
            confirmPassword === "confirmPassword" ? "hidden" : " "
          }`}>
          {type === "password" && ( // Conditionally render eye button section
            <button
              type="button"
              className="w-auto absolute top-1/2 sm:right-2 right-0  transform -translate-y-1/3 h-full px-3 flex items-center"
              onClick={togglePasswordVisibility}>
              {showPassword ? (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="sm:w-[28px] w-[18px]"
                    fill="#9CA3AF">
                    <path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z" />
                  </svg>
                </span>
              ) : (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    className="sm:w-[28px] w-[18px]"
                    fill="#9CA3AF">
                    <path d="m629-419-44-44q26-71-27-118t-115-24l-44-44q17-11 38-16t43-5q71 0 120.5 49.5T650-500q0 22-5.5 43.5T629-419Zm129 129-40-40q49-36 85.5-80.5T857-500q-50-111-150-175.5T490-740q-42 0-86 8t-69 19l-46-47q35-16 89.5-28T485-800q143 0 261.5 81.5T920-500q-26 64-67 117t-95 93Zm58 226L648-229q-35 14-79 21.5t-89 7.5q-146 0-265-81.5T40-500q20-52 55.5-101.5T182-696L56-822l42-43 757 757-39 44ZM223-654q-37 27-71.5 71T102-500q51 111 153.5 175.5T488-260q33 0 65-4t48-12l-64-64q-11 5-27 7.5t-30 2.5q-70 0-120-49t-50-121q0-15 2.5-30t7.5-27l-97-97Zm305 142Zm-116 58Z" />
                  </svg>
                </span>
              )}
            </button>
          )}
        </div>
         {/* Helper text / Error message */}
      {(error) && (
        <div className={`mt-1.5 text-sm ${error ? 'text-red-500' : 'text-gray-500'}`}>
          {error }
        </div>
      )}
      </div>
    </>
  );
}

 )

export default Input

