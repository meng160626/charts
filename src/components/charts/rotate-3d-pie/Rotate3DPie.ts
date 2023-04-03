import { EChartType, EComponentType } from "@/enum";
import type { TChartConfig } from "env";

export const Rotate3DPieConfig: TChartConfig = {
    name: '3D旋转饼图',
    js: `const getParametricEquation = function(
    startRatio,
    endRatio,
    isSelected,
    isHovered,
    k,
    h
) {
    // 计算
    const midRatio = (startRatio + endRatio) / 2;

    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
        // eslint-disable-next-line no-param-reassign
        isSelected = false;
    }

    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    // eslint-disable-next-line no-param-reassign
    k = typeof k !== 'undefined' ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    const hoverRate = isHovered ? 1.05 : .8;

    // 返回曲面参数方程
    return {
        u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
        },

        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
        },

        x(u, v) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y(u, v) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z(u, v) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u) * h * 0.1;
            }
            
            // 当前图形的高度是Z根据h（每个value的值决定的）
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
    };
}

// 获取3D饼配置
const get3DPieOption = function(pieData, internalDiameterRatio, total) {
    const series = [];
    // 总和
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k =
        typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i += 1) {
        let _value = pieData[i].value;
        sumValue += _value;

        const seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? \`series\${i}\` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k,
            },
            itemStyle: {},
            parametricEquation: {}
        };

        if (typeof pieData[i].itemStyle !== 'undefined') {
            const { itemStyle } = pieData[i];

            // eslint-disable-next-line no-unused-expressions
            typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
            // eslint-disable-next-line no-unused-expressions
            typeof pieData[i].itemStyle.opacity !== 'undefined'
                ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                : null;

            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }
    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i += 1) {
        endValue = startValue + series[i].pieData.value;

        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            // 我这里做了一个处理，使除了第一个之外的值都是10
            (1- series[i].pieData.value / total) * 20
        );

        startValue = endValue;

        legendData.push(series[i].name);
    }

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    const option = {
        // animation: false,
        tooltip: {
            formatter: (params) => {
                if (params.seriesName !== 'mouseoutSeries') {
                    return \`\${
                        params.seriesName
                    }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:\${
                        params.color
                    };"></span>\${option.series[params.seriesIndex].pieData.value}%\`;
                }
                return '';
            },
        },
        xAxis3D: {
            min: -1,
            max: 1,
        },
        yAxis3D: {
            min: -1,
            max: 1,
        },
        zAxis3D: {
            min: -1,
            max: 1,
        },
        grid3D: {
            show: false,
            boxHeight: 20,
            viewControl: {
                // 3d效果可以放大、旋转等，请自己去查看官方配置
                alpha: 25,
                // beta: 30,
                rotateSensitivity: 0,
                zoomSensitivity: 0,
                panSensitivity: 0,
                autoRotate: true,
                distance: 150,
            },
            light: {
                main: {
                    intensity: 1.5
                }
            },
            // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
            postEffect: {
                // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
                enable: false,
                // bloom: {
                //     enable: true,
                //     bloomIntensity: 0.5,
                // },
                SSAO: {
                    enable: true,
                    quality: 'medium',
                    radius: 2,
                },
                // temporalSuperSampling: {
                //   enable: true,
                // },
            },
        },
        series,
    };
    return option;
}

// 绘制旋转3D饼图
const _chart = echarts.init(document.getElementById('rotate3DPie'));
const option = get3DPieOption([
    {
        name: '已完工',
        value: 40,
        itemStyle: {
            color: '#47A2F0'
        }
    }, {
        name: '未完工',
        value: 60,
        itemStyle: {
            color: '#E7770D'
        }
    }
],0.59, 100);
option && _chart.setOption(option);`,
    ts: `import * as echarts from "echarts";
import 'echarts-gl';
import { onMounted, onUnmounted, ref, unref } from "vue";

/**
 * 获取参数方程式
 * @param startRatio 
 * @param endRatio 
 * @param isSelected 
 * @param isHovered 
 * @param k 
 * @param h 
 */
const getParametricEquation = function(
    startRatio: number,
    endRatio: number,
    isSelected: boolean,
    isHovered: boolean,
    k: number,
    h: number
) {
    // 计算
    const midRatio = (startRatio + endRatio) / 2;

    const startRadian = startRatio * Math.PI * 2;
    const endRadian = endRatio * Math.PI * 2;
    const midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
        // eslint-disable-next-line no-param-reassign
        isSelected = false;
    }

    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    // eslint-disable-next-line no-param-reassign
    k = typeof k !== 'undefined' ? k : 1 / 3;

    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    const hoverRate = isHovered ? 1.05 : .8;

    // 返回曲面参数方程
    return {
        u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
        },

        v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
        },

        x(u: number, v: number) {
            if (u < startRadian) {
                return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y(u: number, v: number) {
            if (u < startRadian) {
                return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            if (u > endRadian) {
                return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z(u: number, v: number) {
            if (u < -Math.PI * 0.5) {
                return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
                return Math.sin(u) * h * 0.1;
            }
            
            // 当前图形的高度是Z根据h（每个value的值决定的）
            return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
    };
}

interface IPieDataItem {
    name: string;
    value: number;
    itemStyle: any;
    startRatio: number;
    endRatio: number;
}

/**
 * 获取旋转3D饼图配置
 * @param pieData 
 * @param internalDiameterRatio 
 * @param total 
 */
const get3DPieOption = function(pieData: Array<IPieDataItem>, internalDiameterRatio: number, total: number) {
    const series = [];
    // 总和
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    const legendData = [];
    const k =
        typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i += 1) {
        let _value = pieData[i].value;
        sumValue += _value;

        const seriesItem = {
            name: typeof pieData[i].name === 'undefined' ? \`series\${i}\` : pieData[i].name,
            type: 'surface',
            parametric: true,
            wireframe: {
                show: false,
            },
            pieData: pieData[i],
            pieStatus: {
                selected: false,
                hovered: false,
                k,
            },
            itemStyle: {},
            parametricEquation: {}
        };

        if (typeof pieData[i].itemStyle !== 'undefined') {
            const { itemStyle } = pieData[i];

            // eslint-disable-next-line no-unused-expressions
            typeof pieData[i].itemStyle.color !== 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
            // eslint-disable-next-line no-unused-expressions
            typeof pieData[i].itemStyle.opacity !== 'undefined'
                ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                : null;

            seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
    }
    // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
    for (let i = 0; i < series.length; i += 1) {
        endValue = startValue + series[i].pieData.value;

        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            // 我这里做了一个处理，使除了第一个之外的值都是10
            (1- series[i].pieData.value / total) * 20
        );

        startValue = endValue;

        legendData.push(series[i].name);
    }

    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    const option = {
        // animation: false,
        tooltip: {
            formatter: (params: any) => {
                if (params.seriesName !== 'mouseoutSeries') {
                    return \`\${
                        params.seriesName
                    }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:\${
                        params.color
                    };"></span>\${option.series[params.seriesIndex].pieData.value}%\`;
                }
                return '';
            },
        },
        xAxis3D: {
            min: -1,
            max: 1,
        },
        yAxis3D: {
            min: -1,
            max: 1,
        },
        zAxis3D: {
            min: -1,
            max: 1,
        },
        grid3D: {
            show: false,
            boxHeight: 20,
            viewControl: {
                // 3d效果可以放大、旋转等，请自己去查看官方配置
                alpha: 25,
                // beta: 30,
                rotateSensitivity: 0,
                zoomSensitivity: 0,
                panSensitivity: 0,
                autoRotate: true,
                distance: 150,
            },
            light: {
                main: {
                    intensity: 1.5
                }
            },
            // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
            postEffect: {
                // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
                enable: false,
                // bloom: {
                //     enable: true,
                //     bloomIntensity: 0.5,
                // },
                SSAO: {
                    enable: true,
                    quality: 'medium',
                    radius: 2,
                },
                // temporalSuperSampling: {
                //   enable: true,
                // },
            },
        },
        series,
    };
    return option;
}

let data: Array<IPieDataItem> = [
    {
        name: '已完工',
        value: 40,
        itemStyle: {
            color: '#47A2F0'
        },
        startRatio: 0,
        endRatio: 0,
    }, {
        name: '未完工',
        value: 60,
        itemStyle: {
            color: '#E7770D'
        },
        startRatio: 0,
        endRatio: 0,
    }
];

const chartRef = ref();
let chart: echarts.ECharts;
onMounted(() => {
    // @ts-ignore
    chart = echarts.init(unref(chartRef));
    chart.setOption(get3DPieOption(data, 0.59, 100));
});

onUnmounted(() => {
    chart.dispose();
});`,
    html: `&lt;div class="pie-container"&gt;
    &lt;ul class="legend"&gt;
        &lt;li&gt;
            &lt;i&gt;&lt;/i&gt;
            &lt;span class="name"&gt;已完工&lt;/span&gt;
            &lt;span class="value" style="color: #1AD0FF;"&gt;40&lt;/span&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;i&gt;&lt;/i&gt;
            &lt;span class="name"&gt;未完工&lt;/span&gt;
            &lt;span class="value" style="color: #FFA653;"&gt;60&lt;/span&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class="chart" id="rotate3DPie" ref="chartRef"&gt;&lt;/div&gt;
    &lt;div class="chassis"&gt;&lt;/div&gt;
    &lt;div class="chassis-shadow"&gt;&lt;/div&gt;
&lt;/div&gt;`,
    scss: `.pie-container {
    position: relative;
    height: 100%;
    .legend {
        padding: 0;
        position: absolute;
        width: 100%;
        top: 23px;
        z-index: 4;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 40px;
        list-style: none;
        li {
            display: flex;
            align-items: center;
            color: #FFF;
            .name {
                font-size: 16px;
                color: #FFF;
            }
            .value {
                font-size: 24px;
                font-family: YouSheBiaoTiHei,sans-serif;
                margin-left: 10px;
                color: #FFF;
            }
            &:first-child i {
                background-image: url(../../../assets/images/pie-legend1.png);
            }
            &:last-child i {
                background-image: url(../../../assets/images/pie-legend2.png);
            }
            i {
                display: inline-block;
                width: 34px;
                height: 32px;
            }
        }
    }
    .chart {
        width: 100%;
        height: 100%;
        z-index: 3;
    }
    .chassis {
        background-image: url(../../../assets/images/ring-light.png);
        width: 331px;
        height: 292px;
        position: absolute;
        z-index: 1;
        left: 50%;
        bottom: -18%;
        transform: scaleY(.5) translateX(-50%);
        animation: pie-rotation 10s linear infinite;
    }
    .chassis-shadow {
        width: 331px;
        height: 180px;
        position: absolute;
        z-index: 2;
        left: 50%;
        bottom: 5%;
        transform: translateX(-50%);
        background-image: linear-gradient(to bottom, #000 20%, transparent 70%);
        clip-path: ellipse(45% 42% at 50% 50%);
    }
}

/* 循环旋转动画 */
@keyframes pie-rotation {
    0% {
        transform: scaleY(.5) translateX(-50%) rotate(0deg);
    }

    100% {
        transform: scaleY(.5) translateX(-50%) rotate(-360deg);
    }
}`,
    componentType: [EComponentType.chart],
    chartType: [EChartType.pie]
}