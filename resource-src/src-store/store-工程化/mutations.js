/*
 包含多个由action触发直接去更新状态的方法的对象
 // [方法名](state,param){}
*/
import {
  INCREMENT,
  DECREMENT,
  INCREMENTIFODD,
  INCREMENTASYNC
} from './mutation-types'

export default{
  [INCREMENT] (state) {
    state.count++
  },
  [DECREMENT] (state) {
    state.count--
  },
  [INCREMENTIFODD] (state) {
      state.count++
  },
  [INCREMENTASYNC] (state) {
    state.count++
  }
}
