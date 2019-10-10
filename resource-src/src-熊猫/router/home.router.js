
export default {
  path: "/home",
  name: "home",
  component: () => import(/** webpackChunkname: 'index*/ "@/views/Home.vue"),
  children: [
    {
      // path:'/news', //path最左侧的斜杠永远代表根路径,不对
      path: "news",
      name: "news",
      component: () => import("@/views/News.vue")
    },
    {
      path: "message", //简化写法
      name: "message",
      component: () => import("@/views/Message.vue"),
      children: [
        {
          path: "detail/:id", // 用: 站位,变量使数据可变
          name: "detail",
          component: () => import("@/views/MessageDetail.vue")
        }
      ]
    },
    {
      path: "",
      redirect: "/home/news" //默认指向
    }
  ]
};
