import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ '../views/Forget.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/forget',
    name: 'forget',
    component: Forget
  }, {
    path: '/reg',
    name: 'reg',
    component: Reg
  }
]

const router = new VueRouter({
  routes
})

export default router
