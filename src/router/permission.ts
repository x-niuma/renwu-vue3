import router from './index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken, setToken } from '@/utils/auth'
import { useUserStore } from '@/stores/user'

const whiteList = ['/login', '/wexin-login-callback']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  const userStore = useUserStore()

  if (userStore.userInfo) {
    // 已经有用户信息
    next()
    return
  }

  if (!to.meta || !to.meta!.requireAuth) {
    next()
    return
  }

  NProgress.start()

  // 没有 token 肯定没登录
  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
    return
  }

  if (to.path === '/login') {
    // 已经在登录页
    next({ path: '/' })
    NProgress.done()
  } else {
    const nextAction = () => {
      setToken('')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }

    if (!to.meta || !to.meta!.requireAuth) {
      // 不需要登录态
      await userStore.checkLogin()
      next()
      return
    }

    try {
      let res = await userStore.checkLogin()
      if (!res) {
        nextAction()
      } else {
        next()
      }
    } catch (e) {
      nextAction()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
