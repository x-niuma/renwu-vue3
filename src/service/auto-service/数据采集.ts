import { request } from "@/utils/request";

export const saveActionForUser = (params: SaveActionDTO) => {
  return request<{}>({
    url: "/api/track/saveActionForUser",
    method: "POST",
    data: params
  });
}

export const queryListForUser = (params: QueryListForUserDTO) => {
  return request<{}>({
    url: "/api/track/queryListForUser",
    method: "POST",
    data: params
  });
}

export const queryStatusForUser = (params: QueryStatusForUserDTO) => {
  return request<{}>({
    url: "/api/track/queryStatusForUser",
    method: "POST",
    data: params
  });
}

export const queryCountForEntity = (params: QueryCountForEntityDTO) => {
  return request<{}>({
    url: "/api/track/queryCountForEntity",
    method: "POST",
    data: params
  });
}