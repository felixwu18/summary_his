<template>
  <div id="app">
    <h1>表单验证</h1>
    <div style="width: 50%; margin: 0 auto">
      <el-form :model="search" :rules="rules" ref="ruleForm">
        <el-form-item label="活动名称" prop="name" ref="nameItem">
          <el-input v-model="search.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="search.region" clearable placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择器2" prop="selectVal">
          <!-- <searchLayout title="选择器2" :width="350"> -->
          <setGetEnable
            @change="getObj"
            :insertValue.sync="search.selectVal"
            :configure="configue_level"
          />
          <!-- </searchLayout> -->
        </el-form-item>
                      <el-form-item label="日期" prop="date1">
                        <el-date-picker 
                          type="date"
                          placeholder="选择日期"
                          v-model="search.date1"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>        
            <!-- <el-form-item label="活动时间" required>
                    <el-col :span="11">
                      <el-form-item prop="date1">
                        <el-date-picker
                          type="date"
                          placeholder="选择日期"
                          v-model="search.date1"
                          style="width: 100%;"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                      <el-form-item prop="date2">
                        <el-time-picker placeholder="选择时间" v-model="search.date2" style="width: 100%;"></el-time-picker>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="即时配送" prop="delivery">
                    <el-switch v-model="search.delivery"></el-switch>
                  </el-form-item>
                  <el-form-item label="活动性质" prop="type">
                    <el-checkbox-group v-model="search.type">
                      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                      <el-checkbox label="地推活动" name="type"></el-checkbox>
                      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="特殊资源" prop="resource">
                    <el-radio-group v-model="search.resource">
                      <el-radio label="线上品牌商赞助"></el-radio>
                      <el-radio label="线下场地免费"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="活动形式" prop="desc">
                    <el-input type="textarea" v-model="search.desc"></el-input>
        </el-form-item>-->
      </el-form>
      <div style="text-align: left; width: 660px; margin-top: 2em">
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="clearValidate('nameItem')">移除表单项校验结果(活动名称)</el-button>
        <el-button @click="validateField('ruleForm')">局部字段验证</el-button>
      </div>
    </div>
    <!-- 自定义验证 -->
    <define-validate />
    <!-- 封装成验证组件 -->

  </div>
</template>

<script>
import defineValidate from "./defineValidate";
import setGetEnable from "@/components/searchSelect/setGetEnable";
import searchLayout from "@/components/layout/searchLayout";
const configue_level = [
  { key: 1, value: "一级城市" },
  { key: 2, value: "二级城市" },
  { key: 3, value: "三级城市" }
];

export default {
  components: { defineValidate, setGetEnable, searchLayout },
  data() {
    return {
      // 将要验证结果search的一组值给:model,
      search: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        // 测试已封组件
        selectVal: ""
      },
      selectVal: "",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        selectVal: [
          { required: true, message: "选择器2必选", trigger: "change" }
        ],
        date1: [
          {
            required: true,
            type: "date",
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
      },
      configue_level
    };
  },
  methods: {
    // formName 为标识表单的ref值
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    clearValidate(formName) {
      // 传入待移除的表单项的 prop , 不传则移除整个表单的校验结果
      this.$refs[formName].clearValidate();
    },
    validateField(formName) {
      // formName 接受整体表单, validateField 传参要局部触发验证的表单项(prop)
      this.$refs[formName].validateField("name");
    },
    getObj(val) {
      console.log("va---l");
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
#app /deep/ .el-form-item__content {
  // display: none
  text-align: left;
}
#app /deep/ .el-form-item__content {
  display: flex;
}
#app /deep/ .el-input {
  width: 100%;
}
#app /deep/ .el-select {
  width: 100%;
}
#app /deep/ .el-form-item {
  width: 250px;
  margin-right: 15px;
  flex-shrink: 0;
}
#app /deep/ .el-form {
  display: flex;
  flex-wrap: nowrap; // 出现横向滚动条(overflow配合)
  // flex-wrap: wrap; // 出现纵向滚动条(overflow配合)
  height: 80px;
  // width: 100%;
  overflow: auto;
}
</style>
