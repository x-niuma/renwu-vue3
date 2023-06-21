import { request } from "@/utils/request";

export const queryNavList = (params: QueryNavListDto) => {
  return request<QueryNavListVo>({
    url: "/api/article/queryNavList",
    method: "POST",
    data: params
  });
}

export const queryTags = (params: QueryTagsDto) => {
  return request<{}>({
    url: "/api/article/queryTags",
    method: "POST",
    data: params
  });
}

export const queryChildren = (params: QueryChildrenDto) => {
  return request<QueryChildrenVo>({
    url: "/api/article/queryChildren",
    method: "POST",
    data: params
  });
}

export const queryArticleDetail = (params: QueryArticleDetail) => {
  return request<ArticleEntity>({
    url: "/api/article/queryArticleDetail",
    method: "POST",
    data: params
  });
}