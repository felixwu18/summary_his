<template>
    <div>
    <h1>输入框、选择框等</h1>
        <searchInput :title='title' :width='width'>
            <el-select @change='changeSelect' v-model='value' :clearable="clearable" :disabled="disabled" placeholder="请选择" size='medium'>
                <!-- <el-option v-for="(item,key) in configure_obj?configure_obj[config_name]:{}" :key="key" :label="item" :value="key">
                </el-option> -->
                <el-option v-for="(item,index) in configure.length ? configure:[]" :key="index" :label="item.label" :value="item.prop">
                </el-option>
            </el-select>
        </searchInput>
    </div>
</template>
<script>
import searchInput from './searchInput';
export default {
    name: 'searchSelect',
    data() {
        return {
            value: '',
            // configure_obj: {},
            // configure: null,
        }
    },
    // props: { title: [String], config_name: [String], insertValue: [String, Number], width: [String, Number], clearable: [Boolean, String] },
    props: { title: [String], configure: [Array], insertValue: [String, Number], width: [String, Number], clearable: [Boolean, String], disabled:[Boolean] },
    components: {
        searchInput
    },
    methods: {
        obtainSelect() {
            // console.log('searchSelect obtainSelect')
            // this.$store.dispatch("fetchConfigure", { needs: this.config_name }).then(data => {
            //     this.configure_obj = this.$store.state.admin.configure_obj;
            //     this.loadingOptions = false;
            // }).catch(() => {});
        },
        changeSelect(val) {
            // console.log('changeSelect',val)
            // this.$emit('changeParam', val, this.config_name);
            this.$emit(`update:insertValue`, val);
        },
        refresh(){
            // if (this.configure_obj[this.config_name]) {
            //     this.value = this.configure_obj[this.config_name][this.value];
            // }
        }
    },
    computed: {
        // value(){
        //  this.insertValue
        //  // return 6666 // 检测传入值,渲染子组件
        // }
    },
    watch: {
        // parentValue: function(newValue, oldValue) {
        //     // console.log('watch parentValue change');
        //     this.value = newValue;
        //     this.refresh();
        // },
        // configure_obj: {
        //     handler: function() {
        //         // console.log('watch configure_obj change',this.configure_obj, this.value);
        //         this.refresh();
        //     },
        //     deep: true
        // },
        insertValue(){
            this.value = this.insertValue
        }

    },
    created() {
        // this.obtainSelect()
        // console.log(this.config_name,this.parentValue);
    },
    activated() {
        console.log('searchSelect activated');
        // this.obtainSelect()
    }
}
</script>
<style scoped>
</style>