<template>
    <main class="content-box-container">
        <div class="title-container" @click="onTitleClick">
            <span>{{ title }}</span>
            <div class="light"></div>
        </div>
        <div class="content-container">
            <slot></slot>
        </div>
    </main>
</template>

<script setup lang='ts'>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['title-click']);

// 标题点击事件
const onTitleClick = function() {
    emits('title-click');
}
</script>

<style scoped lang="scss">
.content-box-container {
    height: 100%;
    position: relative;
    z-index: 9;
    width: 458px;
    .title-container {
        background-image: url(../assets/box/content-box-title-bg.png);
        width: 482px;
        height: 109px;
        margin: -34px 0 -25px -44px;
        color: #FFF;
        text-shadow: 0 3px 1px #0f1828;
        padding-left: 120px;
        box-sizing: border-box;
        padding-top: 45px;
        position: relative;
        pointer-events: auto;
        cursor: pointer;
        span {
            font-size: 18px;
            font-weight: 700;
            letter-spacing: .2em;
            font-family: HuXiaoBo-NanShen,sans-serif;
        }
        .light {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            clip-path: polygon(50px 35px,100% 35px,445px 76px,69px 76px,50px 46px);
            mix-blend-mode: soft-light;
            
            /* 流光动画 */
            @keyframes light {
                0% {
                    left: 20px;
                    opacity: .5;
                }

                5% {
                    opacity: 1;
                }

                10% {
                    opacity: .5;
                    left: 100%;
                }

                100% {
                    opacity: .5;
                    left: 100%;
                }
            }
            &::after {
                content: '';
                display: block;
                width: 1.3rem;
                height: 40px;
                position: absolute;
                top: 35px;
                left: 20px;
                background-color: #FFF;
                box-shadow: 0 0 10px #FFF;
                transform: skewX(-45deg);
                animation: light 7s ease-in-out infinite;
            }
        }
    }
    .content-container {
        background-image: url(../assets/box/content-box-bg.png);
        width: 458px;
        height: 272px;
        pointer-events: all;
    }
    & + .content-box-container {
        margin-top: 8px;
    }
}

</style>