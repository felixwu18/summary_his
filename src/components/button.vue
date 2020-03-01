<script>
export default {
  name: 'button',
  props: {
     type: {
       type: String,
       default: 'normal'
     },
     text: {
       type: String,
       default: 'normal'
     }
  },
  render(h, ctx) {
    console.log(ctx, 1111)
     return h('button',{
           // v-bind class
          class: {
            btn: true,
            'success': this.type === 'success',
            'danger': this.type === 'danger',
            'warning': this.type === 'warning',
            'normal': !this.type
        },
        // dom属性
        domProps: {
          innerText: this.text || '默认',
          
      //           v-on="$listeners"
      // v-bind="$attrs"

        },
        on: {
          click: this.handleClick
        }
      })
  },
  methods: {
    handleClick(){
      this.$emit('myEvent')
    }
  }
};
</script>
<style scoped>
  .btn{
     width: 100px;
     height: 40px;
     color: #ffffff           
  }
  .danger {
    background: red             
  }
  .success {
    background: green
  }
  .warning {
     background: orange             
  }
  .normal {
     background: gray             
  }
</style>