import Vue from 'vue'
import App from './App.vue'
import router from './router' // 因为是index.js 路径到此即可

import './mock/mockServer'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
