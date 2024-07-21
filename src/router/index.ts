import { createRouter, createWebHistory } from 'vue-router'
import CardView from '../views/CardView.vue'
import HomeView from '../views/HomeView.vue'
import TransactionView from '@/views/TransactionView.vue'
import SettingView from '@/views/SettingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home', breadcrumb: [{ name: 'Home', path: '/' }] }
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardView,
      meta: { title: 'Cards', breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Cards', path: '/cards' }] }
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionView,
      meta: { title: 'Transactions', breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Transactions', path: '/transactions' }] }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingView,
      meta: { title: 'Settings', breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Settings', path: '/settings' }] }
    }
  ]
})

export default router