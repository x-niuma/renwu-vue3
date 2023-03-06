import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/home/index.vue'
import FindView from '@/views/find/index.vue'
import MeView from '@/views/me/index.vue'
import MissView from '@/views/miss/index.vue'

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
      path: "/:pathMatch(.*)*",
      name: 'miss',
      component: MissView
    }
  ]
})

export default router
