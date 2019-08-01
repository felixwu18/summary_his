<template>
    <div class="range">
        <div class="name" :style='{"line-height":height+"px"}'>
            <p>{{name}}：</p>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'C',
        props: { name: { type: String }, width: { type: String }, height: { type: String } },
    }
</script>

<style scoped>
    .range {
        width: 100%;
        margin-top: 10px;
    }

    .name {
        width: 25%;
        display: inline-block;
    }

    .name p {
        text-align: right;
    }

    .el-input {
        width: 70%;
    }

    .el-select {
        width: 70%;
    }

    .range:nth-child(1) {
        margin-top: 0;
    }

    .el-textarea {
        width: 70% !important;
    }
</style>