// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import router from './router'
import request from './request/request'
// 懒加载
import axios from 'axios'
import VueAxios from 'vue-axios'
import './mock/mock'
import VueLazyload from 'vue-lazyload'
import VideoPlayer from 'vue-video-player'
Vue.use(VueAxios, axios)

Vue.prototype.$request = request

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueLazyload, {
  
})
// 全局引入视频播放组件
Vue.use(VideoPlayer)
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
