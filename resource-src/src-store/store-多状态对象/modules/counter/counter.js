import * as types from "./type";
// 在此引入请求接口 如例 import { supportManList } from 'src/api/public'

const counter = {
  state: {
    count: 0
  },
  mutations: {
    [types.INCREMENT]: (state, configure) => {
        //   state.configure = configure; // 如有数据, 从例 第二参数configure位置获取
      state.count++;
    },
    [types.DECREMENT]: (state) => {
      state.count--;
    },
    [types.INCREMENTIFODD]: (state) => {
      state.count++;
    },
    [types.INCREMENTASYNC]: (state) => {
      state.count++;
    }
  },
  getters: {
    evenOrOdd: state => {
      return state.count % 2 === 0 ? "偶数" : "奇数";
    }
  },
  actions: {
    //提交对mutation的请求
    increment({ commit }) {
      //提交增加的mutation
      commit(types.INCREMENT);
    },
    //减少的action
    decrement({ commit }) {
      //提交减少的mutation
      commit(types.DECREMENT);
    },
    //带条件的action
    incrementIfOdd({ commit, state }) {
      //除了有 commit 方法,还有state属性,设计的套路
      if (state.count % 2 === 1) {
        // 提交增加的mutation
        commit(types.INCREMENTIFODD);
      }
    },
    //异步的action
    incrementAsync({ commit }) {
      //在action中直接可以执行异步代码
      setTimeout(() => {
        //提交增加的mutation
        commit(types.INCREMENTASYNC);
      }, 1000);
    }
    // 供业务代码调用  /*市场支撑人员*/
    // fetchSupportManList({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         supportManList().then(({ data }) => {
    //             commit(types.SET_SUPPORTMANLIST, data);
    //             resolve()
    //         }).catch(() => {
    //             reject()
    //         })
    //     })
    // },
  }
};

export default counter;
