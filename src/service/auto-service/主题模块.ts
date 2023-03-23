import { request } from "@/utils/request";

export const queryTags = (params: QueryFeedTagDTO) => {
  return request<{}>({
    url: "/api/feed/queryTags",
    method: "POST",
    data: params
  });
}

export const queryCategoryList = (params: {}) => {
  return request<{}>({
    url: "/api/feed/queryCategoryList",
    method: "POST",
    data: params
  });
}

export const remove = (params: RemoveFeedDTO) => {
  return request<{}>({
    url: "/api/feed/remove",
    method: "POST",
    data: params
  });
}

export const create = (params: CreateFeedDTO) => {
  return request<{}>({
    url: "/api/feed/create",
    method: "POST",
    data: params
  });
}

export const queryList = (params: QueryFeedDTO) => {
  return request<{}>({
    url: "/api/feed/queryList",
    method: "POST",
    data: params
  });
}