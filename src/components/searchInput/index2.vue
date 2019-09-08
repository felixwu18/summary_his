<template>
  <div class="validateContainer">
    <el-form :model="_search" :rules="rules" ref="ruleForm">
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
export default {
  props: {
    search: { type: Object, default: _ => {} }
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
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
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