import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/home/index.vue'
import FindView from '@/views/find/index.vue'
import MeView from '@/views/me/index.vue'
import MissView from '@/views/miss/index.vue'
import LoginView from '@/views/login/index.vue'
import UserRankView from '@/views/rank/index.vue'
import ProjectDetail from '@/views/project-detail/index.vue';
import MeUserInfo from '@/views/me/user-info/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/find',
      name: 'find',
      component: FindView
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
      path: "/me/user-info",
      name: 'user-info',
      meta: {
        requireAuth: true
      },
      component: MeUserInfo
    },
    {
      path: '/project-detail',
      name: 'project-detail',
      component: ProjectDetail
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
