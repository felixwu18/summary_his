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
          @row-click="rowClick"
        >
          <el-table-column fixed label="选择" width="60px" class="cell">
            <template scope="scope">
              <el-radio v-model="radio" :label="scope.$index">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120" />
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
              <el-button @click="handleClick(scope,index)" type="text" size="medium">查看</el-button>
              <el-button @click="addRow(index)" type="text" size="medium">添加</el-button>
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
    <div style="padding-top: 3em">
      <h1>时间设置</h1>
      <el-date-picker
        v-model="timeValue"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
    </div>
    <div style="padding-top: 3em">
      <h1>session存储</h1>
      <el-button @click="save">点击缓存</el-button>
    </div>
    <div style="padding-top: 3em">
      <h1>JSON导出excel</h1>
      <el-input
        v-model="textValue"
        placeholder="请输入对象数组的JSON格式(或对象数组)"
        type="textarea"
        cols="30"
        rows="10"
      ></el-input>
      <el-button :loading="downloadLoading" @click="exportExcel">导出</el-button>
      <!--
         npm i script-loader -D
         npm i file-saver --save
         npm i xlsx --save
         加入src/vendor/Export2Excel.js(./vendor/Export2Excel.js)
      -->
    </div>
    <div style="padding-top: 3em">
      <h1>索引查找</h1>
      <el-button @click="handleIndex">查找索引</el-button>
    </div>
    <div style="padding-top: 3em">
      <h1>对象数组删对象,或对象集合</h1>
      <el-button @click="handleDelete">查找索引</el-button>
    </div>
    <div style="padding-top: 3em">
      <h1>对象数组过滤出对象集合(不同字段)</h1>
      <el-input type="textarea" rows="6" v-model="valInput" />
      <el-button @click="handleFilter">对象数组过滤</el-button>
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
    name: "张三",
    province: "四川",
    city: "成都",
    address: "春熙路",
    zip: 999
  },
  {
    date: "2016-05-04",
    name: "李四",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1517 弄",
    zip: 666
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
      valInput: "", // 输入模糊搜索
      //----导出start-------
      bookType: "xlsx",
      autoWidth: true,
      filename: "excel表名",
      downloadLoading: false,
      textValue: "",
      // ---导出end-------
      timeValue: [], //时间测试
      activeNames: [],
      key: 1, // table key
      labelArr: ["上海", "北京", "广州", "深圳", "成都"], // radio-group 数据
      formHead: defaultFormHead, // default header
      radio: "",
      radioVal: "",
      show: false,
      tableDatas: [tableData, tableData2],
      //封装的session存储
      session: {
        get(key) {
          let value = sessionStorage.getItem(key);
          if (value === null || value === "" || value === "undefined") {
            value = "";
          } else {
            value = JSON.parse(value);
          }
          return value;
        },
        set(key, value) {
          if (value === undefined) {
            return;
          }
          sessionStorage.setItem(key, JSON.stringify(value));
        }
      }
    };
  },
  methods: {
    // ------过滤对象数组start-------

    handleFilter() {
      const objArr = [
        { name: "felix", sex: "female", age: 18 },
        { name: "张三", sex: "female", age: 25 },
        { name: "李四", sex: "male", age: 19 }
      ];
      const lastArr = this.$utils.filterObjArray(objArr, this.valInput, ["name", "sex","age"]);
      console.log('lastArr')
      console.log(lastArr)
    },
    // ------过滤对象数组end---------

    // ------删对象start------------
    // 暂时未考虑深拷贝
    handleDelete() {
      const objArr = [
        { name: "felix", sex: "female" },
        { name: "张三", sex: "female" },
        { name: "李四", sex: "male" }
      ];
      // const target = { name: "felix", sex: "female" };
      const target = [
        { name: "felix", sex: "female" },
        { name: "张三", sex: "female" }
      ];
      console.log("objArr-before");
      console.log(objArr);
      this.$utils.deleteItem(objArr, target, "name");
      console.log("objArr-after");
      console.log(objArr);
    },
    // ------删对象end---------------

    // ------索引start---------------
    handleIndex() {
      var objArr = [{ name: "felix", age: 28 }, { name: "张三", age: "18" }];
      var arr = [1, 2, 3, "f"];
      var str = "q122f9e";
      //  var index = this.$utils.getIndex(objArr, objArr[1],'age')
      var index = this.$utils.getIndex(arr, "f");
      //  var index = this.$utils.getIndex(str, 9)
      console.log("index");
      console.log(index);
    },
    // ------索引end--------------

    // ------导出start------------
    exportExcel() {
      if (!this.textValue.trim()) {
        this.$message.error("请输入......!!!");
        return;
      }
      // 处理输入
      //  const objArr = typeof this.textValue === 'string' ? JSON.parse(this.textValue):this.textValue
      if (
        this.textValue.trim().slice(0, 1) !== "[" ||
        this.textValue.trim().slice(-1, this.textValue.trim().length) !== "]"
      ) {
        this.$message.error("请输入对象数组");
        return;
      }
      let objArr;
      try {
        objArr = eval(this.textValue.trim());
      } catch (error) {
        console.error(error);
      }
      if (
        !Array.isArray(objArr) ||
        this.$utils.isType(objArr[0]) !== "Object"
      ) {
        this.$message.error("请输入对象数组");
        return;
      }
      this.downloadLoading = true;
      import("./vendor/Export2Excel").then(excel => {
        // const tHeader = ['日期', '省份', '姓名'] //导出表头名
        // const filterVal = ['date', 'province', 'name'] //过滤要导出的数据字段
        // const list = this.tableDatas[0]
        const tHeader = Object.keys(objArr[0]);
        const filterVal = Object.keys(objArr[0]);
        const list = objArr;
        const data = this.formatJson(filterVal, list);
        debugger;
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    // 筛选所需(导出部分字段)return [[],[]]
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    //-----------导出end-------------------

    //-----------session封装start----------
    //封装存储
    // getSession(key) {
    //   let value = sessionStorage.getItem(key);
    //   if (value === null || value === "" || value === "undefined") {
    //     value = "";
    //   } else {
    //     value = JSON.parse(value);
    //   }
    //   return value;
    // },
    // setSession(key, value) {
    //   if (value === undefined) {
    //     return;
    //   }
    //   sessionStorage.setItem(key, JSON.stringify(value));
    // },
    //session存储
    save() {
      this.session.get("defaultHead")
        ? console.table(this.session.get("defaultHead"))
        : this.session.set("defaultHead", defaultFormHead);
    },
    //-----------session封装end----------

    addRow(index) {
      const params = {
        address: "",
        city: "",
        date: "",
        name: "",
        province: "",
        zip: ""
      };
      this.$refs.dynamicTable[index].data.push(params);
      // 此新增行,row-click可触发
    },
    rowClick(row) {
      console.log("row");
      console.log(row);
    },
    collapseChange(val) {
      console.log(val);
    },
    // 实际开发当中,已经做了封装
    fetchAvatar() {
      return new Promise(
        (resolve, reject) => {
          setTimeout(() => {
            resolve(
              "https://avatars3.githubusercontent.com/u/16317354?s=88&v=4"
            );
            // reject(
            //   "https://avatars3.githubusercontent.com/u/16317354?s=88&v=4"
            // );
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
    handleClick(row, index) {
      console.log("row-index");
      console.log(row, "---", index);
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
  created() {
    this.timeValue = ["2009-07-01", "2019-07-24"]; //时间组件显示,随后可代码调用
  },
  mounted() {
    this.tableDatas = [];
    this.$refs.dynamicTable.forEach(ele => {
      this.tableDatas.push(ele["data"]);
    });
    this.tableDatas;
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