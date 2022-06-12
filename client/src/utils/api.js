import axios from "axios";

export const fetchAPI = async ({ method, url, data = {}, headers }) => {
  try {
    // console.log(method, path, data);
    const res = await axios({
      method,
      url,
      // url: baseURL + path,
      // url: testURL,
      data,
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Content-Type": "application/json",
      // },
      headers: headers,
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return error;
  }
};
