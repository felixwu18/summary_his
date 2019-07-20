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
      type: "success",
    });
  }
  