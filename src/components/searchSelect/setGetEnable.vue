<template>
  <el-select
    filterable
    :filter-method="selectFilterVal"
    v-model="value"
    clearable
    :disabled="disabled"
    placeholder="请选择"
    size="medium"
  >
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item[itemValue]"
      :value="item[itemKey]"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  name: "searchSelect",
  data() {
    return {
      itemKey: "",
      itemValue: "",
      options: this.configure ? this.configure : [] // 初始化
    };
  },
  props: {
    configure: { type: Array, default: _ => [] },
    insertValue: { type: Number, default: null },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    selectFilterVal(val) {
      if (val.trim()) {
        //val存在
        const fieldsArr = Object.keys(this.configure[0]); // 暂时按key,value字段过滤

        this.options = this.$utils.filterObjArray(
          this.configure,
          val,
          fieldsArr
        );
        // debugger
      } else {
        //val为空时，还原数组
        this.options = this.configure;
      }
      console.log('val---this.options')
      console.log(val)
      console.log(this.options)
    }
  },
  computed: {
    value: {
      get() {
        return this.insertValue;
      },
      set(key) {
        const value = this.$utils.confugureFormatter(this.configure, key);
        // this.$emit(`change`, { key, value }); // 传编码及值
        this.$emit(`change`, { [this.itemKey]: key, [this.itemValue]: value }); // 传编码及值
        this.$emit("update:insertValue", key); // 编码
      }
    }
  },
  created() {
    // 属性动态化
    if (this.configure.length) {
      this.itemKey = Object.keys(this.configure[0])[0];
      this.itemValue = Object.keys(this.configure[1])[1];
    }
  }
};
</script>
<style scoped>
</style>