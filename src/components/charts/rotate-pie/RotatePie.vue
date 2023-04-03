<template>
    <div class="pie-container">
        <div class="chart" id="rotatePie" ref="chartRef"></div>
        <div class="outer-ring"></div>
        <div class="inner-ring"></div>
        <div class="count-txt">
            <span class="num"></span>
            <span class="unit">人</span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts";
import { nextTick, onMounted, onUnmounted, ref, unref } from "vue";

/**
 * 获取旋转饼图配置
 * @param data 数据数组
 */
const getRotatePieOption = function(data: Array<{value: number, name: string}>) {
    let option = {
        color: ['#29FFD8','#FFF27A','#FFBE7B','#FF8062','#6A6AFF','#4CA4FF','#2CE3FF'],
        tooltip: {
            trigger: 'item',
            padding: 0,
            borderWidth: 0,
            backgroundColor: 'transparent',
            formatter: function(params: any) {
                return `
                    <div class="tooltip-box number-people">
                        <i class="series-icon" style="--color: white"></i>
                        <span class="name ml-8">${params.name}</span>
                        <span class="value ml-12">${params.value}人</span>
                    </div>
                `
            }
        },
        series: [
            {
                type: 'pie',
                roseType: 'radius',
                radius: ['43%', '68%'],
                label: {
                    formatter: (params: any) => {
                        return (
                            '{name|' + params.name + '}\n{hr|▃▃}\n{value|' +
                            (params.value / count * 100).toFixed(2) + '%}'
                        );
                    },
                    padding: [0 , -50, 0, -50],
                    rich: {
                        name: {
                            fontSize: 12,
                            padding: [5, 0, 0, 0],
                            color: '#FFF',
                            align: 'center'
                        },
                        hr: {
                            color: 'inherit',
                            fontSize: 12,
                            padding: [0 , 45, 0, 45]
                        },
                        value: {
                            fontSize: 18,
                            fontWeight: 'bolder',
                            padding: [5, 0, 0, 0],
                            color: 'inherit',
                            fontFamily: 'YouSheBiaoTiHei,sans-serif',
                            align: 'center'
                        }
                    }
                },
                labelLine: {
                    length2: 80,
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(159,202,255,0.5)'
                    }
                },
                data
            }
        ]
    };
    return option;
}

// 数据总数
const count = 3215;

/**
 * 给饼图添加事件
 */
const initEvent = function() {
    chart.on('mouseover','series', function(obj: any) {
        (document.querySelector('.pie-container .num') as HTMLElement)!.innerText = obj.value;
    });
    chart.on('mouseout', function() {
        (document.querySelector('.pie-container .num') as HTMLElement)!.innerText = count + '';
    });
}

/**
 * 给饼图移除事件
 */
 const removeEvent = function() {
    chart.off('mouseover');
    chart.off('mouseout');
}

const chartRef = ref();
let chart: echarts.ECharts;
onMounted(() => {
    // @ts-ignore
    chart = echarts.init(unref(chartRef));
    chart.setOption(getRotatePieOption([
        { value: 692, name: '水工组' },
        { value: 735, name: '泥工组' },
        { value: 580, name: '钢筋工组' },
        { value: 484, name: '混凝土工组' },
        { value: 124, name: '特殊工种组' },
        { value: 300, name: '电工组' },
        { value: 300, name: '水泥工组' }
    ]));
    (document.querySelector('.pie-container .num') as HTMLElement)!.innerText = count + '';
    initEvent();
});

onUnmounted(() => {
    removeEvent();
    chart.dispose();
});
</script>

<style scoped lang="scss">
@keyframes rotate-animation {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
.pie-container {
    position: relative;
    height: 100%;
    .chart {
        height: 100%;
        z-index: 3;
    }
    .outer-ring {
        background-image: url(../../../assets/images/number-people-outer-ring.png);
        width: 230px;
        height: 230px;
        position: absolute;
        z-index: 1;
        left: calc(50% - 115px);
        top: calc(50% - 114px);
        animation: rotate-animation 15s linear infinite;
    }
    .inner-ring {
        background-image: url(../../../assets/images/number-people-inner-ring.png);
        width: 131px;
        height: 131px;
        position: absolute;
        z-index: 1;
        left: calc(50% - 66px);
        top: calc(50% - 66px);
        animation: rotate-animation 10s linear infinite reverse;
    }
    .count-txt {
        position: absolute;
        color: #66FFFF;
        font-family: 'PangMenZhengDao', sans-serif;
        text-shadow: 0 0 12px rgba(102,255,255,0.6), 0 1px 0 rgba(255,255,255,0.5);
        z-index: 2;
        left: 50%;
        top: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%,-45%);
        .num {
            font-size: 30px;
        }
        .unit {
            font-size: 14px;
        }
    }
}

/* echarts tooltip毛玻璃效果 */
.pie-container :deep(.chart) .tooltip-box {
    display: flex;
    align-items: center;
    padding: 6px;
    background-color: rgba(5, 20, 80, .7);
    backdrop-filter: blur(5px);
    gap: 6px;
    .series-icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: var(--color);
        margin-right: 2px;
    }
    .name {
        color: #FFF;
        font-size: 13px;
    }
    .value {
        color: rgba(255, 255, 255, .8);
        font-size: 13px;
    }
}
</style>