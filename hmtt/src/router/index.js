import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('../views/login.vue') },
  {
    path: '/',
    redirect: '/home',
    component: () => import('../views/layout.vue'),

    children: [{
      path: '/home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/qa',
      component: () => import('../views/qa.vue')
    },
    {
      path: '/video',
      component: () => import('../views/video.vue')
    },

    {
      path: '/my',
      component: () => import('../views/my.vue')
    }]
  },
  { path: '/search', component: () => import('../views/search.vue') },
  { path: '/article:id', component: () => import('../views/article.vue'), props: true }
]

const router = new VueRouter({
  routes
})

export default router
