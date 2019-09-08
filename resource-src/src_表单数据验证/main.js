import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

// 验证挂在Vue实例
import validate from './utils'
Vue.prototype.$validate  = validate

Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
