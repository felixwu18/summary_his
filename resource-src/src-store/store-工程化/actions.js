/*
 包含多个接受组件通知,触发mutaition调用间接更新状态state的方法的对象
  接受通知action第一个参数, 包含commit 方法,还有state属性, 此处用解构,
                第二个参数, 为组件通知传来的data参数( 若用{data}方式传, mutation第二参数接受也是{data} 这样写还没了解到好处在哪)
*/
import {
  INCREMENT,
  DECREMENT,
  INCREMENTIFODD,
  INCREMENTASYNC
} from './mutation-types'

export default {  //里面得有三个跟后台交互的异步action
  //提交对mutation的请求
 increment ({commit}) {
   //提交增加的mutation
   commit(INCREMENT)
 },
 //减少的action
 decrement ({commit}) {
   //提交减少的mutation
   commit(DECREMENT)
 },
 //带条件的action
 incrementIfOdd ({commit,state}) {  //除了有 commit 方法,还有state属性,设计的套路
   if(state.count%2===1){
     // 提交增加的mutation
     commit(INCREMENTIFODD)
   }
 },
 //异步的action
 incrementAsync({commit}) {
    //在action中直接可以执行异步代码
    setTimeout(() => {
        //提交增加的mutation
        commit(INCREMENTASYNC)
      },1000)
  }
}
