<template>
  <div class="validateContainer">
    <el-form
      :model="_validateFields"
      :rules="_rules"
      :ref="refValue"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <!-- <el-form-item label="活动名称" prop="name">
                <slot name="input" />
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
                <slot name="select" />       
      </el-form-item>-->
      <!-- <el-form-item v-for="(val,key) in validateFields" :key="key" :label="$slots.[key][0].data.attrs.title" prop="name"> -->
      <el-form-item
        v-for="(val,key) in _validateFields"
        :key="key"
        :label="$slots[key][0].data.attrs.title"
        :prop="key"
      >
        <slot :name="key" />
      </el-form-item>
    </el-form>
    <slot />
    <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> -->
  </div>
</template>
<script>
// const rulesConfigure = {
//   required: true,
//   message: "请输入活动名称",
//   trigger: "blur",
//   validator: this.checkFunc
// };
export default {
  props: {
    validateFields: { type: Object, default: _ => {} },
    checkAdd: { type: Array, default: _ => [] }
    //     _options: { type: Array, default: _ => [] }
  },
  data() {
    return {
      refValue: '',
      checkFuncObj: {},
      // 将要验证结果validateFields的一组值给:model,
      //       validateFields: {
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
      //       rulesConfigure: {
      //         required: true,
      //         message: "请输入活动名称",
      //         trigger: "blur",
      //         validator: this.checkFunc,
      //         type: "date"
      //       },
      rules: {
        //         name: [
        //           { required: true, message: "请输入活动名称", trigger: "blur" },
        //           { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        //         ],
        // region: [
        //   { required: true, message: "请选择活动区域", trigger: "blur" }
        // ],
        // selectVal: [
        //   { required: true, message: "选择器2必选", trigger: "change" }
        // ],
        //   date1: [
        //     {
        //       type: "date",
        //       required: true,
        //       message: "请选择日期",
        //       trigger: "change"
        //     }
        //   ],
        //   date2: [
        //     {
        //       type: "date",
        //       required: true,
        //       message: "请选择时间",
        //       trigger: "change"
        //     }
        //   ],
        //   type: [
        //     {
        //       type: "array",
        //       required: true,
        //       message: "请至少选择一个活动性质",
        //       trigger: "change"
        //     }
        //   ],
        //   resource: [
        //     { required: true, message: "请选择活动资源", trigger: "change" }
        //   ],
        //   desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    validate(formName) {
      // this.$emit("validate", this.$slots.name[0].data.attrs.title);
      // 取在父级里标签上ref值(同步当前组件ref)
      formName = this._vnode.parent.data.ref
      var flag = false;
      this.$refs[formName].validate(valid => {
        // this.$emit("validate", valid);
        valid ? (flag = valid) : console.log("error submit!!");
        // if (valid) {
        //   //           this.$emit('validate', valid)
        //   //           alert("submit!");
        // } else {
        //   console.log("error submit!!");
        //   // return false;
        // }
      });
      return flag;
    },
    // 触发验证函数
    checkFunc(rule, value, callback) {
      // var    params
      // console.log("rule, value, callback");
      // console.log(rule);
      // this.$validate()
      // 这里可多考虑, 做改动抽象
      //       {
      //         label: "活动名称",
      //         value,
      //         rules: ["notnull", "length"],
      //         conditions: ["2", "10"]
      //       }
      // lebel : this.$slots[prop][0].data.attrs.title
      //       this.checkFuncObj.label = this.$slots[prop][0].data.attrs.title
      // console.log('this.checkFuncObj[rule.field]')
      // console.log(this.checkFuncObj[rule.field])
      // 将传入配置的部分封装到此, rule.field--字段名
      this.checkFuncObj[rule.field].value = value;
      this.checkFuncObj[rule.field].label = this.$slots[
        rule.field
      ][0].data.attrs.title;
      const check = this.$validate(this.checkFuncObj[rule.field]);
      //       let { check } = this.$validate({
      //         label: "活动名称",
      //         value,
      //         rules: ["notnull", "length"],
      //         conditions: ["2", "10"]
      //       });
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
    // 类型检测(如对象: 'Object')
    isType(value = null) {
      if (!value) return false;
      return value.constructor.name;
    }
  },
  components: {},
  created() {
    // 自定义添加策略addStrategy([对象]])
    const addStrategy = this.$validate();
    // const checkAdd = [{
    //   type: "_length",
    //   func: obj => {
    //     if (!obj.value) return true;
    //     return (
    //       obj.conditions[0] <= obj.value.length &&
    //       obj.value.length <= obj.conditions[1]
    //     );
    //   },
    //   falseMessage: "名称椒盐的长度在 2 到 10 个字符"
    // }];
    // addStrategy(this.checkAdd);
    addStrategy(this.checkAdd);
  },
  mounted() {
    // 与组件外标签保持一致ref
    console.log('index2=====creatd')
    console.log(this.quanjuzhuru)

    this.refValue = this._vnode.parent.data.ref
  },
  computed: {
    // 筛选需要验证字段(避免报错)
    _validateFields() {
      if (!this.validateFields) {
        return;
      }
      const obj = {};
      Object.keys(this.validateFields).forEach(key => {
        if (this.$slots[key]) {
          obj[key] = this.validateFields[key];
        }
      });
      return obj || {};
    },
    // 重组验证规则
    _rules() {
      //       var obj = {
      //         name: [
      //           { required: true, message: "请输入活动名称", trigger: "blur" },
      //           { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
      //         ]
      //       };
      //       _validateFields(obj)
      Object.keys(this._validateFields).forEach(prop => {
        //prop--字段 , this._validateFields[prop] -- 字段值
        //    验证规则数组
        const options = this.$slots[prop][0].data.attrs.options;
        //1,组装验证对象 checkObj
        //        (1) element组件定义,是否必须
        const checkObj = {
          required: false,
          message: `${this.$slots[prop][0].data.attrs.title}必填`,
          trigger: "change"
        };
        //          (2) element组件定义, 输入是否合规则
        const hadCheckDefine = {
          // min: 3,
          // max: 5,
          // message: "长度在 3 到 5 个字符",
          trigger: "blur"
        };
        //          (3) 自定义输入是否合规则 (扩展重点部分)
        // 字段给一个自定义函数的验证参数对象(含rules属性)
        options ? (this.checkFuncObj[prop] = options.find(ele => this.isType(ele) === "Object" && ele['rules'])) : "";
        const afterInputCheck = { validator: this.checkFunc, trigger: "blur" };
        // 根据输入修改默认
        options && options.includes("required") ? (checkObj.required = true) : "";
        options && options.includes("blur") ? (checkObj.trigger = "blur") : "";
        //  2, 按需组合验证数组,itemValidArr(分情况选择添加数组)
        var itemValidArr = [];
        // 2-1 框架已有实现, 加入数组
        checkObj.required ? itemValidArr.push(checkObj) : '' //是否必须
        const _case = ['date', 'email', ['min', 'max']]
        // 不含rules的对象
        var tempObj = {}
        options ? tempObj = options.find( ele => this.isType(ele) === "Object" && !ele['rules'] ) : ""
        //循环检验
        _case.forEach(ele => {
          if(!options){return}
          const isStringType = this.isType(ele) === 'String' && options.includes(ele);
          const isObjType = tempObj && this.isType(ele) === 'Array';
          const tempKeys = tempObj ? Object.keys(tempObj) : [] //对象keys
          var cashe = {}
          if( isStringType ) { // 字符串
             ele === 'date' ? cashe = {type: "date", required: true, message: "请选择日期", trigger: "change"} : '';
             ele === 'email' ? cashe = {type: "email", message: '请输入正确的邮箱地址', trigger: ["blur","change"]} : '';
          } else if( isObjType ) { // 不含rules的对象
            // 值范围
             tempKeys.includes(ele[0]) && tempKeys.includes(ele[1]) ? cashe = { min: tempObj['min'], max: tempObj['max'], message: `长度在 ${tempObj['min']} 到 ${tempObj['max']} 个字符`} : ''
          }
          // 将装配好的校验对象合并
          const hadDefine = Object.assign({...hadCheckDefine}, {...cashe})
          if(Object.keys(cashe).length) { // 满足条件再加验证对象
            itemValidArr.push(hadDefine)
          }
        })
        // 2-2 含rules的对象(自定义验证)传入,即装配上自定义函数的验证对象
        if (this.checkFuncObj[prop]) {
          itemValidArr.push(afterInputCheck);
        }
        //  3, 单条字段验证对象封装(加上验证字段名)),item
        var item = {}
        itemValidArr.length ? item = {[prop]: itemValidArr} : ''
        //  4, 合并字段验证对象(利用引用,改变this.rules)
        Object.assign(this.rules, item);
      });
      console.log('this.rules')
      console.log(this.rules)
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