/*
路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

 //路由组件
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Message from '../views/Message.vue'
import MessageDetail from '../views/MessageDetail.vue'

//使用路由器模块
Vue.use(VueRouter)

export default new VueRouter({  //VueRouter路由器
  //配置n个路由
  routes:[
    {
      path:'/about',
      component:About //具体的组件
    },
    {
      path:'/home',
      component:Home,
      children: [
        {
          // path:'/news', //path最左侧的斜杠永远代表根路径,不对
          path: '/home/news',
          component:News
        },
        {
          path:'message', //简化写法
          component:Message,
          children: [
            {
              path: '/home/Message/detail/:id',  // 用: 站位,变量使数据可变
              component: MessageDetail
            }
          ]
        },
        {
          path:'',
          redirect: '/home/news' //默认指向
        }
      ]
    },
    {
      path:'/',
      redirect: '/about' //默认指向
    }
  ]
})
