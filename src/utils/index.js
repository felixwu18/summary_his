import { Message, Notification } from "element-ui";
import { log } from "util";
// 失败消息的提示
export function showError(message) {
  Message({
    showClose: true,
    message,
    type: "error",
    duration: 0,
    offset: 260
  });
  // Notification({
  //   showClose: true,
  //   // title: '偏移', //提示头
  //   message,
  //   type: "error",
  //   duration: 0,
  //   offset: 260
  // });
}
export function showSuccess(message) {
  Message({
    showClose: true,
    message,
    type: "success"
  });
}

/**
 * reurn 头字符大小的类型,'String','Object','Array'......
 * 返回false,即undefined,null,false等
 * 类型判断
 *  @return {*} value
 */
export function isType(value = null) {
  if (!value) return false;
  return value.constructor.name;
}

/**
 * 查找索引index
 *  @return {Array,Sting} Obj 查找的对象
 *  @return {Object,Sting,Number} target 查找的值
 *  @return {String,Number} key 对象数组里找对象时 字段
 * 格式: 1. String-String(Number) 2. Array-String(Number) 3. Array-Object
 */
export function getIndex(Obj, target, key) {
  if (!target) return;
  if (isType(Obj) === "Array" && isType(Obj[0]) !== "Object") {
    return Obj.indexOf(target);
  } else if (isType(Obj) === "String" && isType(Obj[0]) !== "Object") {
    return Obj.indexOf(target);
  } else if (isType(Obj) === "Array" && isType(Obj[0]) === "Object") {
    return Obj.findIndex(ele => ele[key] === target[key]);
  }
}

/**
 *  对象数组里删除对象, delete target from obj
 *  @return {ObjArray} Obj 查找的对象
 *  @return {Object,objArray} target 查找的值
 *  @return {String,Number} key 对象数组里找对象时 字段, 唯一标识
 * 依赖: getIndex(Function)
 * 格式: 1. ObjArray-Object 2. objArray-objArray
 */
export function deleteItem(Obj, target, key) {
  if (!target) return;
  if (
    isType(Obj) === "Array" &&
    isType(Obj[0]) === "Object" &&
    isType(target) === "Object"
  ) {
    const index = getIndex(Obj, target, key);
    Obj.splice(index, 1);
  } else if (
    isType(Obj) === "Array" &&
    isType(Obj[0]) === "Object" &&
    isType(target) === "Array" &&
    isType(target[0]) === "Object"
  ) {
    // 遍历待删数组
    target.forEach(item => {
      const index = getIndex(Obj, item, key);
      Obj.splice(index, 1);
    });
  }
}

/**
 * 过滤对象数组
 *  @return {objArray} ObjArr 查找的对象数组
 *  @return {Sting} valInput 输入值
 *  @return {StrArray} keyMap 需要过滤的字段数组
 *  返回包含在字段内的所有对象数组
 */
export function filterObjArray(ObjArr, valInput, keyMap) {
  console.log('valInput')
  console.log(typeof valInput)
  return ObjArr.filter(filterItem(valInput, keyMap));
}
// 字段过滤
function filterItem(valInput, keyMap) {
  return item => {
    for (let i = 0; i < keyMap.length; i++) {
      if (
         String(item[keyMap[i]]).toLowerCase().indexOf(valInput.toLowerCase()) !== -1
      ) {
        return true;
      }
    }
  };
}

// 返回符号和字符串 默认两位小数 四舍五入
export function currency(value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return '';
  currency = currency !== null ? currency : '';
  decimals = decimals !== null ? decimals : 2;
  let stringified = value.toFixed(decimals);
  return currency + stringified
}
