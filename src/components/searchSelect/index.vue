<template>
  <div>
    <h1>输入框、选择框等</h1>
    <searchInput :title="title" :width="width">
      <el-select
        @change="changeSelect"
        v-model="value"
        clearable
        :disabled="disabled"
        placeholder="请选择"
        size="medium"
      >
        <!-- <el-option v-for="(item,key) in configure_obj?configure_obj[config_name]:{}" :key="key" :label="item" :value="key">
        </el-option>-->
        <el-option
          v-for="(item,index) in configure.length ? configure:[]"
          :key="index"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
    </searchInput>
  </div>
</template>
<script>
import searchInput from "./searchInput";
export default {
  name: "searchSelect",
  data() {
    return {
      // value: '',
      // configure_obj: {},
      // configure: null,
    };
  },
  // props: { title: [String], config_name: [String], insertValue: [String, Number], width: [String, Number], clearable: [Boolean, String] },
  props: {
    title: [String],
    configure: [Array],
    insertValue: [Number, String],
    width: [String, Number],
    clearable: [Boolean, String],
    disabled: [Boolean]
  },
  components: {
    searchInput
  },
  methods: {
    changeSelect(key) {
      const value = this.$utils.confugureFormatter(this.configure, key);
      this.$emit(`change`, { key, value });
      this.$emit(`update:insertValue`, key);
    }
  },
  computed: {
    value() {
      return this.insertValue;
    }
  },
  watch: {
    // insertValue() {
    //   this.value = this.insertValue;
    // }
  },
  created() {},
  activated() {
    console.log("searchSelect activated");
    // this.obtainSelect()
  }
};
</script>
<style scoped>
</style>