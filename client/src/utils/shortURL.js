import { fetchAPI } from "./api";

const baseURL = "http://localhost:3500";

// fetch generate shot url api
export function makeShorten(fullUrl) {
  const url = baseURL + "/shorturl";
  return fetchAPI({ method: "post", url, data: { fullUrl } });
}

// fetch login api
export function login(data) {
  const url = baseURL + "/login";
  return fetchAPI({ method: "post", url, data });
}

// fetch url history api
export function history(token) {
  const url = baseURL + "/admin/history";
  return fetchAPI({
    method: "post",
    url,
    headers: { "x-access-token": token },
  });
}
