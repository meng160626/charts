<template>
    <Teleport to="#app">
        <div :class="{'mask': true, 'hidden': !visible}">
            <div class="dialog-container">
                <header v-if="!props.hiddenHeader">
                    <slot name="header"></slot>
                </header>
                <section :style="`height: calc(100% - ${!props.hiddenHeader ? 140 : 60}px);`">
                    <slot name="section"></slot>
                </section>
                <footer>
                    <slot name="footer"></slot>
                </footer>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang='ts'>
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    hiddenHeader: {
        type: Boolean,
        default: false
    }
});
</script>

<style scoped lang="scss">
@keyframes apear {
    0% {
        transform: scale(.6);
    }
    70% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes cover {
    0% {
    background: rgba($color: #000, $alpha: 0);
    }
    100% {
    background: rgba($color: #000, $alpha: .3);
    }
}
.mask {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    color: #333;
    animation: cover .6s forwards ease-in-out;

    &.hidden {
        display: none;

        .dialog-container {
            display: none;
        }
    }
}
.dialog-container {
    width: 1080px;
    height: 800px;
    animation: apear .6s forwards ease-in-out;
    background: rgba($color: #000, $alpha: .5);
    color: #eee;
    box-shadow: 0 0 3px #eee;
    border-radius: 2px;
    
    header {
        text-align: center;
        height: 80px;
        line-height: 80px;
        position: relative;
        font-size: 38px;
        font-family: PangMenZhengDao;
    }
    section {
        box-sizing: border-box;
        padding: 24px;
    }
    
    footer {
        width: 100%;
        box-sizing: border-box;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 160px;
    }
}
</style>