<template>
    <div class="framework" v-if='name' :style="inputType" name='name' size='size' type='type'>
        <slot></slot>
        <p :style="{fontSize:size+'px'}">{{name}}：</p>
    </div>
</template>


<script>
    export default {
        name: 'layoutTop',
        props: ['name', 'size', 'type'],
        data() { return { inputType: { width: this.type ? '373px' : '304px' } } },
        created() { },
    }
</script>

<style scoped>
    .framework {
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .framework p {
        display: inline-block;
        /* float: right; */
    }

    .el-input--suffix {
        width: 220px;
        float: right;
    }

    .el-select {
        width: 220px;
        float: right;
    }

    .el-date-editor--datetimerange {
        width: 290px;
        float: right;
    }
</style>