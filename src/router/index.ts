import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ColorDropper.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'color-dropper',
      component: HomeView
    }
  ]
})

export default router
