import { request } from "@/utils/request";

export const getCity = (params: {}) => {
  return request<CityNode[]>({
    url: "/api/general/getCity",
    method: "POST",
    data: params
  });
}

export const queryWeather = (params: {}) => {
  return request<{}>({
    url: "/api/general/queryWeather",
    method: "POST",
    data: params
  });
}

export const queryIp = (params: {}) => {
  return request<{}>({
    url: "/api/general/queryIp",
    method: "POST",
    data: params
  });
}