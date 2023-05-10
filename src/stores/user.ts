import { getToken } from '@/utils/auth'
import { defineStore, acceptHMRUpdate } from 'pinia'
import * as store from 'store'
import * as UserAPI from '@/service/auto-service/账户模块'
import { sleep } from '@/utils/sleep'
import { wexinLoginByAuthCode } from '@/service/auto-service/账户模块'
import type { IUserInfo } from '@/types/IUserInfo'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo: null as IUserInfo | null,
    isLogin: false,
    authFinished: false
  }),

  actions: {
    async logout() {
      store.remove('token')
      this.$patch({
        token: '',
        userInfo: null,
        isLogin: false,
        authFinished: false
      })
    },

    async login(params: PwdLoginDto) {
      const res = await UserAPI.pwdLogin(params)
      if (res.code === '0') {
        const data = res.data
        this.$patch({
          token: data.token,
          userInfo: data
        })
        store.set('token', data.token)
        store.set('userInfo', data)
        return true;
      }
      return false;
    },

    async wexinLoginByAuthCode(params: {}) {
      const res: any = await wexinLoginByAuthCode(params)
      const data = res.data
      this.$patch({
        token: data.token,
        userInfo: data
      })
      store.set('token', data.token)
      store.set('userInfo', data)
      return true
    },

    async checkLogin() {
      const res = await UserAPI.checkLogin({})
      const data = res.data
      await sleep()
      this.$patch({
        isLogin: data.status,
        authFinished: true,
        userInfo: data.user
      })
      return data.status
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
