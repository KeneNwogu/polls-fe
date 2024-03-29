import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthorizeView from '../views/AuthorizeView.vue'
import PollView from '@/views/PollView.vue'
import VotePollView from '@/views/VotePollView.vue'
import TestChatView from "@/views/TestChatView.vue"
import FCMTestView from '@/views/FCMTestView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/authorize',
    name: 'authorize',
    component: AuthorizeView
  },
  {
    path: '/polls',
    name: 'polls',
    component: PollView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/polls/:id',
    name: 'vote',
    component: VotePollView
  },
  {
    path: '/chat',
    name: 'Chat',
    component: TestChatView
  },
  {
    path: "/notif",
    name: 'notif',
    component: FCMTestView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const protectedRoutes = ['polls']

router.beforeEach((to, from, next) => {
    if (protectedRoutes.includes(to.name) && !store.state.access_token){
        next("/");
    } else{
        next();
    }
})

export default router
