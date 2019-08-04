import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'

Vue.use(ElementUI)

new Vue({ //配置对象的属性名用的一般都是一些固定的名称,不能随便修改
  el:'#app',
  // components: {App},
  // template: '<App/>',
  render:h => h(App),
  store //映射配置好之后,所有组建对象都多了一个属性:$store
})
