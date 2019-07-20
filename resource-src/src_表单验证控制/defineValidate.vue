<template>
  <div>
    <h1 style="padding-top: 2em">自定义表单验证</h1>
    <div style="width: 50%; margin: 0 auto">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="name" ref="nameItem">
          <el-input v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select
            v-model="ruleForm.region"
            :disabled="isDisable('ruleForm.region', ruleForm.name)"
            clearable
            placeholder="请选择活动区域"
          >
            <el-option label="区域一" value="0"></el-option>
            <el-option label="区域二" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 测试静默阻止不合规内容 -->
        <el-form-item label="只能数字" prop="input">
          <el-input
            v-model="ruleForm.input"
            :disabled="isDisable('ruleForm.input_notNumber', ruleForm.region)"
            @blur="ruleForm.input = isInput(ruleForm.input, numberReg, 1)"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="不能数字" prop="notNumber">
          <el-input
            v-model="ruleForm.notNumber"
            :disabled="isDisable('ruleForm.input_notNumber', ruleForm.region)"
            @blur="ruleForm.notNumber = isInput(ruleForm.notNumber, numberReg, 0)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberReg: /^[0-9]+.?[0-9]*$/,
      ruleForm: {
        name: "",
        region: "",
        input: "",
        notNumber: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" }, // 直接在触发函数里加 notnull
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
          { validator: this.checkName, trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // 验证username不为空且长度在2-10之间
      let checkUsername = this.$validate({
        label: "username",
        value: "admin",
        rules: ["notnull", "length"],
        conditions: ["2", "10"]
      });
      // 验证password由大小写字母+数字组成的6-16位密码
      let checkPassword = this.$validate({
        label: "pawwword",
        value: "lllyh111",
        rules: ["notnull", "password"]
      });
      let validataObj = {
        checkUsername,
        checkPassword
      };
      console.log(validataObj);
    },
    validateField(formName) {
      this.$refs[formName].validateField("name");
    },
    // 检测活动名称
    checkName(rule, value, callback) {
      console.log("rule, value, callback");
      console.log(rule, value, callback);
      let check = this.$validate({
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
    },
    // 表单过滤输入(输入值, 正则, 匹配后输入与否)
    isInput(val, reg, flag) {
      if (!val) {
        return;
      } else if (flag === 0) {
        // 匹配排除
        return val.replace(reg, "");
      } else if (flag === 1) {
        // 匹配输入
        return reg.test(val) ? val : "";
      } else {
        console.log("isInput can not work");
      }
    },
    // 表单禁用逻辑
    isDisable(controlObj, val) {
      switch (controlObj) {
        case undefined:
        case "ruleForm.region":  // 活动区域
          return val ? false : true;
        case "ruleForm.input_notNumber":   // 只能数字, 不能数字
          return !val ? true : val === '1' ? false : true;
        default:
          return;
      }
    }
  }
  //   created(){
  //       console.log(this.$validate)
  //   }
};
</script>

<style>
</style>
