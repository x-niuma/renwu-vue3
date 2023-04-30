import { request } from "@/utils/request";

export const queryUserWalletAccount = (params: {}) => {
  return request<QueryWalletAccountVO>({
    url: "/api/wallet/queryUserWalletAccount",
    method: "POST",
    data: params
  });
}

export const queryUserWalletFlow = (params: {}) => {
  return request<QueryWalletFlowVO>({
    url: "/api/wallet/queryUserWalletFlow",
    method: "POST",
    data: params
  });
}

export const queryUserWalletBank = (params: {}) => {
  return request<QueryUserWalletBankVO>({
    url: "/api/wallet/queryUserWalletBank",
    method: "POST",
    data: params
  });
}

export const doBindWalletBank = (params: DoBindWalletBankDTO) => {
  return request<{}>({
    url: "/api/wallet/doBindWalletBank",
    method: "POST",
    data: params
  });
}

export const doRemoveWalletBank = (params: {}) => {
  return request<{}>({
    url: "/api/wallet/doRemoveWalletBank",
    method: "POST",
    data: params
  });
}

export const setWalletPassword = (params: {}) => {
  return request<{}>({
    url: "/api/wallet/setWalletPassword",
    method: "POST",
    data: params
  });
}

export const doWalletWithdraw = (params: {}) => {
  return request<{}>({
    url: "/api/wallet/doWalletWithdraw",
    method: "POST",
    data: params
  });
}

export const doWalletRecharge = (params: DoWalletRechargeDTO) => {
  return request<{}>({
    url: "/api/wallet/doWalletRecharge",
    method: "POST",
    data: params
  });
}

export const walletRechargeNotify = (params: {}) => {
  return request<{}>({
    url: "/api/wallet/walletRechargeNotify",
    method: "POST",
    data: params
  });
}