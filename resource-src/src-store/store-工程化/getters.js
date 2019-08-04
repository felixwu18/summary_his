/*
 包含多个基于state的getter计算属性的对象
*/
export default{
  // 包含多个getter计算属性函数的对象
    evenOrOdd (state) { //不需要调用,只需要读取属性值
      return state.count%2===0 ? '偶数' : '奇数'
    }
}
