<template>
  <div>
    <h1>table</h1>
    <el-table
      ref="dynamicTable"
      class="tableClass"
      :data="data"
      border
      :style="{width: `${persent}%`, margin:'0 auto'}"
      :height="_height"
      :row-style="selectedHighlight"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      :max-height="maxHeight"
      @row-click="rowClick"
      @selection-change="selectionChange"
    >
      <!-- 单选设置 -->
      <el-table-column v-if="radio" fixed label="选择" width="60px">
        <template scope="scope">
          <el-radio v-model="radioVal" :label="scope.$index" @change="radioChange">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <!-- 多选设置 -->
      <el-table-column v-if="selection" label="选择" type="selection" width="60px"></el-table-column>
      <!-- 序号 -->
      <el-table-column v-if="index" label="序号" width="60px">
        <template scope="scope">
          <!-- 此处可加svg-icon图标 -->
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <!-- 列 -->
      <template v-for="(formHeadItem, index) in formHead">
        <!-- 单表头 -->
        <el-table-column
          :width="fieldsWidth ? (formHeadItem.prop in fieldsWidth ? fieldsWidth[formHeadItem.prop] : '') : '' "
          show-overflow-tooltip
          :label="formHeadItem.label"
          :key="index"
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
                @input="scope.row[formHeadItem.prop] = isInput(scope.row[formHeadItem.prop], formHeadItem.prop, RegObj, 1)"
                class="edit-input"
                size="small"
              />
            </template>
            <!-- 下拉框 -->
            <template
              v-if="configureSet ? (scope.$index!==(data.length-1) ? selectArr.includes(formHeadItem.prop) : false) : false "
            >
              <!-- filterable and filter-method make select input filter enabled -->
              <el-select
                filterable
                :filter-method="val => selectFilterVal(val,formHeadItem)"
                @change="changeSelect"
                ref="refSelect"
                v-model="scope.row[formHeadItem.prop]"
                clearable
                placeholder="请选择"
                size="medium"
              >
                <el-option
                  v-for="(item,index) in options = Object.keys(configureSet).length ? configureSet[formHeadItem.prop]:[]"
                  :key="index"
                  :label="item.label"
                  :value="item.prop"
                ></el-option>
              </el-select>
            </template>
            <!-- switch开关选择 -->
            <template slot-scope="scope" v-else-if="switchArr.includes(formHeadItem.prop)">
              <el-switch v-model="scope.row[formHeadItem.prop]" @change="val => switchChange(val, scope.row)" active-color="#13ce66" inactive-color="red"></el-switch>
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
            <!-- 
              <el-popover
              placement="top-start"
              title="标题"
              width="200"
              trigger="hover"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
              <span
                v-if="!editArr.includes(formHeadItem.prop)"
              >{{ codeTransform(scope.row[formHeadItem.prop], formHeadItem.prop) }}</span>
            </el-popover>-->
          </template>
        </el-table-column>
        <!-- 多表头 -->
        <!-- 一级 -->
        <el-table-column show-overflow-tooltip :label="formHeadItem.label" :key="index" v-else>
          <!-- 二级 -->
          <el-table-column
            show-overflow-tooltip
            v-for="(sonItem, index) in formHeadItem.children"
            :label="sonItem.label"
            :width="fieldsWidth ? (sonItem.prop in fieldsWidth ? fieldsWidth[sonItem.prop] : '') : '' "
            :key="index"
          >
            <!-- 三级 -->
            <el-table-column
              show-overflow-tooltip
              v-for="(grandsonItem, index) in sonItem.children"
              :label="grandsonItem.label"
              :width="fieldsWidth ? (grandsonItem.prop in fieldsWidth ? fieldsWidth[grandsonItem.prop] : '') : '' "
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
      </template>
      <!-- 操作 -->
      <el-table-column
        :width="handle_width"
        :fixed="fixed"
        style="width: 300px"
        v-if="(btnConfigure ? Object.keys(btnConfigure).length : false) || handleArr.length"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
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
          >删除</el-button>
          <!-- 动态事件 -->
          <!-- v-if = "!['查看','新增','删除'].includes(handleName)" -->
          <template v-for="(handleName, index) in _handleArr(scope.row)">
            <el-button
              v-if="btnConfigure ? Object.keys(btnConfigure).length : false"
              @click.stop="dynamicHandle(scope.row, handleName)"
              type="text"
              size="medium"
              :key="index"
            >{{handleName}}</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 居中头部
      headerCellStyle: {
        "text-align": "center",
        "font-size": "15px"
      },
      cellStyle: {
        "font-size": "14px"
      },
      radioVal: "",
      autoSearchVal: "", // 远程搜索输入值
      options: []
      // selectVal: "" //直接选中数据加入tableData
    };
  },
  props: {
    // temp: {type: Object, default: _ => {} }, // 可动态变化行高
    // pageSize: { type: Number, default: 7 },
    data: Array,
    RegObj: Object,
    fixed: { type: String, default: "right" },
    maxHeight: { type: Number, default: 1200 },
    fieldsWidth: { type: Object, default: _ => {} },
    handle_width: { type: Number, default: 200 },
    formHead: { type: Array, default: _ => [] },
    radio: { type: Boolean, default: false },
    selection: { type: Boolean, default: false },
    index: { type: Boolean, default: false },
    editArr: { type: Array, default: _ => [] },
    switchArr: { type: Array, default: _ => [] },
    selectArr: { type: Array, default: _ => [] },
    configureSet: { type: Object, default: _ => {} }, // selcet配置数据
    handleArr: { type: Array, default: _ => [] },
    codeToLabel: { type: Array, default: _ => [] },
    btnConfigure: { type: Object, default: _ => {} },
    persent: { type: Number, default: 95 },
    // height: { type: Number, default: 500 }
  },
  methods: {
    // 表格中的switch事件处理
    switchChange(val, row){
      console.log("switch-val-row");
      console.log(val);
      console.log(row);
      this.$emit("switchChange", val);
    },
    // 单选事件
    radioChange(val) {
      // val为label值
      console.log("radio-val");
      console.log(val);
      this.$emit("radioSelcet", val);
    },
    // select自定义搜索方法
    selectFilterVal(val, formHeadItem) {
      const field = formHeadItem.prop; // 对应表头筛选
      if (val.trim()) {
        //val存在
        const fieldsArr = Object.keys(this.configureSet[field][0]);
        this.options = this.$utils.filterObjArray(
          this.configureSet[field],
          val,
          fieldsArr
        );
      } else {
        //val为空时，还原数组
        this.options = this.configureSet[field];
      }
      console.log("val-formHeadItem-options");
      console.log(val);
      console.log(formHeadItem);
      console.log(this.options);
    },
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
    querySearchAsync(val, cb) {
      // 1. autocomplete只识别value字段并在下拉框中显示=>对象数组中每个对象必须有value字段
      // 2. 必须将过滤的结果cb回调
      const configue_level = [
        { key: 1, value: "一级城市-大" },
        { key: 2, value: "二级城市-中" },
        { key: 3, value: "三级城市-小" }
      ];
      var result;
      if (val.trim()) {
        //val存在
        result = this.$utils.filterObjArray(configue_level, val, [
          "key",
          "value"
        ]);
      } else {
        //val为空时，还原数组
        result = configue_level;
      }
      console.log("querySearchAsync-val-result");
      console.log(val);
      console.log(result);
      setTimeout(_ => {
        cb(result);
      }, 1000);
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
      if (event.keyCode != 13) {
        return false;
      }
      const index = this.$refs.ginput.findIndex(ele => ele.focused);
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
      var common = {'height':'40px'}
      // 可动态变化行高
      // common = this.temp && Object.keys(this.temp).length ? this.temp : common
      if (row.zip === 999) {
        return {
          "background-color": "rgb(250, 195, 100)",
          ...common
        };
      } else {
        return {
          "background-color": "lightBlue",
          ...common
        };
      }
    },
    rowClick(row) {
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
      if (!this.btnConfigure) {
        return;
      }
      const btnShowArr = [];
      if (this.btnConfigure.prop) {
        // 字段的case组合里, 状态不重合
        const dependFieldVal = row[this.btnConfigure.prop];
        this.btnConfigure.btnStates.forEach(ele => {
          if (ele.case.includes(dependFieldVal)) {
            btnShowArr.push(...ele.btnArr);
          }
        });
      } else {
        btnShowArr.push(...this.btnConfigure.btnStates[0].btnArr);
      }
      return btnShowArr;
    }
  },
  components: {},
  created() {
    const top = 30
    const bottom = 70
    this.heightInnerSet = window.innerHeight - top - bottom // 表格高
    const pageSize = this.heightInnerSet ? Math.floor(this.heightInnerSet / 44) : Math.floor(500 / 44)
    // 表格自适应渲染行数
    this.$emit("update:pageSize",pageSize)
  },
  mounted() {
    // 全局禁用tab
    document.onkeydown = function(event) {
      if (event.keyCode === 9) {
        return false;
      }
    };
  },
  computed: {
    _height(){
      return this.height ? this.height : this.heightInnerSet
    }
    // _handleArr() {
    //   // return this.handleArr.filter(
    //   //   ele => !["查看", "新增", "删除"].includes(ele)
    //   // );
    // }
  }
};
</script>
<style lang="less" scoped>
// radio居中(暂未实现根据状态是否居中)
// .tableClass /deep/ .el-table__row td:nth-child(1) {
//   text-align: center;
// }
// .tableClass /deep/ thead tr:nth-child(1) th:nth-child(1) {
//   border-right: 1.5px solid #ebeef5;
// }
// .tableClass /deep/ .el-radio__label {
//   display: none;
// }
// 通过td th padding来控制表格行高
// .tableClass /deep/  td{
//   // border: none
//   padding: 4px 0 4px
// }
</style>