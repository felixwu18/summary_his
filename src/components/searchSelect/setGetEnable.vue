<template>
  <el-tooltip
   :disabled="!isTip || !value"
   effect="dark"
   :content="tip"
   placement="top"
  >
    <el-select
      v-model="value"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="`请选择${placeholder}`"
      :size="size"
      filterable
      :filter-method="selectFilterVal"
      v-bind="$attrs"
      @focus="isFocus = true; configFinal = callbackOriginConfig()"
      @blur="isFocus = false"
    >
      <el-option
        v-for="(item,index) in options"
        :key="index"
        :disabled="subDisabled&&item.key===disabledKey"
        :label="item[_fields.value]"
        :value="item[_fields.key]"
      ></el-option>
    </el-select>
  </el-tooltip>
</template>
<script>
import { config } from 'vue/types/umd';
export default {
  name: "searchSelect",
  inject: {
    configs: {
      default: () => ({})
    }
  },
  data() {
    return {
      tip: '',
      configFinal: [], // 初始化
      isFocus: false
    };
  },
  props: {
    configure: { type: Array, default: _ => [] },
    insertValue: [Number, String, Array],
    clearable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    itemDisabled: { type: Boolean, default: false }, // 静态控制
    disabledKey: { type: Boolean, default: false }, // 动态控制
    fields: { type: Object, default: _ => ({}) }, // 动态属性配置
    isNumber: { type: Boolean, default: true },
    placeholder: { type: String, default: '' },
    isTip: { type: Boolean, default: false },
    size: { type: String, default: 'small' },
    configKey:  { type: String, default: '' }, // 读取顶层配置数据的key
    syncObj: { type: Object, default: _ => ({}) },
  },
  computed: {
    options() {
      if(!this.isFocus && !this.configFinal.length) {
        if(this.configure.length) {
        // 读取父层配置数据
          this.configFinal = this.configure;
        } else {
        // 读取顶层配置数据
          this.configKey && (this.configFinal = this.configs(this.configKey))
        }
      }
      return this.configFinal
    },
    subDisabled() {
      return this.itemDisabled;
    },
    value: {
      get() {
        // 冒泡提示 默认时
        this.hanldeToolTipData();
        return this.insertValue;
      },
      set(key) {
        if (!this.isNumber && typeof key === 'number') {key = String(key)} // 默认字符串
        const value = this.confugureFormatter(this.configure, key); // 编码对应的label
        // this.$emit(`change`, { key, value }); // 传编码及值
        this.$emit(`change`, { [this._fields.key]: key, [this._fields.value]: value }); // 传编码及值
        this.$emit("update:syncObj", { [this._fields.key]: key, [this._fields.value]: value }); // 同步对象
        this.$emit("update:insertValue", key); // 编码
        // 冒泡提示 选择时
        this.hanldeToolTipData(value);
      }
    },
    _fields() {
      if (!this.fields || !Object.keys(this.fields).length) {
        return { key: "key", value: "value" }; // 默认防错处理
      }
      return this.fields;
    }
  },
  methods: {
    // 列表获取配置信息
    confugureFormatter(configure, key) {
      if (configure) {
        // multiple collapse-tags 下拉可多选时
        if(Array.isArray(key)) {
          return configure.filter(e => key.includes(e[this._fields.key])).map((item) => item.value)
        }
        // 下拉单选时
        let matchObj = configure.filter(e => e[this._fields.key] == key);
        if (matchObj[0]) {
          return matchObj[0][this._fields.value];
        }
      }
    },
    // 自定义搜索
    selectFilterVal(val) {
      const configOrigin = this.callbackOriginConfig()
      const configure  = JSON.parse(JSON.stringify(configOrigin));
      if (val.trim()) {
        //val存在
        const fieldsArr = Object.keys(configure[0]); // 暂时按key,value字段过滤
        this.configFinal = this.$utils.filterObjArray(
          configure,
          val,
          fieldsArr
        );
      } else {
        //val为空时，还原数组
        this.configFinal = configure;
      }
    },
    // 返回初始化配置数据
    callbackOriginConfig() {
      return (this.configure.length && this.configure) || (this.configKey && this.configs(this.configKey)) || [];
    },
    // 解决离焦 输入框有值 但无返回结果 失去焦点时配置数据debug
    handleFocus() {
      if(!this.value && this.configure.length) {
        this.options = JSON.parse(JSON.stringify(this.configure))
      }
    },
    // 对下拉组件的内容超长提示
    hanldeToolTipData(label) {
      if(!this.isTip) return;
      if(!label) {
        label = this.confugureFormatter(this.options, this.insertValue); // 编码对应的label
      }
      if(!Array.isArray(label)) {
        this.tip = label
      }
    }
  },
  created() {
  }
};
</script>
<style scoped>
</style>