import axios from "axios";

// from fo fetch api
export const fetchAPI = async ({ method, url, data = {}, headers }) => {
  try {
    // console.log(method, path, data);
    const res = await axios({
      method,
      url,
      data,
      headers: headers,
    });
    // console.log(res);
    return res;
  } catch (error) {
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    return error;
  }
};
