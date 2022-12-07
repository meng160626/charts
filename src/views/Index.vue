<template>
    <main>
        <ul class="list">
            <li class="list-item" v-for="(chart, idx) in _chartList">
                <div class="list-item-bg">
                    <div class="detail">
                        <span class="chart-name">{{chart.config.name}}</span>
                        <div class="lang-model-box">
                            <span class="ts">ts</span>
                            <span class="js">js</span>
                        </div>
                    </div>
                    <div class="chart-container">
                        <component :is="chart.component" />
                    </div>
                </div>
            </li>
        </ul>
    </main>
</template>

<script setup lang='ts'>
import PercentGaugeVue from '@/components/charts/percent-gauge/PercentGauge.vue';
import { PercentGaugeConfig } from '@/components/charts/percent-gauge/PercentGauge';

// 图表列表
const _chartList = [
    {
        name: PercentGaugeVue.name,
        component: PercentGaugeVue,
        config: PercentGaugeConfig
    },
    {
        name: PercentGaugeVue.name,
        component: PercentGaugeVue,
        config: PercentGaugeConfig
    },
    {
        name: PercentGaugeVue.name,
        component: PercentGaugeVue,
        config: PercentGaugeConfig
    },
    {
        name: PercentGaugeVue.name,
        component: PercentGaugeVue,
        config: PercentGaugeConfig
    },
];

</script>

<style scoped lang="scss">
main {
    background: var(--background);
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
    grid-template: repeat(2, 1fr) / repeat(3, 1fr);
    margin: 0;
    height: 100%;
    padding: 0;
    column-gap: 60px;
    row-gap: 30px;

    .list-item {
        overflow: hidden;
        position: relative;
        padding: 1px;
        filter: brightness(110%);

        &::before {
            display: block;
            content: '';
            background: var(--borderColor);
            width: 150px;
            height: 500px;
            position: absolute;
            transform: rotate(60deg) translateX(-50%);
            transform-origin: 50% 100%;
            left: 50%;
            bottom: 50%;
        }
        &::after {
            display: block;
            content: '';
            background: var(--borderColor);
            width: 150px;
            height: 500px;
            position: absolute;
            transform: rotate(45deg) translateX(-50%);
            transform-origin: 50% 0%;
            left: 50%;
            top: 50%;
        }
        &:hover::before {
            animation: border 3s infinite;
        }
        &:hover::after {
            animation: border 3s infinite;
        }
        .list-item-bg {
            height: 100%;
            position: relative;
            z-index: 2;
            background: var(--cardColor);
            border-radius: 10px;
            .chart-container {
                height: calc(100% - 60px);
                padding: 20px;
                box-sizing: border-box;
                width: 100%;
            }

            .detail {
                height: 60px;
                line-height: 60px;
                box-sizing: border-box;
                padding: 0 16px;
                display: flex;
                border-bottom: 1px solid var(--borderColor);
                font-family: var(--fontFamily);
                justify-content: space-between;

                .chart-name {
                    font-size: 28px;
                    color: var(--titleColor);
                    font-weight: 700;
                    letter-spacing: .2em;
                }

                @mixin lang {
                    display: inline-block;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    background-color: #ddd;
                    font-size: 24px;
                    border-radius: 4px;
                    text-align: center;
                    cursor: pointer;
                }
                .lang-model-box {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }
                .ts {
                    color: #0288d1;
                    @include lang;
                }
                .js {
                    color: #feba07;
                    @include lang;
                }
            }
        }
    }
}
</style>