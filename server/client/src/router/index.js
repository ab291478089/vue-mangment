import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Notfound from '../views/404.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import FoundList from '../views/FoundList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {path: '/', component: Home},
      {path: '/home', component: Home},
      {path: '/infoShow', component: InfoShow},
      {path: '/fundList', component: FoundList},
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '*',
    name: '404',
    component: Notfound
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.eleToken ? true : false;
  if(to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
