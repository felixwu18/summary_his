<template>
  <div style="text-align: center;padding-bottom: 3em">
    <div>
      <h1>异步组件测试</h1>点击按钮后
      第一个延迟300毫秒，从服务器加载
      第二个不延迟从服务器加载
      <template v-if="show">
        <later></later>
        <later2></later2>
      </template>
      <button @click="toggle">加载</button>
    </div>

    <div style="padding-top: 3em">
      <h1>高阶异步组件</h1>
    </div>
    <!-- 单项按钮 -->
    <div style="padding: 3em 0">
      <h1>表单radio group</h1>
      <el-radio-group v-model="radioVal" size="medium" @change="trigger(radioVal)">
        <!-- <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>-->
        <!-- 改良成动态 dynamic -->
        <!-- <el-radio-button v-for="(label, index) in labelArr" :label="label" :key="index"> -->
        <el-radio-button v-for="(label, index) in labelArr" :label="index" :key="index">{{label}}</el-radio-button>
      </el-radio-group>
    </div>
    <!-- 单选按钮radio与table测试 -->
    <el-collapse
      v-model="activeNames[index]"
      v-for="(item, index) in tableDatas"
      class="colapse"
      :key="index"
      :name="index"
      @change="collapseChange"
    >
      <el-collapse-item :title="item[0].name">
        <el-select v-model="item[0].name" placeholder="请选择活动区域" clearable>
          <el-option label="供货商1" value="供货商1"></el-option>
          <el-option label="供货商2" value="供货商2"></el-option>
        </el-select>

        <!-- <div style="padding-top: 3em" v-for="(item, index) in tableDatas" :key="index"> -->
        <!-- <h1>{{item[0].name}}</h1> -->
        <!-- <el-table :key="key" :data="tableData" border style="width: 80%;margin:0 auto"> -->
        <el-table
          ref="dynamicTable"
          :key="key"
          :data="item"
          border
          style="width: 80%;margin:0 auto"
        >
          <el-table-column fixed label="选择" width="60px" class="cell">
            <template scope="scope">
              <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120" />>
          <!-- <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
                  <el-table-column prop="province" label="省份" width="120"></el-table-column>
                  <el-table-column prop="city" label="市区" width="120"></el-table-column>
                  <el-table-column prop="address" label="地址" width="300"></el-table-column>
          <el-table-column prop="zip" label="邮编" width="120"></el-table-column>-->
          <!-- 改良动态表头 -->
          <el-table-column v-for="(item, index) in formHead" :label="item.value" :key="index">
            <template scope="scope">{{scope.row[item.key]}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
              <el-button @click="$message.success('别急,还在开发...')" type="text" size="medium">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>

    <!-- </div> -->
    <!-- 失败消息封装 -->
    <div style="padding-top: 3em">
      <h1>
        error
        <el-button @click="$utils.showError('测试错误')">点击</el-button>
      </h1>
    </div>

    <div style="padding-top: 3em">
      <h1>
        提示消息回调
        <el-button @click="ConfirmCallback">输入确定</el-button>
        <el-button @click="fetchList">发送请求</el-button>
      </h1>
    </div>
  </div>
</template>
<script>
/**
 * 一个优雅的实现前端模块化、并能按权重的优先级顺序异步加载的实现方案 --- vue的异步组件
 * 将页面核心功能（音、视频播放、文章、商品等等）打包成一个核心模块，通过框架优先加载。
 * 其他的一些周边功能打包后，通过服务器异步加载，从而解决业务需求越来越多导致的系统难维护、访问慢问题。
 */
import Vue from "vue";
// 服务器异步组件1：
const later = Vue.component("later", function(resolve) {
  setTimeout(function() {
    require(["./later.vue"], resolve);
  }, 3000);
});
// 服务器异步组件2：
const later2 = Vue.component("later2", function(resolve) {
  require(["./later2.vue"], resolve);
});
// const AsyncComponent = () => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: import('./later.vue'),
//   // 异步组件加载时使用的组件
//   loading: LoadingComponent,
//   // 加载失败时使用的组件
//   error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 200,
//   // 如果提供了超时时间且组件加载也超时了，
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 3000
// })

// const defaultFormHead = ['日期','省份','市区','地址','邮编']
/**
 * 一旦后端 按key-value 对象数组传值, 渲染table就会很简单
 */
const defaultFormHead = [
  { key: "date", value: "日期" },
  { key: "province", value: "省份" },
  { key: "city", value: "市区" },
  { key: "address", value: "地址" },
  { key: "zip", value: "邮编" }
];
const tableData = [
  {
    date: "2016-05-02",
    name: "王小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200332
  },
  {
    date: "2016-05-04",
    name: "王小虎",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1517 弄",
    zip: 200333
  }
];
const tableData2 = [
  {
    date: "2016-05-02",
    name: "飞云无名",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200332
  },
  {
    date: "2016-05-04",
    name: "无极而生",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1517 弄",
    zip: 200333
  }
];

export default {
  data() {
    return {
      activeNames: [],
      key: 1, // table key
      labelArr: ["上海", "北京", "广州", "深圳", "成都"], // radio-group 数据
      formHead: defaultFormHead, // default header
      radio: "",
      radioVal: "",
      show: false,
      tableDatas: [tableData, tableData2]
      // tableData: [
      //   {
      //     date: "2016-05-02",
      //     name: "王小虎",
      //     province: "上海",
      //     city: "普陀区",
      //     address: "上海市普陀区金沙江路 1518 弄",
      //     zip: 200332
      //   },
      //   {
      //     date: "2016-05-04",
      //     name: "王小虎",
      //     province: "上海",
      //     city: "普陀区",
      //     address: "上海市普陀区金沙江路 1517 弄",
      //     zip: 200333
      //   },
      //   {
      //     date: "2016-05-01",
      //     name: "王小虎",
      //     province: "上海",
      //     city: "普陀区",
      //     address: "上海市普陀区金沙江路 1519 弄",
      //     zip: 200334
      //   }
      // ]
    };
  },
  methods: {
    collapseChange(val) {
      console.log(val);
    },
    // 实际当中,已经做了封装
    fetchAvatar() {
      return new Promise(
        (resolve, reject) => {
          setTimeout(() => {
            // resolve("https://avatars3.githubusercontent.com/u/16317354?s=88&v=4");
            reject(
              "https://avatars3.githubusercontent.com/u/16317354?s=88&v=4"
            );
          }, 2000);
        },
        err => {
          reject("wrong");
        }
      );
    },
    async fetchList() {
      const result = await this.fetchAvatar().catch(err => console.error(err));
      console.log("result");
      console.log(result);
    },
    handleClick(row) {
      console.log("row");
      console.log(row);
    },
    toggle() {
      this.show = !this.show;
    },
    trigger(label) {
      console.log("change-val", label);
    },
    ConfirmCallback() {
      this.$prompt("请输入内容：", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(({ value }) => {
          // code...
        })
        .catch(() => {
          this.$message({
            type: "info",
            showClose: true,
            message: "已取消操作"
          });
        });
    }
  },
  watch: {
    // 有change事件就可不用监听数据
    // radioVal(val){
    //  console.log('watch-val',val)
    // }
  },
  components: {
    later,
    later2
  },
  created() {},
  mounted() {
    this.tableDatas = []
   this.$refs.dynamicTable.forEach((ele => {
     this.tableDatas.push(ele['data'])
   }));
   this.tableDatas
  },
  computed: {}
};
</script>
<style>
.colapse {
  width: 50%;
  margin: 0 auto;
}
.cell {
  text-align: center;
}
.el-radio__label {
  display: none;
}
</style>