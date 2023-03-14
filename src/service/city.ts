import { request } from "@/utils/request";

export const getCity = (params: {}) => {
  return request<{}>({
    url: "/static/city.json",
    method: "GET",
    data: params
  });
}