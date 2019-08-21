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
      :label="item[_fields.value]"
      :value="item[_fields.key]"
    ></el-option>
  </el-select>
</template>
<script>
export default {
  name: "searchSelect",
  data() {
    return {
      // itemKey: "",
      // itemValue: "",
      // fieldsProp:
      options: this.configure ? this.configure : [] // 初始化
    };
  },
  props: {
    configure: { type: Array, default: _ => [] },
    // insertValue: { type: String, default: '' },
    fields: { type: Object, default: _ => {} },
    insertValue: [Number,String],
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
      console.log("val---this.options");
      console.log(val);
      console.log(this.options);
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
        this.$emit(`change`, {
          [this._fields.key]: key,
          [this._fields.value]: value
        }); // 传编码及值
        this.$emit("update:insertValue", key); // 编码
      }
    },
    _fields() {
      if (!this.configure || !this.configure.length) {
        return { key: "key", value: "vlaue" };
      } else {
        return this.fields
      }
    }
  },
  created() {
    // 属性动态化
    // if (!this.configure || !this.configure.length) {
    //   this.itemKey = Object.keys(this.configure[0])[0];
    //   this.itemValue = Object.keys(this.configure[1])[1];
    // }
  }
};
</script>
<style scoped>
</style>