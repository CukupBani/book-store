import CatalogueView from '@/views/Catalogue/CatalogueView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalogue',
      component: CatalogueView,
    },
  ],
})

export default router
