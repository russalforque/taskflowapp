import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import HomeView from '@/views/HomeView.vue'
import TodoListView from '@/views/TodoListView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: TodoListView,
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
