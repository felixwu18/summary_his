<template>
    <div class="btnFix">
        <slot></slot>
    </div>
</template>


<script>
    export default {
        name: 'layoutBtn',
        data() { return {} }
    }
</script>



<style scoped>
    .btnFix {
        width: 100%;
        overflow: hidden;
        padding-bottom: 20px;
    }
</style>