import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Person from '@/pages/Person'
import Home from '@/pages/Home'
import Order from '@/pages/Order'
import Matter from '@/pages/Matter'
import SpecialTopic from '@/pages/SpecialTopic'
import Studio from '@/pages/Studio'
import Speciallens from '@/pages/SpecialLens'
import News from '@/pages/News'


Vue.use(Router)
Vue.use(Vuex)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        // 个人详情页
        {
          path:'/person',
          name:'person',
          component:Person
        },
        // 接单页
        {
          path: 'order',
          name: 'order',
          component: Order
        },
        // 素材组件
        {
          path: 'matter',
          name: 'matter',
          component: Matter
        },
        // 专题组件
        {
          path: 'SpecialTopic',
          name: 'SpecialTopic',
          component: SpecialTopic
        },
        // 消息组件
        {
          path: 'news',
          name: 'news',
          component: News
        },
        // studio组件
        {
          path:'studio',
          name:'studio',
          component:Studio
        },
        {
          path:'speciallens',
          name:'specialLens',
          component:Speciallens
        }
      ]
    }
  ]
})
