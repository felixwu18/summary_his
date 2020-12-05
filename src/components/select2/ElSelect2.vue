<script>
import { Select } from 'element-ui';

export default {
  name: 'ElSelect2',
  mixins: [Select],
  props: {
    vModelLabel: {
      type: [Array, String],
      default: () => []
    },
    multipleType: {
     type: String,
     default: 'Array'
    },
    size:  {
     type: String,
     default: 'small'
    }              
  },
  watch: {
    value() {
      this.stLabel()
    },
    options() {
      this.setLabel()
    }
  },
  methods: {
    handleQueryChange(val) {
      this.$emit(`queryChange`, val)
    },
    setLabel() {
      if (this.multiple) {
        const result = this.selected.map(item => {
           return item.label
        })
        if (this.multipleType === 'Array') {
          this.$emit('update:vModelLabel', result)
          this.$emit('update:labelChange', this.value)
        } else {
          this.$emit('update:vModelLabel', result.toString())
          this.$emit('update:labelChange', this.value)
        }
      } else {
          const selectObj = this.options.find(item => item.value === this.value)
          this.$emit('update:vModelLabel', selectObj ? selectObj.label : '')
          this.$emit('update:labelChange', this.value)
      }
    }
  }
};
</script>
<style scoped>
</style>