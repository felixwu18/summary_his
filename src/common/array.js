export function checkArray(key) {
   console.log('key')
   console.log(key)
   // 权限数组
   const arr = ['1','2','3','4','5']  // 模拟
//    const index = arr.indexOf(key) index > -1
   if(arr.includes(key)) {
      return true
      // 有这个权限
   } else {
      return false
   }
}