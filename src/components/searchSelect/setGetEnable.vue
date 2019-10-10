<template>
  <el-select
    filterable
    :filter-method="selectFilterVal"
    v-model="value"
    clearable
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
      test:'test',
      // itemKey: "",
      // itemValue: "",
      // fieldsProp:
      options: this.configure ? this.configure : [] // 初始化
    };
  },
  props: {
    configure: { type: Array, default: _ => [] },
    syncObj: { type: Object, default: _ => {} },
    fields: { type: Object, default: _ => {} }, // 动态属性配置
    insertValue: [Number, String],
    disabled: { type: Boolean, default: false },
  },
  methods: {
    // 自定义搜索
    selectFilterVal(val) {
      if (val.trim()) {
        //val存在
        const fieldsArr = Object.keys(this.configure[0]); // 暂时按key,value字段过滤
        this.options = this.$utils.filterObjArray(
          this.configure,
          val,
          fieldsArr
        );
      } else {
        //val为空时，还原数组
        this.options = this.configure;
      }
    },
    // 列表获取配置信息
    confugureFormatter(configure, key) {
      if (configure) {
        let matchObj = configure.filter(e => e[this._fields.key] == key);
        if (matchObj[0]) {
          return matchObj[0][this._fields.value];
        }
      }
    }
  },
  computed: {
    value: {
      get() {
        return this.insertValue;
      },
      set(key) {
        if (typeof key === 'number') {key = String(key)}
        const value = this.confugureFormatter(this.configure, key);
        // this.$emit(`change`, { key, value }); // 传编码及值
        this.$emit(`change`, {
          [this._fields.key]: key,
          [this._fields.value]: value
        }); // 传编码及值
        this.$emit("update:syncObj", {
          [this._fields.key]: key,
          [this._fields.value]: value
        }); // 同步对象
        this.$emit("update:insertValue", key); // 编码
      }
    },
    _fields() {
      if (!this.fields || !Object.keys(this.fields).length) {
        return { key: "key", value: "value" }; // 默认防错处理
      } else {
        return this.fields;
      }
    }
  },
  created() {
  }
};
</script>
<style scoped>
</style>