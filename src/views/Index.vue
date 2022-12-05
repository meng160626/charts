<template>
    <main>
        <ul class="list">
            <li class="list-item">
                <div class="list-item-bg">
                    <percent-gauge-vue></percent-gauge-vue>
                    <span></span>
                    <span></span>
                </div>
            </li>
        </ul>
    </main>
</template>

<script setup lang='ts'>
import PercentGaugeVue from '@/components/charts/PercentGauge.vue';

</script>

<style scoped lang="scss">
main {
    background: linear-gradient(35deg, #131824, #18222e, #131824);
    padding: 40px;
    box-sizing: border-box;
}

@keyframes border {
    0% {
        transform: rotate(0deg) translateX(-50%);
    }
    100% {
        transform: rotate(360deg) translateX(-50%);
    }
}
.list {
    list-style: none;
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    margin: 0;
    height: 100%;
    padding: 0;
    column-gap: 60px;

    .list-item {
        overflow: hidden;
        position: relative;
        padding: 1px;

        &::before {
            display: block;
            content: '';
            background: #FFF;
            width: 150px;
            height: 500px;
            position: absolute;
            animation: border 3s infinite;
            transform-origin: 50% 100%;
            left: 50%;
            bottom: 50%;
        }
        &::after {
            display: block;
            content: '';
            background: #FFF;
            width: 150px;
            height: 500px;
            position: absolute;
            animation: border 3s infinite;
            transform-origin: 50% 0%;
            left: 50%;
            top: 50%;
        }
        .list-item-bg {
            height: 100%;
            position: relative;
            z-index: 2;
            background: linear-gradient(35deg, #131824, #18222e, #131824);
        }
    }
}
</style>