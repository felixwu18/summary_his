/*
vuex是最核心的管理对象模块store
*/
/*第一步,引入依赖,vue和vuex,以及定义的四个模块*/
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

/*第二步,使用vuex*/
Vue.use(Vuex)

/*第三步,配置vuex*/
export default new Vuex.Store({  //Vuex里有好几个东西可用,这里用的是Store
  //常用的四个配置
  state, //状态对象
  mutations, //包含多个更新state函数的对象
  actions, //包含多个对应事件回调函数的对象
  getters //包含多个getter计算属性函数的对象
})
