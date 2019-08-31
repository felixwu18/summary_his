<template>
    <div class="layout" :style="`${width}px`">
        <div class="orientation">
            <span v-if='title'>{{title}}：</span>
            <slot></slot>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'searchInput',
        props: { title: { type: String }, width: { type: String, default: '295px' } },
        data() { return {} }
    }
</script>


<style scoped>
    .layout {
        margin: 0 10px 10px 0;
        float: left;
        font-size: 14px;
        /* border: 1px solid black; */
    }

    .el-input--suffix {
        width: 220px;
    }

    .el-select {
        width: 220px;
    }

    .el-date-editor--datetimerange {
        width: 220px;
    }

    .orientation {
        width: 300px;
        /* float: right; */
        display: flex;
        /* border: solid */
    }
    .orientation span{
        font-size: 1.1em;
        display: inline-block;
        line-height: 40px;
        width: 50%
    }
</style>