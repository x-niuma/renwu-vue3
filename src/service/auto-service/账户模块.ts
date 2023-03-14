import { request } from "@/utils/request";

export interface RegisterDto {
  account: string;
  password?: string;
  code?: string;
  registerType: string;
}

export interface RegisterRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
}

export const register = (params: RegisterDto) => {
  return request<RegisterRes>({
    url: "/account/register",
    method: "POST",
    data: params
  });
}

export interface RegisterByAccountDto {
  account: string;
  password?: string;
}

export interface RegisterRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
}

export const registerByAccount = (params: RegisterByAccountDto) => {
  return request<RegisterRes>({
    url: "/account/registerByAccount",
    method: "POST",
    data: params
  });
}

export interface LoginDto {
  account: string;
  password?: string;
  code?: string;
  codeType?: string;
  loginType: string;
}

export interface LoginRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
}

export const login = (params: LoginDto) => {
  return request<LoginRes>({
    url: "/account/login",
    method: "POST",
    data: params
  });
}

export interface PwdLoginDto {
  account: string;
  password: string;
}

export interface LoginRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
}

export const pwdLogin = (params: PwdLoginDto) => {
  return request<LoginRes>({
    url: "/account/pwdLogin",
    method: "POST",
    data: params
  });
}

export interface CodeLoginDTO {
  account: string;
  code: string;
}

export interface LoginRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
  token: string;
}

export const codeLogin = (params: CodeLoginDTO) => {
  return request<LoginRes>({
    url: "/account/codeLogin",
    method: "POST",
    data: params
  });
}

export const logout = (params: {}) => {
  return request<{}>({
    url: "/account/logout",
    method: "POST",
    data: params
  });
}

export interface CheckLoginRes {
  status: boolean;
  user: undefined;
}

export const checkLogin = (params: {}) => {
  return request<CheckLoginRes>({
    url: "/account/checkLogin",
    method: "POST",
    data: params
  });
}

export interface GetUserInfoRes {
  id: number;
  create_time: string;
  update_time: string;
  account: string;
  password: string;
  mobile: string;
  email: string;
  nickname: string;
  avatar: string;
  gender: string;
  birthday: string;
  city: string;
  college: string;
  introduction: string;
  background: string;
  status: boolean;
}

export const getUserInfo = (params: {}) => {
  return request<GetUserInfoRes>({
    url: "/account/getUserInfo",
    method: "POST",
    data: params
  });
}

export interface SendCodeDto {

}

export interface SendCodeRes {
  status: boolean;
}

export const sendCode = (params: SendCodeDto) => {
  return request<SendCodeRes>({
    url: "/account/sendCode",
    method: "POST",
    data: params
  });
}

export interface UpdateUserInfoDto {

}

export const updateUserInfo = (params: UpdateUserInfoDto) => {
  return request<{}>({
    url: "/account/updateUserInfo",
    method: "POST",
    data: params
  });
}

export interface InitPasswordDto {

}

export interface InitPasswordRes {
  status: boolean;
}

export const initPassword = (params: InitPasswordDto) => {
  return request<InitPasswordRes>({
    url: "/account/initPassword",
    method: "POST",
    data: params
  });
}

export interface UpdatePasswordDto {
  password: string;
  newPassword: string;
}

export interface UpdatePwdRes {
  status: boolean;
}

export const updatePassword = (params: UpdatePasswordDto) => {
  return request<UpdatePwdRes>({
    url: "/account/updatePassword",
    method: "POST",
    data: params
  });
}