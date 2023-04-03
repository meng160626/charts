import { EComponentType, EChartType } from "@/enum";
import type { TChartConfig } from "env";

export const ThreeDimensionalBarConfig: TChartConfig = {
    name: '水球图',
    js: `/**
* 获取自适应的Y轴数据
* @param {*} data 数据源
* @param {*} valueField 数据源中值的字段名
*/
function getSelfAdaptionYData(data) {
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
* 获取立体柱形图配置
* @param dataList 
*/
const getThreeDimensionalBarOption = function(dataList) {
    // 偏移值 需根据情况自行处理 未做自动化
    const _offset = 7;
    // 绘制左侧面
    const CubeLeft = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx, shape) {
            // 会canvas的应该都能看得懂，shape是从custom传入的
            const xAxisPoint = shape.xAxisPoint
            const c0 = [shape.x + _offset, shape.y]
            const c1 = [shape.x - 18 + _offset, shape.y]
            const c2 = [xAxisPoint[0] - 18 + _offset, xAxisPoint[1]]
            const c3 = [xAxisPoint[0] + _offset, xAxisPoint[1]]
            // @ts-ignore
            ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        }
    })
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c1 = [shape.x + _offset, shape.y]
            const c2 = [xAxisPoint[0] + _offset, xAxisPoint[1]]
            const c3 = [xAxisPoint[0] + 4 + _offset, xAxisPoint[1]]
            const c4 = [shape.x + 4 + _offset, shape.y - 4]
            // @ts-ignore
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    })
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const c1 = [shape.x + _offset, shape.y]
            const c2 = [shape.x + 4 + _offset, shape.y - 4]
            const c3 = [shape.x - 14 + _offset, shape.y - 4]
            const c4 = [shape.x - 18 + _offset, shape.y]
            // @ts-ignore
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    })
    // 绘制背景
    const CubeBg = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c1 = [shape.x + _offset + 9, shape.y]
            const c2 = [xAxisPoint[0] - _offset - 9, shape.y]
            const c3 = [xAxisPoint[0] - _offset - 9, xAxisPoint[1]]
            const c4 = [shape.x + _offset + 9, xAxisPoint[1]]
            // @ts-ignore
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    });
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)
    echarts.graphic.registerShape('CubeBg', CubeBg)

    // 颜色列表
    const _colorList = [
        {
            top: '#65c7ec',
            left1: '#5cc4eb',
            left2: '#0b384d',
            right1: '#4db5d0',
            right2: '#062435'
        },
        {
            top: '#FFE500',
            left1: '#b6a70d',
            left2: '#48481a',
            right1: '#766e0e',
            right2: '#242c27'
        },
        {
            top: '#FF6868',
            left1: '#b45155',
            left2: '#5c3c46',
            right1: '#7b1418',
            right2: '#2f1c26'
        },
        {
            top: '#FF9800',
            left1: '#b57311',
            left2: '#5d4522',
            right1: '#6a4612',
            right2: '#3b3328'
        },
        {
            top: '#00FF90',
            left1: '#0dbe75',
            left2: '#1a604c',
            right1: '#0f7e52',
            right2: '#1e3b3b'
        },
    ];

    const total = [];
    
    // 处理数据，获取y轴数据
    for (let i = 0; i < dataList[0].list.length; i++) {
        total.push({value: dataList.reduce((old, newVal) => old + newVal.list[i], 0)});
    }
    let yData = getSelfAdaptionYData(total);

    // 处理series数据
    let series = [];

    dataList.forEach((item, idx) => {
        series.push({
            name: item.label,
            type: 'custom',
            itemStyle: {
                color: _colorList[idx].top
            },
            // @ts-ignore
            renderItem: (params, api) => {
                const location = api.coord([api.value(0), api.value(1)])
                return {
                    type: 'group',
                    children: [{
                        type: 'CubeLeft',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 2, [{
                                offset: 0,
                                color: _colorList[idx].left1
                            },
                            {
                                offset: 1,
                                color: _colorList[idx].left2
                            }
                            ])
                        }
                    }, {
                        type: 'CubeRight',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: _colorList[idx].right1
                            },
                            {
                                offset: 1,
                                color: _colorList[idx].right2
                            }
                            ])
                        }
                    }, {
                        type: 'CubeTop',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: _colorList[idx].top
                        }
                    }]
                }
            },
            // @ts-ignore
            data: item.list.map((item2, idx2) => {
                let _result = item2;
                dataList.forEach((item3, idx3) => {
                    if (idx3 < idx) {
                        _result += item3.list[idx2]
                    }
                });
                return _result;
            })
        });
    });

    // 背景
    series.push({
        type: 'custom',
        renderItem: (params, api) => {
            const location = api.coord([api.value(0), api.value(1)])
            return {
                type: 'group',
                children: [{
                    type: 'CubeBg',
                    shape: {
                        api,
                        xValue: api.value(0),
                        yValue: api.value(1),
                        x: location[0],
                        y: location[1],
                        xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                        fill: 'rgba(255, 255, 255, .2)'
                    }
                }]
            }
        },
        data: total.map(item => yData.max)
    });
    series = series.reverse();

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            },
            backgroundColor: '#051450',
            borderColor: '#013B81',
            formatter:function (params) {
                return \`<div>
                        <span style="color: #9FCAFE;">\${params[1].name}</span>
                        <br>
                        \${params[1].marker}<span style="color: #FFFFFF;">\${params[1].seriesName}</span>：<span style="color: \${params[1].color};">\${dataList[0].list[params[1].dataIndex]}</span>
                        <br>
                        \${params[2].marker}<span style="color: #FFFFFF;">\${params[2].seriesName}</span>：<span style="color: \${params[2].color};">\${dataList[1].list[params[1].dataIndex]}</span>
                        <br>
                        \${params[3].marker}<span style="color: #FFFFFF;">\${params[3].seriesName}</span>：<span style="color: \${params[3].color};">\${dataList[2].list[params[1].dataIndex]}</span>
                        <br>
                        \${params[4].marker}<span style="color: #FFFFFF;">\${params[4].seriesName}</span>：<span style="color: \${params[4].color};">\${dataList[3].list[params[1].dataIndex]}</span>
                        <br>
                        \${params[5].marker}<span style="color: #FFFFFF;">\${params[5].seriesName}</span>：<span style="color: \${params[5].color};">\${dataList[4].list[params[1].dataIndex]}</span>
                    </div>\`;
            }
        },
        grid: {
            left: 15,
            right: 20,
            bottom: 16,
            top: 60,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2023年\\n5月', '2023年\\n6月', '2023年\\n7月', '2023年\\n8月', '2023年\\n9月', '2023年\\n10月', '2023年\\n11月'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#27587E'
                }
            },
            axisTick: {
                show: false,
                length: 9,
                alignWithLabel: true,
                lineStyle: {
                    color: '#7DFFFD'
                }
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                color: '#fff',
                interval: 0
            },
            hideOverlap: false,
        },
        yAxis: {
            name: '次数',
            nameTextStyle: {
                color: '#9FCAFE',
                fontSize: '12px',
                fontWeight: '700',
                padding: [0,0,0,-30]
            },
            min: 0,
            max: yData.max,
            interval: yData.interval,
            type: 'value',
            axisLine: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#27587E"
                },
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                fontSize: 16,
                color: '#fff'
            },
            boundaryGap: ['20%', '20%']
        },
        legend: {
            show: true,
            top: 12,
            align: 'left',
            gap: 26,
            itemHeight: 11,
            itemWidth: 16,
            textStyle: {
                fontSize: 13,
                color: '#FFFFFF'
            }
        },
        series
    }
}

let dataList = [
    {
        label: '风速',
        list: [5, 6, 7, 1, 9, 11, 14]
    },
    {
        label: '噪音',
        list: [19, 10, 4, 0, 16, 7, 8]
    },
    {
        label: '气温',
        list: [21, 18, 20, 29, 4, 16, 12]
    },
    {
        label: 'PM2.5',
        list: [4, 0, 16, 21, 18, 3, 2]
    },
    {
        label: 'PM10',
        list: [18, 33, 29, 4, 4, 0, 16]
    }
]
function draw(id, option) {
    let chartDom = document.getElementById(id);
    let chart = echarts.init(chartDom);
    option && chart.setOption(option);
}
draw('threeDimensionalBar', getThreeDimensionalBarOption(dataList));`,
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

interface IDataItem {
    label: string; 
    list: Array<number>;
}

/**
 * 获取立体柱形图配置
 * @param dataList 
 */
const getThreeDimensionalBarOption = function(dataList: Array<IDataItem>) {
    // 偏移值 需根据情况自行处理 未做自动化
    const _offset = 7;
    // 绘制左侧面
    const CubeLeft = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx, shape) {
            // 会canvas的应该都能看得懂，shape是从custom传入的
            const xAxisPoint = shape.xAxisPoint
            const c0 = [shape.x + _offset, shape.y]
            const c1 = [shape.x - 18 + _offset, shape.y]
            const c2 = [xAxisPoint[0] - 18 + _offset, xAxisPoint[1]]
            const c3 = [xAxisPoint[0] + _offset, xAxisPoint[1]]
            // @ts-ignore
            ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
        }
    })
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c1 = [shape.x + _offset, shape.y]
            const c2 = [xAxisPoint[0] + _offset, xAxisPoint[1]]
            const c3 = [xAxisPoint[0] + 4 + _offset, xAxisPoint[1]]
            const c4 = [shape.x + 4 + _offset, shape.y - 4]
            // @ts-ignore
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    })
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const c1 = [shape.x + _offset, shape.y]
            const c2 = [shape.x + 4 + _offset, shape.y - 4]
            const c3 = [shape.x - 14 + _offset, shape.y - 4]
            const c4 = [shape.x - 18 + _offset, shape.y]
            // @ts-ignore
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    })
    // 绘制背景
    const CubeBg = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint
            const c1 = [shape.x + _offset + 9, shape.y]
            const c2 = [xAxisPoint[0] - _offset - 9, shape.y]
            const c3 = [xAxisPoint[0] - _offset - 9, xAxisPoint[1]]
            const c4 = [shape.x + _offset + 9, xAxisPoint[1]]
            // @ts-ignore
            ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
        }
    });
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft)
    echarts.graphic.registerShape('CubeRight', CubeRight)
    echarts.graphic.registerShape('CubeTop', CubeTop)
    echarts.graphic.registerShape('CubeBg', CubeBg)

    // 颜色列表
    const _colorList = [
        {
            top: '#65c7ec',
            left1: '#5cc4eb',
            left2: '#0b384d',
            right1: '#4db5d0',
            right2: '#062435'
        },
        {
            top: '#FFE500',
            left1: '#b6a70d',
            left2: '#48481a',
            right1: '#766e0e',
            right2: '#242c27'
        },
        {
            top: '#FF6868',
            left1: '#b45155',
            left2: '#5c3c46',
            right1: '#7b1418',
            right2: '#2f1c26'
        },
        {
            top: '#FF9800',
            left1: '#b57311',
            left2: '#5d4522',
            right1: '#6a4612',
            right2: '#3b3328'
        },
        {
            top: '#00FF90',
            left1: '#0dbe75',
            left2: '#1a604c',
            right1: '#0f7e52',
            right2: '#1e3b3b'
        },
    ];

    const total: any[] = [];
    
    // 处理数据，获取y轴数据
    for (let i = 0; i < dataList[0].list.length; i++) {
        total.push({value: dataList.reduce((old, newVal) => old + newVal.list[i], 0)});
    }
    let yData = getSelfAdaptionYData(total);

    // 处理series数据
    let series: any[] = [];

    dataList.forEach((item, idx) => {
        series.push({
            name: item.label,
            type: 'custom',
            itemStyle: {
                color: _colorList[idx].top
            },
            // @ts-ignore
            renderItem: (params: any, api: any) => {
                const location = api.coord([api.value(0), api.value(1)])
                return {
                    type: 'group',
                    children: [{
                        type: 'CubeLeft',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 2, [{
                                offset: 0,
                                color: _colorList[idx].left1
                            },
                            {
                                offset: 1,
                                color: _colorList[idx].left2
                            }
                            ])
                        }
                    }, {
                        type: 'CubeRight',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: _colorList[idx].right1
                            },
                            {
                                offset: 1,
                                color: _colorList[idx].right2
                            }
                            ])
                        }
                    }, {
                        type: 'CubeTop',
                        shape: {
                            api,
                            xValue: api.value(0),
                            yValue: api.value(1),
                            x: location[0],
                            y: location[1],
                            xAxisPoint: api.coord([api.value(0), 0])
                        },
                        style: {
                            fill: _colorList[idx].top
                        }
                    }]
                }
            },
            // @ts-ignore
            data: item.list.map((item2, idx2) => {
                let _result = item2;
                dataList.forEach((item3, idx3) => {
                    if (idx3 < idx) {
                        _result += item3.list[idx2]
                    }
                });
                return _result;
            })
        });
    });

    // 背景
    series.push({
        type: 'custom',
        renderItem: (params: any, api: any) => {
            const location = api.coord([api.value(0), api.value(1)])
            return {
                type: 'group',
                children: [{
                    type: 'CubeBg',
                    shape: {
                        api,
                        xValue: api.value(0),
                        yValue: api.value(1),
                        x: location[0],
                        y: location[1],
                        xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                        fill: 'rgba(255, 255, 255, .2)'
                    }
                }]
            }
        },
        data: total.map(item => yData.max)
    });
    series = series.reverse();

    return {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'none'
            },
            backgroundColor: '#051450',
            borderColor: '#013B81',
            formatter:function (params: any) {
                return \`<div>
                        <span style="color: #9FCAFE;">\${params[1].name}</span>
                        <br>
                        \${params[1].marker}<span style="color: #FFFFFF;">\${params[1].seriesName}</span>：<span style="color: \${params[1].color};">\${dataList[0].list[params[1].dataIndex]}</span>
                        <br>
                        \${params[2].marker}<span style="color: #FFFFFF;">\${params[2].seriesName}</span>：<span style="color: \${params[2].color};">\${dataList[1].list[params[1].dataIndex]}</span>
                        <br>
                        \${params[3].marker}<span style="color: #FFFFFF;">\${params[3].seriesName}</span>：<span style="color: \${params[3].color};">\${dataList[2].list[params[1].dataIndex]}</span>
                        <br>
                        \${params[4].marker}<span style="color: #FFFFFF;">\${params[4].seriesName}</span>：<span style="color: \${params[4].color};">\${dataList[3].list[params[1].dataIndex]}</span>
                        <br>
                        \${params[5].marker}<span style="color: #FFFFFF;">\${params[5].seriesName}</span>：<span style="color: \${params[5].color};">\${dataList[4].list[params[1].dataIndex]}</span>
                    </div>\`;
            }
        },
        grid: {
            left: 15,
            right: 20,
            bottom: 16,
            top: 60,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['2023年\\n5月', '2023年\\n6月', '2023年\\n7月', '2023年\\n8月', '2023年\\n9月', '2023年\\n10月', '2023年\\n11月'],
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#27587E'
                }
            },
            axisTick: {
                show: false,
                length: 9,
                alignWithLabel: true,
                lineStyle: {
                    color: '#7DFFFD'
                }
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                color: '#fff',
                interval: 0
            },
            hideOverlap: false,
        },
        yAxis: {
            name: '次数',
            nameTextStyle: {
                color: '#9FCAFE',
                fontSize: '12px',
                fontWeight: '700',
                padding: [0,0,0,-30]
            },
            min: 0,
            max: yData.max,
            interval: yData.interval,
            type: 'value',
            axisLine: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#27587E"
                },
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                fontSize: 16,
                color: '#fff'
            },
            boundaryGap: ['20%', '20%']
        },
        legend: {
            show: true,
            top: 12,
            align: 'left',
            gap: 26,
            itemHeight: 11,
            itemWidth: 16,
            textStyle: {
                fontSize: 13,
                color: '#FFFFFF'
            }
        },
        series
    }
}

let dataList: Array<IDataItem> = [
    {
        label: '风速',
        list: [5, 6, 7, 1, 9, 11, 14]
    },
    {
        label: '噪音',
        list: [19, 10, 4, 0, 16, 7, 8]
    },
    {
        label: '气温',
        list: [21, 18, 20, 29, 4, 16, 12]
    },
    {
        label: 'PM2.5',
        list: [4, 0, 16, 21, 18, 3, 2]
    },
    {
        label: 'PM10',
        list: [18, 33, 29, 4, 4, 0, 16]
    }
]

const chartRef = ref();
let chart: echarts.ECharts;
onMounted(() => {
    // @ts-ignore
    chart = echarts.init(unref(chartRef));
    chart.setOption(getThreeDimensionalBarOption(dataList));
});

onUnmounted(() => {
    chart.dispose();
});`,
    html: '&lt;div id="threeDimensionalBar" ref="chartRef"&gt;&lt;/div&gt;',
    scss: `#threeDimensionalBar {
    height: 100%;
}`,
    componentType: [EComponentType.chart],
    chartType: [EChartType.bar, EChartType.custom]
}