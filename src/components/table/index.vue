<template>
  <div>
    <h1>table</h1>
    <el-table
      ref="dynamicTable"
      :data="data"
      border
      style="width: 95%;margin:0 auto"
      :row-style="selectedHighlight"
      @row-click="rowClick"
      @selection-change="selectionChange"
      @keydown.13="keyEvent"
    >
      <!-- 前置操作框 -->
      <el-table-column v-if="radio" fixed label="选择" width="60px" class="cell">
        <template scope="scope">
          <el-radio v-model="radioVal" :label="scope.$index">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column  v-if="selection" label="选择" type="selection" width="60px" class="cell"></el-table-column>
      <!-- 列 -->
      <el-table-column style="color:red" show-overflow-tooltip v-for="(formHeadItem, index) in formHead" :label="formHeadItem.label" :key="index">
        <!-- <template scope="scope">{{scope.row[formHeadItem.prop]}}</template> -->
        <!-- 输入控制 -->
        <template slot-scope="scope">
          <template v-if="scope.$index===(data.length-1) ? editArr.includes(formHeadItem.prop) : false">
            <el-input ref="ginput" :key="index" v-model="scope.row[formHeadItem.prop]" @keydown.native.13="downChang" @blur="scope.row[formHeadItem.prop] = isInput(scope.row[formHeadItem.prop], formHeadItem.prop, RegObj, 1)" class="edit-input" size="small" />
          </template>
          <span v-else-if="formHeadItem.prop === 'zip'" style="color:red; font-weight: bold">{{ scope.row[formHeadItem.prop] }}</span>
          <span v-else>{{ scope.row[formHeadItem.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="handleArr.length" label="操作">
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
          <el-button
            v-for="(handleName, index) in _handleArr"
            @click.stop="dynamicHandle(scope.row, handleName)"
            type="text"
            size="medium"
            :key ="index"
          >{{handleName}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
console.log('thia')
console.log(this)
// const defaultFormHead = [
//   { prop: "name", label: "姓名" },
//   { prop: "date", label: "日期" },
//   { prop: "province", label: "省份" },
//   { prop: "city", label: "市区" },
//   { prop: "address", label: "地址" },
//   { prop: "zip", label: "邮编" }
// ];
let flag = 0
export default {
  data() {
    return {
      radioVal: "",
    };
  },
  props: {
    data: Array,
    RegObj:  Object,
    formHead: { type: Array, default: _ => [] },
    radio: { type: Boolean, default: false },
    selection: { type: Boolean, default: false },
    editArr: { type: Array, default: _ => [] },
    handleArr: { type: Array, default: _ => [] }
  },
  methods: {
    downChang(val){
    //  enter键事件核心代码
    if(flag<1){
      if(!this.$refs.ginput[0].value){return}
      flag++;this.$refs.ginput[1].focus()
     }else{
      let status = this.$refs.newAddRef.$listeners.click()
     if(status){

        this.$nextTick(_=>{
      this.$refs.ginput[0].focus()
         })
       flag = 0
        }
      }
    },
    selectedHighlight({row, rowIndex}){
      if(row.zip === 999){
      return {
     "background-color": "rgb(250, 195, 100)"
          }
      }else{
        return {
          "background-color": "lightBlue"
        }
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
      Object.keys(row).forEach(ele => newRow[ele] = '' )
            if (row.name && row.zip) {
        // this.$refs.dynamicTable.data.push(params);
        this.data.push(newRow);
        return true
      }else{
        return false
      }
      this.$emit("newRow", row, newRow);
      // 此新增行,row-click可触发
    },
    dynamicHandle(row, handleName){
     console.log('row---handleName')
     console.log(row, handleName)
     this.$emit("dynamicEvent", row, handleName);
    },
    deleteRow(scope) {
      this.data.splice(scope.$index, 1);
      this.$emit("deleteRow");
    },
    selectionChange(val){
      // console.log('val')
      // console.log(val)
       this.$emit("multipleSelection", val);
    },
    keyEvent(v){
     console.log('v')
     console.log(v)
    },
        // 表单过滤输入(输入值, 正则, 匹配后输入与否)
    isInput(val, prop, RegObj={}, flag) {
      if(!RegObj[prop]){RegObj[prop] = /.*/} // 设置默认验证
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
    // 拿到scope
    get(scope) {
    }
  },
  components: {},
  created() {},
  mounted() {},
  computed: {
    _handleArr(){
      return this.handleArr.filter(ele => !['查看','新增','删除'].includes(ele))
    }
  }
};
</script>
<style scoped>
</style>