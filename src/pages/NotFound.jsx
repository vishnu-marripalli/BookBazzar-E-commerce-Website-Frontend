const NotFound = () => {
    return (
      <div className=" w-full bg-gray-200 flex flex-col items-center justify-center h-screen p-5">
        <h1 className="md:text-6xl text-5xl text-center font-bold text-primary mb-4 main-heading-font">
          404 - Page Not Found
        </h1>
        <p className="md:text-lg text-base text-center  text-primary">
          Sorry, the page you're looking for does not exist.
        </p>
      </div>
    );
  };
  
  export default NotFound;