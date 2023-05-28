import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/home/index.vue'
import FindView from '@/views/find/index.vue'
import MeView from '@/views/me/index.vue'
import MissView from '@/views/miss/index.vue'
import LoginView from '@/views/login/index.vue'
import UserRankView from '@/views/rank/index.vue'
import ProjectDetail from '@/views/project/detail/index.vue';
import ProjectEdit from '@/views/project/edit/index.vue';
import ProjectAdd from '@/views/project/edit/add.vue';
import ProjectTrack from '@/views/me/project-track/index.vue';
import ProjectSearch from '@/views/project/search/index.vue';
import MeUserInfo from '@/views/me/user-info/index.vue';
import WexinLoginCallback from '@/views/wexin-login-callback/index.vue';
import WalletHome from '@/views/wallet/wallet/index.vue'
import WalletBank from '@/views/wallet/bank/index.vue'
import WalletBankBind from '@/views/wallet/bank/bind.vue'
import WalletWithdraw from '@/views/wallet/withdraw/index.vue'
import BindEmail from '@/views/me/bind-email/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/publish',
      name: 'publish',
      component: ProjectAdd
    },
    {
      path: '/me',
      name: 'me',
      component: MeView
    },
    {
      path: '/user-rank',
      name: 'user-rank',
      component: UserRankView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: WalletHome,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/wallet/bank',
      name: 'wallet-bank',
      component: WalletBank
    },
    {
      path: '/wallet/bank/bind',
      name: 'wallet-bank-bind',
      component: WalletBankBind
    },
    {
      path: '/wallet/withdraw',
      name: 'wallet-withdraw',
      component: WalletWithdraw
    },
    {
      path: "/me/user-info",
      name: 'user-info',
      meta: {
        requireAuth: true
      },
      component: MeUserInfo
    },
    {
      path: "/me/bind-email",
      name: 'bind-email',
      meta: {
        requireAuth: true
      },
      component: BindEmail
    },
    {
      path: "/me/bind-mobile",
      name: 'bind-mobile',
      meta: {
        requireAuth: true
      },
      component: () => import('@/views/me/bind-mobile/index.vue')
    },
    {
      path: '/project-detail',
      name: 'project-detail',
      component: ProjectDetail
    },
    {
      path: '/project-track',
      name: 'project-track',
      component: ProjectTrack
    },
    {
      path: '/project-edit',
      name: 'project-edit',
      component: ProjectEdit
    },
    {
      path: '/project-search',
      name: 'project-search',
      component: ProjectSearch
    },
    {
      path: '/wexin-login-callback',
      name: 'wexin-login-callback',
      component: WexinLoginCallback
    },
    {
      path: "/:pathMatch(.*)*",
      name: 'miss',
      component: MissView
    }
  ]
})

// 路由拦截，判断是否需要登录
router.beforeEach((to, from, next) => {
  // 通过 requireAuth 判断当前路由导航是否需要登录
  if (to.matched.some(record => record.meta.requireAuth)) {
    let token = localStorage.getItem('token')
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
