<template>
  <el-select
    @change="changeSelect"
    v-model="value"
    clearable
    :disabled="disabled"
    placeholder="请选择"
    size="medium"
  >
    <el-option
      v-for="(item,index) in configure.length ? configure:[]"
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
      //   value: ""
      itemKey: "",
      itemValue: ""
    };
  },
  props: {
    configure: { type: Array, default: _ => [] },
    insertValue: { type: Number, default: null },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    changeSelect(key) {
      //   const value = this.$utils.confugureFormatter(this.configure, key);
      //   this.$emit(`update:insertValue`, key);
      //   this.$emit(`change`, { key, value });
    }
  },
  computed: {
    value: {
      get() {
        return this.insertValue;
      },
      set(val) {
        const value = this.$utils.confugureFormatter(this.configure, key);
        this.$emit(`change`, { key, value }); // 传编码及值
        this.$emit("update:insertValue", val); // 编码
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