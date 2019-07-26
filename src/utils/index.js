import { Message, Notification } from "element-ui";
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
    target.forEach((item => {
     const index = getIndex(Obj, item, key)
     Obj.splice(index, 1)
    }))
  }
}
