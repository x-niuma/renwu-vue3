import { request } from "@/utils/request";

export const test = (params: {}) => {
  return request<{}>({
    url: "/ping/test",
    method: "GET",
    data: params
  });
}

export const mongo = (params: {}) => {
  return request<{}>({
    url: "/ping/mongo",
    method: "GET",
    data: params
  });
}

export const redirect = (params: {}) => {
  return request<{}>({
    url: "/ping/redirect",
    method: "GET",
    data: params
  });
}