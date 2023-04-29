import { request } from "@/utils/request";

export const queryAdminList = (params: {}) => {
  return request<{}>({
    url: "/api/queryAdminList",
    method: "POST",
    data: params
  });
}

export const queryRoleList = (params: {}) => {
  return request<{}>({
    url: "/api/queryRoleList",
    method: "POST",
    data: params
  });
}