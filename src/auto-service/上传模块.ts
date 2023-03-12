import { request } from "@/utils/request";

export const file = (params: {}) => {
  return request<{}>({
    url: "/upload/file",
    method: "POST",
    data: params
  });
}