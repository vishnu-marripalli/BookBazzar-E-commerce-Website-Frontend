import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0 bg-white ">
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
  );
};

export default Loading;