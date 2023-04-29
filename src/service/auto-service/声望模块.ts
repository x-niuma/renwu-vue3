import { request } from "@/utils/request";

export const getUserReputation = (params: {}) => {
  return request<{}>({
    url: "/api/reputation/getUserReputation",
    method: "POST",
    data: params
  });
}

export const getUserReputationFlow = (params: GetUserReputationFlowDTO) => {
  return request<{}>({
    url: "/api/reputation/getUserReputationFlow",
    method: "POST",
    data: params
  });
}