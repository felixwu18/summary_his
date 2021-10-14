import { Message, Notification } from "element-ui";
import { log } from "util";
import pinyin from "js-pinyin";
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
export function isType(value) {
  var defaultBack
  String(value) === 'null' && (defaultBack = null)
  return value?.constructor.name??defaultBack;
}

/**
 * 查找索引index
 *  @return {Array,Sting} Obj 查找的对象
 *  @return {Object,Sting,Number} target 查找的值
 *  @return {String,Number} field 对象数组里找对象时 字段
 * 格式: 1. String-String(Number) 2. Array-String(Number) 3. Array-Object
 */
export function getIndex(Obj, target, field) {
  if (!target) return;
  if (isType(Obj) === "Array" && isType(Obj[0]) !== "Object") {
    return Obj.indexOf(target);
  } else if (isType(Obj) === "String" && isType(Obj[0]) !== "Object") {
    return Obj.indexOf(target);
  } else if (isType(Obj) === "Array" && isType(Obj[0]) === "Object") {
    return Obj.findIndex(ele => ele[field] === target[field]);
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
  // console.log("valInput");
  // console.log(typeof valInput);
  // debugger
  return ObjArr.filter(filterItem(valInput, keyMap));
}
// 字段过滤
function filterItem(valInput, keyMap) {
  return item => {
    for (let i = 0; i < keyMap.length; i++) {
      if (
        String(item[keyMap[i]])
          .toLowerCase()
          .indexOf(valInput.toLowerCase()) !== -1
      ) {
        return true;
      }
    }
  };
}

// 返回符号和字符串 默认两位小数 四舍五入
export function currency(value, currency, decimals) {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) return "";
  currency = currency !== null ? currency : "";
  decimals = decimals !== null ? decimals : 2;
  let stringified = value.toFixed(decimals);
  return currency + stringified;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className.trim();
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    // classString += " " + className;
    addClass(element, className);
  } else {
    // classString =
    //   classString.substr(0, nameIndex) +
    //   classString.substr(nameIndex + className.length);
    removeClass(element, className);
  }
  // element.className = classString;
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    const clearArr = cleanArray(ele.className.split(" "));
    // debugger
    ele.className = clearArr.join(" ");
    const replace = clearArr[clearArr.length - 1] === cls ? "" : " "; // 排除中间移除,影响后者
    ele.className = ele.className.replace(reg, replace);
  }
}

/**
 * Dedupes array based on criterion returned from iteratee function
 * Ex: uniqueBy([{id: 1}, {id: 1}, {id: 2}],
 *     val => val.id
 * ) = [{id: 1}, {id: 2}]
 */
 export function uniqueBy(arr, fun) {
   const valHas = {}
  return arr.filter(ele => {
    const val = fun(ele)
    return !(val in valHas) && (valHas[val] = 1);
  })
}


/**
 * 对象数组去重(重复对象,可将指定字段值累加)
 * @param {ObjArr} objArr
 * @param {string} propStr
 */
export function uniqueObjArr(objArr, propStr, addProp) {
  var obj = {};
  return objArr.reduce(function (acc, cur) {
    obj[cur[propStr]]
      ? mergeRefObj(acc, cur, propStr, addProp)
      : (obj[cur[propStr]] = true && acc.push(cur));
    return acc;
  }, []);
}
// 合并指定字段相同对象, 指定字段值累加(暂时写死)
function mergeRefObj(acc, obj, propStr, addProp) {
  //  var temp = acc.find(ele => obj[propStr] === ele[propStr])
  acc.forEach(ele => {
    if (obj[propStr] === ele[propStr]) {
      ele[addProp] = obj[addProp] * 1 + ele[addProp] * 1;
    }
  });
}

/**
 * 对象数组去除对象(根据字段是否有值去除对象)
 * @param {ObjArr} objArr
 * @param {string} propStr
 */
export function removeUnexpectObj(objArr, propStr) {
  const tempArr = [];
  if (!objArr || !objArr.length) {
    return;
  }
  objArr.forEach(ele => {
    if (ele[propStr]) {
      tempArr.push(ele);
    }
  });
  return tempArr;
}

/**
 * 去重数组的' ', undefined, null等
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] || actual[i] === 0) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * 从一个对象拷贝与另一对象同名属性的值
 * @param {Object} fromObj
 * @param {Object} toObj
 */
export function copyPropVal(fromObj, toObj) {
  Object.keys(toObj).forEach(ele => {
    if (ele in fromObj && fromObj[ele]) {
      toObj[ele] = fromObj[ele];
    }
  });
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

// //封装的session存储
// export const session = {
//   get: function(key) {
//     let value = sessionStorage.getItem(key);
//     if (value === null || value === "" || value === "undefined") {
//       value = "";
//     } else {
//       value = JSON.parse(value);
//     }
//     return value;
//   },
//   set: function(key, value) {
//     if (value === undefined) {
//       return;
//     }
//     sessionStorage.setItem(key, JSON.stringify(value));
//   }
// };
// // 封装的localStorage存储
// export const storage = {
//   get: function(key) {
//     let value = localStorage.getItem(key);
//     if (value === null || value === "" || value === "undefined") {
//       value = "";
//     } else {
//       value = JSON.parse(value);
//     }
//     return value;
//   },
//   set: function(key, value) {
//     if (value === undefined) {
//       return;
//     }
//     localStorage.setItem(key, JSON.stringify(value));
//   }
// };

/**
 * 存储对象的封装
 * @param {String} key
 * @param {Array, Object, Number, String} value
 * @param {String} storeName(sessionStorage or localStorage)
 */
export const handleSave = (function () {
  const storeApiName = { sessionStorage, localStorage };
  function get(key, storeName = "sessionStorage") {
    let value = storeApiName[storeName].getItem(key);
    if (value === null || value === "" || value === "undefined") {
      value = "";
    } else {
      value = JSON.parse(value);
    }
    return value;
  }
  function set(key, value, storeName = "sessionStorage") {
    if (value === undefined) {
      return;
    }
    storeApiName[storeName].setItem(key, JSON.stringify(value));
  }
  return {
    get,
    set
  };
})();

export const confugureFormatter = (configure, key) => {
  // key对应code, value对应转换后的值
  if (configure) {
    const matchObj = configure.find(e => e.key === key);
    if (matchObj) {
      return matchObj.value;
    }
  }
}

/* 汉字转拼音码 */
export function getPinyin(str, type = 0, charCase = 0) {
  pinyin.setOptions({ checkPolyphone: false, charCase })
  return type === 0 ? pinyin.getCamelChars(str) : pinyin.getFullChars(str)
}
// npm-check 包升级管理