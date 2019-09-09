<template>
  <div class="validateContainer">
    <el-form :model="_search" :rules="_rules" ref="ruleForm">
      <!-- <el-form-item label="活动名称" prop="name">
                <slot name="input" />
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
                <slot name="select" />       
      </el-form-item>-->
      <!-- <el-form-item v-for="(val,key) in search" :key="key" :label="$slots.[key][0].data.attrs.title" prop="name"> -->
      <el-form-item
        v-for="(val,key) in _search"
        :key="key"
        :label="$slots[key][0].data.attrs.title"
        :prop="key"
      >
        <slot :name="key" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
  </div>
</template>
<script>
// const rulesConfigure = {
//   required: true,
//   message: "请输入活动名称",
//   trigger: "blur",
//   validator: this.checkName
// };
export default {
  props: {
    search: { type: Object, default: _ => {} },
//     _options: { type: Array, default: _ => [] }
  },
  data() {
    return {
      // 将要验证结果search的一组值给:model,
      //       search: {
      //         name: "",
      //         region: "",
      //         date1: "",
      //         date2: "",
      //         delivery: false,
      //         type: [],
      //         resource: "",
      //         desc: "",
      //         // 测试已封组件
      //         selectVal: ""
      //       },
      rulesConfigure: {
        required: true,
        message: "请输入活动名称",
        trigger: "blur",
        validator: this.checkName,
        type: "date",
      },
      rules: {
        //         name: [
        //           { required: true, message: "请输入活动名称", trigger: "blur" },
        //           { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        //         ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ],
        selectVal: [
          { required: true, message: "选择器2必选", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$emit("validate", this.$slots.name[0].data.attrs.title);
      this.$refs[formName].validate(valid => {
        this.$emit("validate", valid);
        if (valid) {
          //           this.$emit('validate', valid)
          //           alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 检测活动名称
    checkName(rule, value, callback) {
      console.log("rule, value, callback");
      console.log(this.$validate.check);
      // this.$validate()
      // debugger
      let { check } = this.$validate({
        label: "活动名称",
        value,
        rules: ["notnull", "length"],
        conditions: ["2", "10"]
      });
      this.isCallback(check, callback);
    },
    // 是否通过callback
    isCallback(check, callback) {
      if (!check.result) {
        return callback(new Error(check.message));
      } else {
        return callback();
      }
    }
  },
  components: {},
  created() {},
  mounted() {},
  computed: {
    _search() {
      console.log("this.search");
      console.log(this.search);
      if (!this.search) {
        return;
      }
      const obj = {};
      Object.keys(this.search).forEach(key => {
        if (this.$slots[key]) {
          obj[key] = this.search[key];
        }
      });
      return obj || {};
    },
    _rules() {
//       var obj = {
//         name: [
//           { required: true, message: "请输入活动名称", trigger: "blur" },
//           { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
//         ]
//       };
      //       _search(obj)
      Object.keys(this._search).forEach(prop => {
        //                value =   _search[prop]
        //prop
        //1,checkObj
        const checkObj = {
          required: false,
          message: `${this.$slots[prop][0].data.attrs.title}必填`,
          trigger: "blur"
        };
        // 根据输入修改默认
        const options = this.$slots[prop][0].data.attrs.options
        options && options.includes("required") ? (checkObj.required = true) : "";
        options && options.includes("change") ? (checkObj.trigger = "change") : "";
        //this.$slots[prop][0].data.attrs._options
        //  2, itemValidArr
        const itemValidArr = [checkObj];
        //  3, item
        const item = {
          [prop]: itemValidArr
        };
        console.log('item')
        console.log(item)
        Object.assign(this.rules, item);
      });
      // 组装验证对象
//       checkObj;
//       // 按需组合验证数组
//       itemValidArr;
//       // 单条验证对象封装
//       item;
//       Object.assign(this.rules, obj);
      return this.rules;
    }
  }
};
</script>
<style lang="less" scoped>
.validateContainer {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.validateContainer /deep/ .el-form-item__content {
  // display: none
  text-align: left;
}
.validateContainer /deep/ .el-form-item__content {
  display: flex;
}
.validateContainer /deep/ .el-input {
  width: 100%;
}
.validateContainer /deep/ .el-select {
  width: 100%;
}
.validateContainer /deep/ .el-form-item {
  width: 250px;
  margin-right: 15px;
  flex-shrink: 0;
}
.validateContainer /deep/ .el-form {
  display: flex;
  flex-wrap: nowrap; // 出现横向滚动条(overflow配合)
  // flex-wrap: wrap; // 出现纵向滚动条(overflow配合)
  height: 80px;
  // width: 100%;
  overflow: auto;
}
</style>