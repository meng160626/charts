<template>
        <div id="percentGauge" ref="chartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, unref } from "vue";

/**
 * 获取百分比仪表盘配置
 * @param {*} data 数据
 * @param {*} outerColor 外圈颜色
 * @param {*} innerColor 内圈颜色
 * @returns 
 */
function getPercentGaugeOption(data: any, outerColor: string, innerColor: string) {
    return {
        title: {
            text: data + '%',
            x: 'center',
            y: 'center',
            textStyle: {
                fontSize: 48,
                fontFamily: 'PangMenZhengDao',
                color: '#65d3ff',
            },
        },
        series: [
            // 充当边框的仪表盘
            {
                type: 'gauge',          // 仪表盘
                radius: '98%',          // 半径
                startAngle: '90',       // 起始角度（0为3点钟方向 90为12点钟方向）
                endAngle: '-270',
                axisLine: {             // 仪表盘轴线
                    show: true,
                    lineStyle: {
                        color: [
                            [0.01, "rgba(0,0,0,0)"],                // 这里配置0.01 指的是整个轴线0-0.01的线段
                            [(data + 1) / 100, outerColor],             // 这里配置data + 1 指的是整个轴线0-data + 1的线段
                            [(data + 2) / 100, "rgba(0,0,0,0)"],    // ~
                            [1, '#9e9e9e'],                         // ~
                        ],
                        width: 3,                                   // 轴线宽度
                    },
                },
                axisTick: {         // 刻度
                    show: false,
                },
                splitLine: {        // 分割线
                    show: false,
                },
                axisLabel: {        // 刻度标签
                    show: false,
                },
            },
            // 仪表盘
            {
                type: 'gauge',
                radius: '98%',
                clockwise: true,            // 仪表盘刻度是否是顺时针增长
                startAngle: '90',
                endAngle: '-270',
                splitNumber: 10,            // 仪表盘刻度的分割段数
                pointer: {                  // 仪表盘指针
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: [
                            [0.01, "rgba(0,0,0,0)"],
                            [(data + 1) / 100, innerColor],
                            [(data + 2) / 100, "rgba(0,0,0,0)"],
                            [1, 'rgba(158, 158, 158, .2)'],
                        ],
                        width: 15,
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
            },
        ],
    };
}

const chartRef = ref();
let chart: echarts.ECharts;
onMounted(() => {
    // @ts-ignore
    chart = echarts.init(unref(chartRef));
    chart.setOption(getPercentGaugeOption(45, '#2cf0ff', 'rgb(44, 240, 255, .4)'));
});

onUnmounted(() => {
    chart.dispose();
});
</script>

<style scoped lang="scss">
#percentGauge {
    height: 100%;
}
</style>