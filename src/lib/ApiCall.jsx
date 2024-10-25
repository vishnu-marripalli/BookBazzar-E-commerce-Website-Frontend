import axios from "axios";
const accessToken = localStorage.getItem("accessToken");

const ApiCall = async ({
  url,
  method = "GET",
  params = {},
  data = {},
  headers= {
    Authorization: `Bearer ${accessToken}`,
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