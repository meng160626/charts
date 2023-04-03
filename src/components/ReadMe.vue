<template>
    <CustomDialog :visible="visible">
        <template #header>
            <span>使用说明</span>
        </template>
        <template #section>
            <div class="has-scroll">
                <span>点击素材标题查看完整代码</span>
                <br />
                <span>更多功能开发中……</span>
            </div>
        </template>
        <template #footer>
            <button class="third-dimension-btn" @click="close">
                <span>关闭</span>
                <span>关闭</span>
            </button>
        </template>
    </CustomDialog>
</template>

<script setup lang='ts'>
import { ref } from "vue";
import CustomDialog from "./CustomDialog.vue";

// 弹框显示
const visible = ref(false);

// 打开
const open = function() {
    visible.value = true;
}

// 关闭
const close = function() {
    visible.value = false;
}

defineExpose({
    open
});

</script>

<style scoped lang="scss">

</style>