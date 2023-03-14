import { request } from "@/utils/request";

export const get7niuToken = (params: {}) => {
  return request<{}>({
    url: "/upload/get7niuToken",
    method: "POST",
    data: params
  });
}

export const files = (params: {}) => {
  return request<{}>({
    url: "/upload/files",
    method: "POST",
    data: params
  });
}

export const file = (params: {}) => {
  return request<{}>({
    url: "/upload/file",
    method: "POST",
    data: params
  });
}