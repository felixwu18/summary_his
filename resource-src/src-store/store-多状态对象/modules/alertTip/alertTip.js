import * as types from "./type";
import{Message} from "element-ui"

const alertTip = {
  state: {
    greeting: "waiting for greeting..."
  },
  mutations: {
    [types.SAYHELLO]: (state, words) => {
        state.greeting = words
        Message.success(state.greeting)
      },
    },
  getters: {
    greeting: (state) => {
      return state.greeting
    },
  },
  actions: {
    sayHello({ commit }, words) {
      //提交增加的mutation
      commit(types.SAYHELLO, words);
    }
  }
};

export default alertTip;
