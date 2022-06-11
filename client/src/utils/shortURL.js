import { fetchAPI } from "./api";

const baseURL = "http://localhost:3500";
// const testURL = "https://jsonplaceholder.typicode.com/todos/1";

export function makeShorten(fullUrl) {
  const url = baseURL + "/shorturl";
  return fetchAPI({ method: "post", url, data: { fullUrl } });
}

export function login(data) {
  const url = baseURL + "/login";
  return fetchAPI({ method: "post", url, data });
  // const res = await fetchAPI({ method: "post", url, data });
  // console.log("fetch", res);
  // return res;
}
