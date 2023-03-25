import { request } from "@/utils/request";

export const queryTags = (params: QueryProjectTagDTO) => {
  return request<{}>({
    url: "/api/project/queryTags",
    method: "POST",
    data: params
  });
}

export const queryCategoryList = (params: {}) => {
  return request<{}>({
    url: "/api/project/queryCategoryList",
    method: "POST",
    data: params
  });
}

export const remove = (params: RemoveProjectDTO) => {
  return request<{}>({
    url: "/api/project/remove",
    method: "POST",
    data: params
  });
}

export const create = (params: CreateProjectDTO) => {
  return request<{}>({
    url: "/api/project/create",
    method: "POST",
    data: params
  });
}

export const updateProject = (params: CreateProjectDTO) => {
  return request<ProjectUpdateVo>({
    url: "/api/project/updateProject",
    method: "POST",
    data: params
  });
}

export const queryList = (params: QueryProjectDTO) => {
  return request<ProjectListVo>({
    url: "/api/project/queryList",
    method: "POST",
    data: params
  });
}

export const queryListByIdList = (params: QueryListByIdListDTO) => {
  return request<ProjectListVo>({
    url: "/api/project/queryListByIdList",
    method: "POST",
    data: params
  });
}

export const queryDetail = (params: QueryProjectDetailDTO) => {
  return request<ProjectItemVo>({
    url: "/api/project/queryDetail",
    method: "POST",
    data: params
  });
}