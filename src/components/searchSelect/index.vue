<template>
  <div>
    <!-- <searchInput :title="title" :width="width"> -->
      <el-select
        v-model="value"
        clearable
        :disabled="disabled"
        placeholder="请选择"
        size="medium"
        v-bind="$attrs"
        filterable
      >
        <el-option
          v-for="(item, index) in (options.length ? options : [])"
          :key="index"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
      <!--   :filter-method="selectFilterVal" -->
    <!-- </searchInput> -->
  </div>
</template>
<script>
// import searchInput from "./searchInput";
export default {
  name: "searchSelect",
  data() {
    return {
      // value: '',
      // configure_obj: {},
      i: null,
      options: [],
    };
  },
  // props: { title: [String], config_name: [String], insertValue: [String, Number], width: [String, Number], clearable: [Boolean, String] },
  props: {
    title: [String],
    configure: [Array],
    insertValue: [Number, String],
    width: [String, Number],
    clearable: [Boolean, String],
    disabled: [Boolean],
    isNumber: { type: Boolean, default: false },
  },
  components: {
    // searchInput,
  },
  methods: {
    // changeSelect(key) {
    //   if (typeof key === 'number') {
    //     key = '' + key
    //   }
    //   const value = this.$utils.confugureFormatter(this.configure, key);
    //   this.$emit(`change`, { key, value });
    //   this.$emit(`update:insertValue`, key);
    // },
    /* 自定义搜索 */
    selectFilterVal(val) {
      this.$emit('handleSearch', val)
      // const configure = JSON.parse(JSON.stringify(this.configure));
      // if (val.trim()) {
      //   const fieldsArr = Object.keys(configure[0]);
      //   this.options = this.filterObjArray(
      //     configure,
      //     val,
      //     fieldsArr,
      //     );
      //     // if (this.options) { this.$emit("update:insertValue", ''); } // 编码 
      // } else {
      //   // val 为空时， 还原数组
      //   this.options = JSON.parse(JSON.stringify(configure));
      // }
    },
    filterObjArray(ObjArr, valInput, keyMap) {
      const temp = ObjArr.filter(this.filterItem(valInput, keyMap));
      console.log(temp, 'temp------------');
      return temp
    },
    /* 字段过滤 */
    filterItem(valInput, keyMap) {
      return (item) => {
        for (let i = 0; i < keyMap.length; i++) {
          if (
            String(item[keyMap[i]])
              .toLowerCase()
              .indexOf(valInput.toLowerCase()) !== -1
          ) {
            return true;
          }
        }
        return false;
      };
    },
  },
  computed: {
    value: {
      get() {
        console.log(this.insertValue, 'get--')
        return this.insertValue;
      },
      set(key) {
        !this.isNumber && typeof key === "number" ? (key = String(key)) : ""; // 默认字符串
        // const value = this.$utils.confugureFormatter(this.options, key);
        const selectObj = this.options.find(every => every.key === key)
        const { value, marketT } = selectObj
        this.$emit("update:insertValue", key); // 编码
        this.$emit("change", { key, value, marketT }); // 传编码及值
        console.log(key, 'set--key')
        console.log(this.insertValue, 'set--insertValue')
      },
    },
  },
  watch: {
    // value() {
    //   debugger
    // },
    /* 过滤字段需要重写配置数据 */
    configure: {
      handler() {
        if (this.configure.length) {
          this.options = this.configure;
        }
      },
      deep: true,
    },
    // insertValue() {
      //   this.value = this.insertValue;
    // }
  },
  created() {},
  activated() {
    console.log("searchSelect activated");
    // this.obtainSelect()
  },
};
</script>
<style scoped>
</style>