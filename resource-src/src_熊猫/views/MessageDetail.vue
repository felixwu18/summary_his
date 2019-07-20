<template lang="html">
  <div class="com_border MessageDetail">
    <h4>MessageDetail组件</h4>

    <p>ID: {{$route.params.id}}</p>
    <ul>
      <li>id: {{messageDetail.id}}</li>
      <li>title: {{messageDetail.title}}</li>
      <li>content: {{messageDetail.content}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messageDetail: {}, //当前组件的消息的状态数据
    }
  },
  mounted () {   //mounted在一个声明周期里只执行一次,只有重新创建一次路由对象,才调用一次mounted
    setTimeout(() => {
      const allMessageDetails = [
        {
          id:1,
          title: 'messages001',
          content:'messages001 content...'
        },
        {
          id:2,
          title: 'messages002',
          content: 'messages002 content...'
        },
        {
          id:4,
          title: 'messages004',
          content: 'messages004 content...'
        },
      ];
      this.allMessageDetails = allMessageDetails; //allMessageDetails为局部变量,现存在组件对象上
      const id = this.$route.params.id*1; //*1解决数字文本转换为number类型 this.$route.params.id在路径里面
      this.messageDetail = allMessageDetails.find(detail => detail.id===id) //查找满足条件的某一个
    },1000)
  },
  //解决 mounted一个生命周期里只调用一次,在此就是只创建了一次路由对象,使得再次点击,无法更新显示ul里的内容
  watch: {  //仅仅改变路由参数的时候,界面要想变化,用watch
    $route: function(value){  //路由路径(param)发生了改变
      const id = value.params.id*1; //*1解决数字文本转换为number类型 this.$route.params.id在路径里面
      this.messageDetail = this.allMessageDetails.find(detail => detail.id===id) //allMessageDetails因为在初始化,mounted调用了一次,所以已经有值(已经初始化产生了数据)
    },
    // watch检测data里的数据
    messageDetail() {
      console.log(this.messageDetail.title); 
      this.MethodRun_On_messageDetail()  // 可以调其他方法
    }
  },
  methods: {
    MethodRun_On_messageDetail(){
      console.log('watchMethodRun');
      
    }
  }
}
</script>

<style lang="less">
.MessageDetail p,
.MessageDetail ul{
  background-color: lightblue;
}
</style>
