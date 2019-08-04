/*
vuex是最核心的管理对象模块store
*/
/*第一步,引入依赖,vue和vuex,再使用*/
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/*第三步,定义vuex配置的对象*/
// 状态对象
const state = {
  //初始化状态
  count: 0
};

// 包含多个更新state函数的对象
const mutations = {
  //增加的mutation
  INCREMENT(state) {
    state.count++;
  },
  //减少的mutation
  DECREMENT(state) {
    state.count--;
  }
};

// 包含多个对应事件回调函数的对象
const actions = {
  //增加的action
  //  increment ({commit}) {
  //    //提交增加的mutation
  //    commit('INCREMENT')
  //  },
  increment: ({ commit }) => commit("INCREMENT"),
  //减少的action
  //  decrement ({commit}) {
  //    //提交减少的mutation
  //    commit('DECREMENT')
  //  },
  decrement: ({ commit }) => commit("DECREMENT"),
  //带条件的action
  //  incrementIfOdd ({commit,state}) {  //除了有commit方法,还有state属性,设计的套路
  //    if(state.count%2===1){
  //      // 提交增加的mutation
  //      commit('INCREMENT')
  //    }
  //  },
  incrementIfOdd: ({ commit, state }) => {
    //除了有commit方法,还有state属性,设计的套路
    if (state.count % 2 === 1) {
      // 提交增加的mutation
      commit("INCREMENT");
    }
  },
  //异步的action
  // incrementAsync({ commit }) {
  //   //在action中直接可以执行异步代码
  //   setTimeout(() => {
  //     //提交增加的mutation
  //     commit("INCREMENT");
  //   }, 1000);
  // }
  incrementAsync: ({ commit }) =>
    setTimeout(() => {
      commit("INCREMENT");
    }, 1000)
};

// 包含多个getter计算属性函数的对象
const getters = {
  // evenOrOdd (state) { //不需要调用,只需要读取属性值
  //   return state.count%2===0 ? '偶数' : '奇数'
  // }
  evenOrOdd: state => (state.count % 2 === 0 ? "偶数" : "奇数")
};

/*第二步,配置vuex*/
export default new Vuex.Store({
  //Vuex里有好几个东西可用,这里用的是Store
  //常用的四个配置
  state, //状态对象
  mutations, //包含多个更新state函数的对象
  actions, //包含多个对应事件回调函数的对象
  getters //包含多个getter计算属性函数的对象
});
