import { request } from "@/utils/request";

export interface SaveActionDTO {
  entity_type: number;
  action_type: number;
  entity_id: number;
  flag: number;
}

export const saveActionForUser = (params: SaveActionDTO) => {
  return request<{}>({
    url: "/track/saveActionForUser",
    method: "POST",
    data: params
  });
}

export interface QueryListForUserDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  entity_type: number;
  action_type: number;
}

export const queryListForUser = (params: QueryListForUserDTO) => {
  return request<{}>({
    url: "/track/queryListForUser",
    method: "POST",
    data: params
  });
}

export interface QueryStatusForUserDTO {
  entity_type: number;
  action_type: number;
  entity_id: number;
}

export const queryStatusForUser = (params: QueryStatusForUserDTO) => {
  return request<{}>({
    url: "/track/queryStatusForUser",
    method: "POST",
    data: params
  });
}

export interface QueryCountForEntityDTO {
  pageSize?: number;
  pageIndex?: number;
  skip?: number;
  entity_type: number;
  action_type: number;
  entity_id: number;
}

export const queryCountForEntity = (params: QueryCountForEntityDTO) => {
  return request<{}>({
    url: "/track/queryCountForEntity",
    method: "POST",
    data: params
  });
}