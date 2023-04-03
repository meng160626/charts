import { EChartType, EComponentType } from "@/enum";
import type { TChartConfig } from "env";

export const CylinderBarConfig: TChartConfig = {
    name: '百分比仪表盘',
    js: `/**
 * 获取自适应的Y轴数据
 * @param {*} data 数据源
 * @param {*} valueField 数据源中值的字段名
 */
function getSelfAdaptionYData(data, valueField = 'value') {
    // max => 数组中的最大值    min => 适应的最小值    interval => 间隔    coefficient => 系数
    let max = Number.MIN_VALUE, min = Number.MAX_VALUE, interval = 0, coefficient = 1;
    data.forEach(item => {
        max = item[valueField] > max ? item[valueField] : max;
        min = item[valueField] < min ? item[valueField] : min;
    });
    // 动态计算系数
    if (max < 25) coefficient = 1;
    if (max >= 25 && max < 250) coefficient = 5;
    if (max >= 250 && max < 500) coefficient = 50;
    if (max >= 500 && max < 2500) coefficient = 100;
    if (max >= 2500) coefficient = 500;
    interval = Math.floor(max / 5 / coefficient) * coefficient;
    if (interval == 0) interval = 1;    //修正
    // 计算合适的y轴最大值
    max = Math.floor(max / interval) * interval + interval;
    // 计算合适的y轴最小值
    min = Math.floor(min / interval) * interval - interval;
    return {
        max,        //  y轴最大值
        min,        //  y轴最小值
        interval    //  y轴间隔值
    }
}

/**
* 获取圆柱体柱状图配置
* @param data 
*/
function getBarOption(data) {
    // 根据数据量动态改变柱体宽度（柱子过多时，需要手动调整部分内容高度及y坐标）
    let barWidth = 470 / data.length * 0.7;
    if (barWidth > 66) barWidth = 66;
    // 获取自适应的y轴数据
    let yData = getSelfAdaptionYData(data);
    return option = {
        grid: {             // 直角坐标系内绘图网格
            top: '20%',
            left: '10%',
            right: '3%',
            bottom: '20%',
        },
        xAxis: [
            // 下方轴线用于显示数据类别名称
            {
                offset: 20,         // 位置偏移量
                data: data.map(item => item.name),
                axisTick: {         // 坐标轴刻度
                    show: false,
                },
                axisLine: {         // 坐标轴轴线
                    show: false,
                },
                axisLabel: {        // 坐标轴刻度标签
                    textStyle: {
                        color: '#B8EEFF',
                        fontSize: 16,
                    },
                },
            },
            // 上方轴线用于显示数据值
            {
                data: data.map(item => item.value),
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#43D1FE',
                        fontSize: 16,
                    },
                },
            }
        ],
        yAxis: {
            max: yData.max,
            interval: yData.interval,
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FBFEFF'
                }
            },
        },
        series:[
            // 柱体底座
            {
                stack: 'a',
                type: 'effectScatter',
                symbolSize: [barWidth, 12],
                symbolOffset: [0, 0],
                z: 22,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 1,
                                    color: 'rgba(107, 255, 243,  1)',
                                },
                                {
                                    offset: 0,
                                    color: 'rgba(8, 177, 255, 1)',
                                },
                            ]);
                        },
                    },
                },
                data: data.map(item => {return {value: 0}}),
            },
            // 数据柱状图
            {
                name: '数据柱状图',
                stack: 'a',
                type: 'bar',
                barWidth: barWidth,
                z: 2,
                barGap: '-100%',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: '#187bb8',
                                },
                                {
                                    offset: 0.15,
                                    color: '#1fa4d1',
                                },
                                {
                                    offset: 0.3,
                                    color: '#21b7dc',
                                },
                                {
                                    offset: 0.4,
                                    color: '#22aada',
                                },
                                {
                                    offset: 0.6,
                                    color: '#206ecc',
                                },
                                {
                                    offset: 0.8,
                                    color: '#33addf',
                                },
                                {
                                    offset: 1,
                                    color: '#1a7bc5',
                                },
                            ]);
                        },
                    },
                },
                data,
            },
            // 数据柱状图顶部
            {
                tooltip: {
                    show: false
                },
                stack: 'a',
                type: 'pictorialBar',
                symbolSize: [barWidth, 12],
                symbolOffset: [0, -6],
                z: 22,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(12, 70, 124, 1)',
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(18, 117, 164, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(34, 183, 219, 1)'
                                },
                            ]);
                        },
                    },
                },
                symbolPosition: 'end',
                data,
            },
            // 空柱
            {
                tooltip: {
                    show: false
                },
                stack: 'a',
                type: 'bar',
                barWidth: barWidth,
                barMinHeight: 176,
                z: 2,
                barGap: '-100%',
                // stack: '',
                symbolPosition: 'end',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: 'rgba(8, 177, 255, .4)',
                                },
                                {
                                    offset: 0.3,
                                    color: 'rgba(8, 177, 255, 0)',
                                },
                                {
                                    offset: 0.7,
                                    color: 'rgba(8, 177, 255, 0)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(8, 177, 255, .4)',
                                },
                            ]);
                        },
                    },
                },
                data: data.map(item => {return {value: yData.max}}),
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth - 1, 13],
                symbolOffset: [0, -168],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: yData.max !== 1 ? function (params) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(12, 70, 124, .5)',
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(18, 117, 164, .5)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(34, 183, 219, .5)'
                                },
                            ]);
                        } : "rgba(0,0,0,0)",
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 5 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth / 3 * 2, 8],
                symbolOffset: [0, -170],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 8 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth / 3, 4],
                symbolOffset: [0, -171],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 12 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            }
        ]
    };
}
let data = [
    {
        name: '柱体',
        value: 8000
    },{
        name: '柱体',
        value: 9162
    }
];

function draw(id, option) {
    let chartDom = document.getElementById(id);
    let chart = echarts.init(chartDom);
    option && chart.setOption(option);
}

draw('bar', getBarOption(data));`,
    ts: `import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, unref } from "vue";

/**
 * 获取自适应的Y轴数据
 * @param {*} data 数据源
 * @param {*} valueField 数据源中值的字段名
 */
    function getSelfAdaptionYData(data: Array<{value: number}>) {
    // max => 数组中的最大值    min => 适应的最小值    interval => 间隔    coefficient => 系数
    let max = Number.MIN_VALUE, min = Number.MAX_VALUE, interval = 0, coefficient = 1;
    data.forEach(item => {
        max = item.value > max ? item.value : max;
        min = item.value < min ? item.value : min;
    });
    // 动态计算系数
    if (max < 25) coefficient = 1;
    if (max >= 25 && max < 250) coefficient = 5;
    if (max >= 250 && max < 500) coefficient = 50;
    if (max >= 500 && max < 2500) coefficient = 100;
    if (max >= 2500) coefficient = 500;
    interval = Math.floor(max / 5 / coefficient) * coefficient;
    if (interval == 0) interval = 1;    //修正
    // 计算合适的y轴最大值
    max = Math.floor(max / interval) * interval + interval;
    // 计算合适的y轴最小值
    min = Math.floor(min / interval) * interval - interval;
    return {
        max,        //  y轴最大值
        min,        //  y轴最小值
        interval    //  y轴间隔值
    }
}

/**
 * 获取圆柱体柱状图配置
 * @param data 
 */
function getCylinderBarOption(data: Array<{value: number, name: string}>) {
    // 根据数据量动态改变柱体宽度（柱子过多时，需要手动调整部分内容高度及y坐标）
    let barWidth = 470 / data.length * 0.7;
    if (barWidth > 66) barWidth = 66;
    // 获取自适应的y轴数据
    let yData = getSelfAdaptionYData(data);
    return {
        grid: {             // 直角坐标系内绘图网格
            top: '20%',
            left: '12%',
            right: '3%',
            bottom: '20%',
        },
        xAxis: [
            // 下方轴线用于显示数据类别名称
            {
                offset: 20,         // 位置偏移量
                data: data.map(item => item.name),
                axisTick: {         // 坐标轴刻度
                    show: false,
                },
                axisLine: {         // 坐标轴轴线
                    show: false,
                },
                axisLabel: {        // 坐标轴刻度标签
                    textStyle: {
                        color: '#B8EEFF',
                        fontSize: 16,
                    },
                },
            },
            // 上方轴线用于显示数据值
            {
                data: data.map(item => item.value),
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    textStyle: {
                        color: '#43D1FE',
                        fontSize: 16,
                    },
                },
            }
        ],
        yAxis: {
            max: yData.max,
            interval: yData.interval,
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#FBFEFF'
                }
            },
        },
        series:[
            // 柱体底座
            {
                stack: 'a',
                type: 'effectScatter',
                symbolSize: [barWidth, 12],
                symbolOffset: [0, 0],
                z: 22,
                itemStyle: {
                    normal: {
                        color: function (params: any) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 1,
                                    color: 'rgba(107, 255, 243,  1)',
                                },
                                {
                                    offset: 0,
                                    color: 'rgba(8, 177, 255, 1)',
                                },
                            ]);
                        },
                    },
                },
                data: data.map(item => {return {value: 0}}),
            },
            // 数据柱状图
            {
                name: '数据柱状图',
                stack: 'a',
                type: 'bar',
                barWidth: barWidth,
                z: 2,
                barGap: '-100%',
                itemStyle: {
                    normal: {
                        color: function (params: any) {
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: '#187bb8',
                                },
                                {
                                    offset: 0.15,
                                    color: '#1fa4d1',
                                },
                                {
                                    offset: 0.3,
                                    color: '#21b7dc',
                                },
                                {
                                    offset: 0.4,
                                    color: '#22aada',
                                },
                                {
                                    offset: 0.6,
                                    color: '#206ecc',
                                },
                                {
                                    offset: 0.8,
                                    color: '#33addf',
                                },
                                {
                                    offset: 1,
                                    color: '#1a7bc5',
                                },
                            ]);
                        },
                    },
                },
                data,
            },
            // 数据柱状图顶部
            {
                tooltip: {
                    show: false
                },
                stack: 'a',
                type: 'pictorialBar',
                symbolSize: [barWidth, 12],
                symbolOffset: [0, -6],
                z: 22,
                itemStyle: {
                    normal: {
                        color: function (params: any) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(12, 70, 124, 1)',
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(18, 117, 164, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(34, 183, 219, 1)'
                                },
                            ]);
                        },
                    },
                },
                symbolPosition: 'end',
                data,
            },
            // 空柱
            {
                tooltip: {
                    show: false
                },
                stack: 'a',
                type: 'bar',
                barWidth: barWidth,
                barMinHeight: 176,
                z: 2,
                barGap: '-100%',
                // stack: '',
                symbolPosition: 'end',
                itemStyle: {
                    normal: {
                        color: function (params: any) {
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: 'rgba(8, 177, 255, .4)',
                                },
                                {
                                    offset: 0.3,
                                    color: 'rgba(8, 177, 255, 0)',
                                },
                                {
                                    offset: 0.7,
                                    color: 'rgba(8, 177, 255, 0)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(8, 177, 255, .4)',
                                },
                            ]);
                        },
                    },
                },
                data: data.map(item => {return {value: yData.max}}),
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth - 1, 13],
                symbolOffset: [0, -154],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: yData.max !== 1 ? function (params: any) {
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(12, 70, 124, .5)',
                                },
                                {
                                    offset: 0.5,
                                    color: 'rgba(18, 117, 164, .5)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(34, 183, 219, .5)'
                                },
                            ]);
                        } : "rgba(0,0,0,0)",
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 5 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth / 3 * 2, 8],
                symbolOffset: [0, -156],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 8 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            },
            {
                tooltip: {
                    show: false
                },
                name: '',
                type: 'pictorialBar',
                legendHoverLink: false,
                barCategoryGap: 20,
                symbolSize: [barWidth / 3, 4],
                symbolOffset: [0, -157],
                silent: true, // 图形不响应和触发鼠标事件
                z: 10,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderColor: "#02c3f1",
                        borderWidth: yData.max !== 1 ? 12 : 0
                    }
                },
                data: data.map(item => {return {value: yData.max}})
            }
        ]
    };
}
let data = [
    {
        name: '销售A组',
        value: 8000
    },{
        name: '销售B组',
        value: 9162
    }
];

const chartRef = ref();
let chart: echarts.ECharts;
onMounted(() => {
    // @ts-ignore
    chart = echarts.init(unref(chartRef));
    chart.setOption(getCylinderBarOption(data));
});

onUnmounted(() => {
    chart.dispose();
});`,
    html: '&lt;div id="cylinderBar" ref="chartRef"&gt;&lt;/div&gt;',
    scss: `#cylinderBar {
    height: 100%;
}`,
    componentType: [EComponentType.chart],
    chartType: [EChartType.bar]
}