import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/pages/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
  scrollBehavior(to) {
    // In-page anchors are handled by the Lenis smooth-scroll instance.
    if (to.hash)
      return false
    return { top: 0 }
  },
})

export default router
