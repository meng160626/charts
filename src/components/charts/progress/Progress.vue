<template>
    <div id="progress" ref="chartRef"></div>
</template>

<script setup lang='ts'>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, unref } from "vue";

/**
 * 获取环形进度条配置
 * @param data
 */
 function getProgressOption(data: number) {
    return {
        title: [
            {
                text: '已完成',
                x: 'center',
                top: '55%',
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: '100',
                },
            },
            {
                text: '75%',
                x: 'center',
                y: 'center',
                textStyle: {
                    fontSize: '40',
                    color: '#FFFFFF',
                    foontWeight: '600',
                },
            },
        ],
        polar: {
            radius: ['80%', '86%'],
            center: ['50%', '50%'],
        },
        angleAxis: {
            max: 100,
            show: false,
        },
        radiusAxis: {
            type: 'category',
            show: false,
        },
        series: [
            {
                name: '',
                type: 'bar',
                roundCap: true,
                barWidth: 30,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(66, 66, 66, .3)',
                },
                data: [data],
                coordinateSystem: 'polar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 0,
                                color: '#16CEB9',
                            },
                            {
                                offset: 1,
                                color: '#6648FF',
                            },
                        ]),
                    },
                },
            },
            {
                name: '',
                type: 'pie',
                startAngle: 80,
                radius: ['90%'],
                hoverAnimation: false,
                center: ['50%', '50%'],
                itemStyle: {
                    color: 'rgba(66, 66, 66, .1)',
                    borderWidth: 1,
                    borderColor: '#5269EE',
                },
                data: [100],
            },
            {
                name: '',
                type: 'pie',
                startAngle: 80,
                radius: ['76%'],
                hoverAnimation: false,
                center: ['50%', '50%'],
                itemStyle: {
                    color: 'rgba(66, 66, 66, .1)',
                    borderWidth: 1,
                    borderColor: '#5269EE',
                },
                data: [100],
            },
        ],
    }
}

const chartRef = ref();
let chart: echarts.ECharts;
onMounted(() => {
    // @ts-ignore
    chart = echarts.init(unref(chartRef));
    chart.setOption(getProgressOption(60));
});

onUnmounted(() => {
    chart.dispose();
});
</script>

<style scoped>
#progress {
    height: 100%;
}
</style>