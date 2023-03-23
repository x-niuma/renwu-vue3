import { request } from "@/utils/request";

export const queryCommentList = (params: QueryCommentListDTO) => {
  return request<QueryCommentListVo>({
    url: "/api/comment/queryCommentList",
    method: "POST",
    data: params
  });
}

export const addComment = (params: AddCommentDTO) => {
  return request<AddCommentVo>({
    url: "/api/comment/addComment",
    method: "POST",
    data: params
  });
}

export const removeComment = (params: RemoveCommentDTO) => {
  return request<{}>({
    url: "/api/comment/removeComment",
    method: "POST",
    data: params
  });
}

export const queryReplyList = (params: QueryReplyListDTO) => {
  return request<QueryReplyListVo>({
    url: "/api/comment/queryReplyList",
    method: "POST",
    data: params
  });
}

export const addReply = (params: AddReplyDTO) => {
  return request<{}>({
    url: "/api/comment/addReply",
    method: "POST",
    data: params
  });
}

export const removeReply = (params: RemoveReplyDTO) => {
  return request<{}>({
    url: "/api/comment/removeReply",
    method: "POST",
    data: params
  });
}