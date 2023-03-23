import { request } from "@/utils/request";

export const register = (params: RegisterDto) => {
  return request<RegisterRes>({
    url: "/api/account/register",
    method: "POST",
    data: params
  });
}

export const registerByAccount = (params: RegisterByAccountDto) => {
  return request<RegisterRes>({
    url: "/api/account/registerByAccount",
    method: "POST",
    data: params
  });
}

export const login = (params: LoginDto) => {
  return request<LoginRes>({
    url: "/api/account/login",
    method: "POST",
    data: params
  });
}

export const pwdLogin = (params: PwdLoginDto) => {
  return request<LoginRes>({
    url: "/api/account/pwdLogin",
    method: "POST",
    data: params
  });
}

export const codeLogin = (params: CodeLoginDTO) => {
  return request<LoginRes>({
    url: "/api/account/codeLogin",
    method: "POST",
    data: params
  });
}

export const logout = (params: {}) => {
  return request<{}>({
    url: "/api/account/logout",
    method: "POST",
    data: params
  });
}

export const checkLogin = (params: {}) => {
  return request<CheckLoginRes>({
    url: "/api/account/checkLogin",
    method: "POST",
    data: params
  });
}

export const getUserInfo = (params: {}) => {
  return request<GetUserInfoRes>({
    url: "/api/account/getUserInfo",
    method: "POST",
    data: params
  });
}

export const sendCode = (params: SendCodeDto) => {
  return request<SendCodeRes>({
    url: "/api/account/sendCode",
    method: "POST",
    data: params
  });
}

export const updateUserInfo = (params: UpdateUserInfoDto) => {
  return request<{}>({
    url: "/api/account/updateUserInfo",
    method: "POST",
    data: params
  });
}

export const initPassword = (params: InitPasswordDto) => {
  return request<InitPasswordRes>({
    url: "/api/account/initPassword",
    method: "POST",
    data: params
  });
}

export const updatePassword = (params: UpdatePasswordDto) => {
  return request<UpdatePwdRes>({
    url: "/api/account/updatePassword",
    method: "POST",
    data: params
  });
}

export const queryWxLoginResult = (params: {}) => {
  return request<{}>({
    url: "/api/account/queryWxLoginResult",
    method: "POST",
    data: params
  });
}

export const getWexinAuthUrl = (params: GetWxQrCodeForAuthCodeDTO) => {
  return request<{}>({
    url: "/api/account/getWexinAuthUrl",
    method: "POST",
    data: params
  });
}

export const wexinLoginByAuthCode = (params: {}) => {
  return request<{}>({
    url: "/api/account/wexinLoginByAuthCode",
    method: "POST",
    data: params
  });
}