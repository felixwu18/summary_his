<template>
  <div>
    <h1>table</h1>
    <el-table
      ref="dynamicTable"
      :data="data"
      border
      style="width: 95%;margin:0 auto;"
      :row-style="selectedHighlight"
      :header-cell-style="headerCellStyle"
      :max-height="maxHeight"
      @row-click="rowClick"
      @selection-change="selectionChange"
    >
      <!-- 单选 -->
      <el-table-column v-if="radio" fixed label="选择" width="60px" class="cell">
        <template scope="scope">
          <el-radio v-model="radioVal" :label="scope.$index">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <!-- 多选 -->
      <el-table-column v-if="selection" label="选择" type="selection" width="60px" class="cell"></el-table-column>
      <!-- 列 -->
      <div v-for="(formHeadItem, index) in formHead" :key="index">
        <!-- 单表头 -->
        <el-table-column
          :width="formHeadItem.prop in fieldsWidth ? fieldsWidth[formHeadItem.prop] : ''"
          show-overflow-tooltip
          :label="formHeadItem.label"
          v-if="!formHeadItem.children"
        >
          <!-- <template scope="scope">{{scope.row[formHeadItem.prop]}}</template> -->
          <!-- 输入控制 -->
          <template slot-scope="scope">
            <!-- 输入框 -->
            <template
              v-if="scope.$index===(data.length-1) ? editArr.includes(formHeadItem.prop) : false"
            >
              <!-- 焦点事件的间接拿row -->
              <!-- <el-input
              ref="ginput"
              :key="index"
              v-model="scope.row[formHeadItem.prop]"
              @blur="ele => handleBlur(ele, scope.row)"
              @focus="ele => handleFocus(ele, scope.row)"
              @input="val => handleInput(val, scope.row)"
              class="edit-input"
              size="small"
              />-->
              <el-input
                ref="ginput"
                :key="index"
                v-model="scope.row[formHeadItem.prop]"
                @keydown.native.13="downChang"
                @blur="scope.row[formHeadItem.prop] = isInput(scope.row[formHeadItem.prop], formHeadItem.prop, RegObj, 1)"
                class="edit-input"
                size="small"
              />
            </template>
            <!-- 下拉框 -->
            <template
              v-if="scope.$index!==(data.length-1) ? selectArr.includes(formHeadItem.prop) : false"
            >
              <el-select
                @change="changeSelect"
                ref="refSelect"
                v-model="scope.row[formHeadItem.prop]"
                clearable
                placeholder="请选择"
                size="medium"
              >
                <el-option
                  v-for="(item,index) in Object.keys(configureSet).length ? configureSet[formHeadItem.prop]:[]"
                  :key="index"
                  :label="item.label"
                  :value="item.prop"
                ></el-option>
              </el-select>
            </template>
            <!-- 远程搜索 -->
            <template
              v-else-if="scope.$index===(data.length-1) ? ['city'].includes(formHeadItem.prop) : false"
            >
              <el-autocomplete
                v-model="autoSearchVal"
                ref="autocomplete"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </template>
            <!-- 带状态显示 暂时是死的 -->
            <span
              v-else-if="formHeadItem.prop === 'province'&&scope.$index!==(data.length-1)"
              style="color:red; font-weight: bold"
            >{{ scope.row[formHeadItem.prop] }}</span>
            <!-- 正常显示(经过配置转换) -->
            <!-- <span v-else-if="!editArr.includes(formHeadItem.prop)">{{ scope.row[formHeadItem.prop] }}</span> -->
            <span
              v-else-if="!editArr.includes(formHeadItem.prop)"
            >{{ codeTransform(scope.row[formHeadItem.prop], formHeadItem.prop) }}</span>
          </template>
        </el-table-column>
        <!-- 多表头 -->
        <!-- 一级 -->
        <el-table-column show-overflow-tooltip :label="formHeadItem.label" v-else>
          <!-- 二级 -->
          <el-table-column
            show-overflow-tooltip
            v-for="(sonItem, index) in formHeadItem.children"
            :label="sonItem.label"
            :width="sonItem.prop in fieldsWidth ? fieldsWidth[sonItem.prop] : ''"
            :key="index"
          >
            <!-- 三级 -->
            <el-table-column
              show-overflow-tooltip
              v-for="(grandsonItem, index) in sonItem.children"
              :label="grandsonItem.label"
              :width="grandsonItem.prop in fieldsWidth ? fieldsWidth[grandsonItem.prop] : ''"
              :key="index"
            >
              <!-- 渲染三级标头对应数据 -->
              <template
                slot-scope="scope"
              >{{codeTransform(scope.row[grandsonItem.prop], grandsonItem.prop)}}</template>
            </el-table-column>
            <!-- 渲染二级标头对应数据 -->
            <template slot-scope="scope">{{codeTransform(scope.row[sonItem.prop], sonItem.prop)}}</template>
          </el-table-column>
        </el-table-column>
      </div>
      <el-table-column
        :width="150"
        :fixed="fixed"
        style="width: 300px"
        v-if="handleArr.length"
        label="操作"
      >
        <template slot-scope="scope">
          <!-- <el-button
            v-if="handleArr.includes('查看')"
            @click.stop="handleLook(scope.row)"
            type="text"
            size="medium"
          >查看</el-button>
          <el-button
            v-if="handleArr.includes('新增') && scope.$index === (data.length-1)"
            @click="addRow(scope.row)"
            ref="newAddRef"
            type="text"
            size="medium"
          >新增</el-button>
          <el-button
            v-if="handleArr.includes('删除')"
            @click.stop="deleteRow(scope)"
            type="text"
            size="medium"
          >删除</el-button>-->
          <!-- 动态事件 -->
          <!-- v-if = "!['查看','新增','删除'].includes(handleName)" -->
          <el-button
            v-for="(handleName, index) in _handleArr(scope.row)"
            @click.stop="dynamicHandle(scope.row, handleName)"
            type="text"
            size="medium"
            :key="index"
          >{{handleName}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import searchSelect from "../searchSelect/index";
console.log("thia");
console.log(this);
// const defaultFormHead = [
//   { prop: "name", label: "姓名" },
//   { prop: "date", label: "日期" },
//   { prop: "province", label: "省份" },
//   { prop: "city", label: "市区" },
//   { prop: "address", label: "地址" },
//   { prop: "zip", label: "邮编" }
// ];
// let flag = 0;
export default {
  data() {
    return {
      // 居中头部
      headerCellStyle: {
        "text-align": "center"
      },
      radioVal: "",
      autoSearchVal: "" // 远程搜索输入值
      // selectVal: "" //直接选中数据加入tableData
    };
  },
  props: {
    data: Array,
    RegObj: Object,
    fixed: { type: String, default: "right" },
    maxHeight: { type: Number, default: 1200 },
    fieldsWidth: { type: Object, default: _ => {} },
    formHead: { type: Array, default: _ => [] },
    radio: { type: Boolean, default: false },
    selection: { type: Boolean, default: false },
    editArr: { type: Array, default: _ => [] },
    selectArr: { type: Array, default: _ => [] },
    configureSet: { type: Object, default: _ => {} },
    handleArr: { type: Array, default: _ => [] },
    codeToLabel: { type: Array, default: _ => [] },
    btnConfigure: { type: Object, default: _ => {} }
  },
  methods: {
    // 配置转换
    codeTransform(propVal, prop) {
      // 没有转换
      if (!this.codeToLabel.length) {
        return propVal;
      }
      // 返回不需要转换值
      const temp = [];
      this.codeToLabel.forEach(ele => {
        temp.push(ele[this.getProp(ele, "key")]);
      });
      if (!temp.includes(prop)) {
        return propVal;
      }
      // 转换, prop表头字段
      for (let i = 0; i < this.codeToLabel.length; i++) {
        if (
          this.codeToLabel[i][this.getProp(this.codeToLabel[i], "key")] === prop
        ) {
          // 拿到对象数组对象的prop值 即 表头字段
          return this.confugureFormatter(
            this.codeToLabel[i][this.getProp(this.codeToLabel[i], "value")], // 配置对象数组
            propVal // code
          );
        }
      }
    },
    // 获取动态属性, 不限制于一个对应关系的属性名及值
    getProp(obj, param) {
      if (param === "key") {
        return Object.keys(obj)[0];
      }
      if (param == "value") {
        return Object.keys(obj)[1];
      }
    },
    confugureFormatter(configure, key) {
      // key对应code, value对应转换后的值
      if (configure) {
        let matchObj = configure.filter(e => e.key === key);
        if (matchObj[0]) {
          return matchObj[0].value;
        }
      }
    },
    // 远程搜索
    querySearchAsync(val) {
      this.$refs.autocomplete;
      console.log("val");
      console.log(val);
    },
    // 搜索选择
    handleSelect() {
      console.log("selct");
      // console.log()
    },
    // 实时输入监控
    handleInput(inputVal, row) {
      console.log("evetn-row-input");
      console.log(inputVal, Object.assign({}, row), row.zip); // 实时传输独立的row对象
      row.city = inputVal;
    },
    // 失焦事件
    handleBlur(event, row) {
      console.log("evetn-row-blur");
      console.log(event, row, row.zip);
    },
    // 聚焦事件
    handleFocus(event, row) {
      console.log("evetn-row-focus");
      console.log(event, Object.assign({}, row), row.zip);
    },
    // 选择框
    changeSelect(val) {
      console.log("val");
      console.log(val);
    },
    downChang(event) {
      //  enter键事件核心代码
      // if (flag < 1) {
      //   if (!this.$refs.ginput[0].value) {
      //     return;
      //   }
      //   flag++;
      //   this.$refs.ginput[1].focus();
      // } else {
      //   let status = this.$refs.newAddRef.$listeners.click();
      //   if (status) {
      //     this.$nextTick(_ => {
      //       this.$refs.ginput[0].focus();
      //     });
      //     flag = 0;
      //   }
      // }
      // this.$refs.ginput[0].focused
      if (event.keyCode != 13) {
        return false;
      }
      const index = this.$refs.ginput.findIndex(ele => ele.focused);
      // if (index === this.$refs.ginput.length - 1) {
      //   if (this.checkInput(this.$refs.ginput, [0, this.$refs.length - 1])) {
      //     this.$refs.newAddRef.$listeners.click();
      //     this.$nextTick(_ => {
      //       this.$refs.ginput[0].focus();
      //     });
      //     return // 解决正常移动光标边界位置报错
      //   } else {
      //     this.$message.success("为输入第一和最后一个值!");
      //     return; // 解决正常移动光标边界位置报错
      //   }
      // }
      // 最后验证
      // this.checkEnd(index);
      // 即时验证
      this.checkImmediately(index);
      // this.$refs.ginput[index + 1].focus();
    },
    checkImmediately(index) {
      if (
        [0, this.$refs.ginput.length - 1].includes(index) &&
        !this.$refs.ginput[index].value
      ) {
        this.$message.success("为输入第一和最后一个值!");
        return; // 解决正常移动光标边界位置报错
      }
      if (index === this.$refs.ginput.length - 1) {
        this.$refs.newAddRef.$listeners.click();
        this.$nextTick(_ => {
          this.$refs.ginput[0].focus();
        });
        return;
      }
      this.$refs.ginput[index + 1].focus();
    },
    checkEnd(index) {
      if (index === this.$refs.ginput.length - 1) {
        if (
          this.checkInput(this.$refs.ginput, [0, this.$refs.ginput.length - 1])
        ) {
          this.$refs.newAddRef.$listeners.click();
          this.$nextTick(_ => {
            this.$refs.ginput[0].focus();
          });
          return; // 解决正常移动光标边界位置报错
        } else {
          this.$message.success("为输入第一和最后一个值!");
          return;
        }
      }
      this.$refs.ginput[index + 1].focus();
    },
    // checkArr is checked fields array
    checkInput(objArr, checkArr) {
      const checkFlag = [];
      for (let i = 0; i < checkArr.length; i++) {
        // if (!objArr[checkArr[i]].value) {
        //   return false;
        // } else {
        //   return true;
        // }
        if (objArr[checkArr[i]].value) {
          checkFlag.push(true);
        }
      }
      if (checkFlag.length === checkArr.length) {
        return true;
      }
    },
    selectedHighlight({ row, rowIndex }) {
      if (row.zip === 999) {
        return {
          "background-color": "rgb(250, 195, 100)"
        };
      } else {
        return {
          "background-color": "lightBlue"
        };
      }
    },
    rowClick(row) {
      this.$refs.refSelect;
      this.$refs.ginput;
      // debugger;
      this.$emit("row-click", row);
    },
    handleLook(row) {
      this.$emit("enterDetail", row);
    },
    addRow(row) {
      const newRow = {};
      // 动态添加新行
      Object.keys(row).forEach(ele => (newRow[ele] = ""));
      if (row.name && row.zip) {
        // this.$refs.dynamicTable.data.push(params);
        this.data.push(newRow);
        return true;
      } else {
        return false;
      }
      this.$emit("newRow", row, newRow);
      // 此新增行,row-click可触发
    },
    dynamicHandle(row, handleName) {
      console.log("row---handleName");
      console.log(row, handleName);
      this.$emit("dynamicEvent", row, handleName);
    },
    deleteRow(scope) {
      this.data.splice(scope.$index, 1);
      this.$emit("deleteRow");
    },
    selectionChange(val) {
      // console.log('val')
      // console.log(val)
      this.$emit("multipleSelection", val);
    },
    // 表单过滤输入(输入值, 正则, 匹配后输入与否)
    isInput(val, prop, RegObj = {}, flag) {
      if (!RegObj[prop]) {
        RegObj[prop] = /.*/;
      } // 设置默认验证
      if (!val) {
        return;
      } else if (flag === 0) {
        // 匹配排除
        return val.replace(RegObj[prop], "");
      } else if (flag === 1) {
        // 匹配输入
        return RegObj[prop].test(val) ? val : "";
      } else {
        console.log("isInput can not work");
      }
    },
    _handleArr(row) {
      // 字段的case组合里, 状态不重合
      const dependFieldVal = row[this.btnConfigure.prop];
      const btnShowArr = [];
      this.btnConfigure.btnStates.forEach(ele => {
        if (ele.case.includes(dependFieldVal)) {
          btnShowArr.push(...ele.btnArr);
        }
      });
      return btnShowArr;
    }
  },
  components: {},
  created() {},
  mounted() {
    // 全局禁用tab
    document.onkeydown = function(event) {
      if (event.keyCode === 9) {
        return false;
      }
    };
  },
  computed: {
    // _handleArr() {
    //   // return this.handleArr.filter(
    //   //   ele => !["查看", "新增", "删除"].includes(ele)
    //   // );
    // }
  }
};
</script>
<style scoped>
</style>