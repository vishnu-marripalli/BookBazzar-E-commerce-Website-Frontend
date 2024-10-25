import axios from "axios";

const ApiCall = async ({
  url,
  method = "GET",
  params = {},
  data = {},
  headers= {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Fetch here for fresh token
    "Content-Type": "application/json",
  },
}) => {
  const response = {
    data: null,
    error: null,
  };

  const fetchData = async () => {
    try {
      const res = await axios({
        method,
        url,
        params,
        data,
        headers,
        withCredentials: true,
      });
      response.data = res.data;
    } catch (error) {
      response.error = error.response || "An error occurred";
    }
  };

  await fetchData();

  return response;
};

export default ApiCall;