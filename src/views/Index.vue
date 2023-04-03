<template>
    <main class="panel2-d-container">
        <!-- 地图 -->
        <div class="map" ref="baiduRef"></div>
        <header class="header">
            <span>代码素材库</span>
            <ul class="tab-list left">
                <li 
                    :class="`tab ${tabActive === item.value ? 'active' : ''}`" 
                    v-for="item in leftMenu" 
                    :key="item.value"
                    @click="onTabClick(item)"
                >{{ item.label }}</li>
            </ul>
            <ul class="tab-list right">
                <li 
                    :class="`tab ${tabActive === item.value ? 'active' : ''}`" 
                    v-for="item in rightMenu" 
                    :key="item.value"
                    @click="onTabClick(item)"
                >{{ item.label }}</li>
            </ul>
        </header>
        <aside class="aside-left aside" :style="{'transform': 'scale(' + zoomSize + ')','transition': 'all .2s'}">
            <content-box
                v-for="item in leftExampleList"
                @title-click="openCodeViewDialog(item)"
                :title="item.componentConfig.name">
                <component :is="item.componentClass"></component>
            </content-box>
            <TypeBtnList v-model:group-list="groupList" :active="groupActive"></TypeBtnList>
        </aside>
        <aside class="aside-right aside" :style="{'transform': 'scale(' + zoomSize + ')','transition': 'all .2s', 'left': `calc(100vw - 482px * ${zoomSize})`}">
            <content-box
                v-for="item in rightExampleList"
                @title-click="openCodeViewDialog(item)"
                :title="item.componentConfig.name">
                <component :is="item.componentClass"></component>
            </content-box>
        </aside>
    </main>

    <ShowCodeDialog ref="showCodeDialogRef" :example="state.currExample" ></ShowCodeDialog>
    <ReadMe ref="readMeRef"></ReadMe>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref, unref } from 'vue';
import styleJson from '@/json/map-config.json';
import ContentBox from '@/components/ContentBox.vue';
import ShowCodeDialog from '@/components/ShowCodeDialog.vue';
import ReadMe from '@/components/ReadMe.vue';
import TypeBtnList from '@/components/TypeBtnList.vue';

/**
 * 引入示例
 */
import PercentGauge from '@/components/charts/percent-gauge/PercentGauge.vue';
import { PercentGaugeConfig } from '@/components/charts/percent-gauge/PercentGauge';

import PercentPieGauge from '@/components/charts/percent-pie-gauge/PercentPieGauge.vue';
import { PercentPieGaugeConfig } from '@/components/charts/percent-pie-gauge/PercentPieGauge';

import Progress from '@/components/charts/progress/Progress.vue';
import { ProgressConfig } from '@/components/charts/progress/Progress';

import RotatePie from '@/components/charts/rotate-pie/RotatePie.vue';
import { RotatePieConfig } from '@/components/charts/rotate-pie/RotatePie';

import CylinderBar from '@/components/charts/cylinder-bar/CylinderBar.vue';
import { CylinderBarConfig } from '@/components/charts/cylinder-bar/CylinderBar';

import Rotate3DPie from '@/components/charts/rotate-3d-pie/Rotate3DPie.vue';
import { Rotate3DPieConfig } from '@/components/charts/rotate-3d-pie/Rotate3DPie';

import LiquidFill from '@/components/charts/liquid-fill/LiquidFill.vue';
import { LiquidFillConfig } from '@/components/charts/liquid-fill/LiquidFill';

import ThreeDimensionalBar from '@/components/charts/three-dimensional-bar/ThreeDimensionalBar.vue';
import { ThreeDimensionalBarConfig } from '@/components/charts/three-dimensional-bar/ThreeDimensionalBar';

import type { TExample, TGroupItem } from 'env';
import { computed } from '@vue/reactivity';
import { EChartType, EComponentType } from '@/enum';

onMounted(() => {
    initMap();
    // 监听屏幕缩放
    window.addEventListener('resize', () => {
      sizeChange();
    })
    sizeChange();
});

interface IMenuItem {
    value: number;
    componentType?: EComponentType;
    label: string;
}

// 菜单
const tabActive = ref(1);
const groupActive = ref(0);
const leftMenu = [
    {
        value: 1,
        componentType: EComponentType.chart,
        label: '图表'
    },
    {
        value: 2,
        componentType: EComponentType.carousel,
        label: '轮播图'
    },
    {
        value: 3,
        label: ''
    },
    {
        value: 4,
        label: ''
    },
    {
        value: 5,
        label: '上一页'
    },
]
const rightMenu = [
    {
        value: 101,
        label: ''
    },
    {
        value: 102,
        label: ''
    },
    {
        value: 103,
        label: ''
    },
    {
        value: 104,
        label: '使用说明'
    },
    {
        value: 105,
        label: '下一页'
    },
]

// 分类查询列表
const groupList: Array<Array<TGroupItem>> = reactive([
    [
        {
            value: EChartType.pie,
            text: '饼图',
            active: true
        },
        {
            value: EChartType.line,
            text: '线型图',
            active: true
        },
        {
            value: EChartType.bar,
            text: '柱状图',
            active: true
        },
        {
            value: EChartType.gauge,
            text: '仪表盘',
            active: true
        },
        {
            value: EChartType.liquidFill,
            text: '水球图',
            active: true
        },
        {
            value: EChartType.custom,
            text: '自定义',
            active: true
        },
    ],
    []
]);

// 菜单tab点击事件
const onTabClick = function(menutItem: IMenuItem) {
    if (menutItem.value !== 5 && menutItem.value !== 105 && menutItem.value !== 104) {
        tabActive.value = menutItem.value;
        searchState.componentType = menutItem.componentType;
        if (menutItem.value === 1) {
            groupActive.value = 0;
        } else {
            groupActive.value = 1;
        }
    } else if (menutItem.value === 5) {
        searchState.page = searchState.page - 1 || 1;
    } else if (menutItem.value === 105) {
        searchState.page++;
        if (searchState.page > Math.ceil(exampleList.length / 6)) {
            searchState.page = Math.ceil(exampleList.length / 6);
        }
    } else if (menutItem.value === 104) {
        unref(readMeRef).open();
    }
}

interface ISearchState {
    page: number;       // 页码
    componentType?: EComponentType;       // 类型
    groupBy?: Array<EChartType>;       // 分类查询
}

// 素材过滤
const searchState: ISearchState = reactive({
    page: 1,
    componentType: EComponentType.chart
});

// 所有示例数组
const exampleList: TExample[] = [
    {
        componentClass: RotatePie,
        componentConfig: RotatePieConfig
    },
    {
        componentClass: ThreeDimensionalBar,
        componentConfig: ThreeDimensionalBarConfig
    },
    {
        componentClass: CylinderBar,
        componentConfig: CylinderBarConfig
    },
    {
        componentClass: Rotate3DPie,
        componentConfig: Rotate3DPieConfig
    },
    {
        componentClass: LiquidFill,
        componentConfig: LiquidFillConfig
    },
    {
        componentClass: PercentPieGauge,
        componentConfig: PercentPieGaugeConfig
    },
    {
        componentClass: Progress,
        componentConfig: ProgressConfig
    },
    {
        componentClass: PercentGauge,
        componentConfig: PercentGaugeConfig
    },
];

// 左侧展示示例数组
const leftExampleList = computed(() => {
    return exampleList.filter(
        item => 
            searchState.componentType ? item.componentConfig.componentType.filter(
                el => {
                    if (el !== searchState.componentType) {
                        return false;
                    }
                    if (tabActive.value === 1) {
                        if (groupList[0].filter(group => group.active && item.componentConfig.chartType?.indexOf(group.value) !== -1).length <= 0) 
                            return false;
                    }
                    return true;
                }
            ).length > 0 : true
            ).filter(
            (item, idx) => 
                idx < (searchState.page * 6 - 3) && idx >= (searchState.page * 6 - 6)
        );
});

// 右侧展示示例数组
const rightExampleList = computed(() => {
    return exampleList.filter(
        item => 
            searchState.componentType ? item.componentConfig.componentType.filter(
                el => {
                    if (el !== searchState.componentType) {
                        return false;
                    }
                    if (tabActive.value === 1) {
                        if (groupList[0].filter(group => group.active && item.componentConfig.chartType?.indexOf(group.value) !== -1).length <= 0) 
                            return false;
                    }
                    return true;
                }
            ).length > 0 : true
        ).filter(
            (item, idx) => 
                idx < searchState.page * 6 && idx >= (searchState.page * 6 - 3)
        );
});

// 状态管理机
interface IState {
    currExample: TExample
}

const state: IState = reactive({
    currExample: {
        componentClass: PercentGauge,
        componentConfig: PercentGaugeConfig
    }
});

// refs
const baiduRef = ref();
const showCodeDialogRef = ref();
const readMeRef = ref();

//初始化地图
//@ts-ignore
const _BMapGL = BMapGL;  // 解决后续ts语法检测报错问题
let _map: any;  // 解决后续ts语法检测报错问题
const initMap = function() {
    _map = new _BMapGL.Map(unref(baiduRef), {
        style: {
            styleJson
        }
    });
    _map.centerAndZoom(new _BMapGL.Point(108.700405,34.10902), 13);
    _map.enableScrollWheelZoom(true);       //开启滚轮缩放
    _map.enableContinuousZoom();        //开启惯性滑动
}

// 打开代码显示弹框
const openCodeViewDialog = function(example: TExample) {
    state.currExample = example;
    unref(showCodeDialogRef).open('ts');
}

/**
 * 处理缩放
 */
let zoomSize = ref(1);      // 缩放比例
//分辨率变更事件
const sizeChange = function () {
    if (window.innerHeight >= 1070) {
      zoomSize.value = 1;
    }else {
      zoomSize.value = window.innerHeight / 1080 - .02;
    }
  }
</script>

<style scoped lang="scss">
.panel2-d-container {
    .map {
        height: 100vh;
        width: 100vw;
        pointer-events: auto;
        // 隐藏百度地图logo
        :deep(.anchorBL){
            display: none;
        }
    }
    .header {
        width: 1920px;
        height: 88px;
        background-image: url(../assets/images/header.png);
        background-repeat: no-repeat;
        background-size: contain;
        position: absolute;
        top: 0;
        text-align: center;
        z-index: 8;
        span {
            background: linear-gradient(to bottom, #ffffff, #9fcdff);
            -webkit-background-clip: text;
            color: transparent;
            font-weight: 900;
            position: relative;
            z-index: 2;
            letter-spacing: 6px;
            font-family: AliHYAiHei,sans-serif;
            font-size: 48px;
            line-height: 75px;

            &::before {
                display: inline-block;
                content: '代码素材库';
                position: absolute;
                text-shadow: 0 5px 6px rgba($color: #000000, $alpha: 1);
                z-index: -1;
            }
        }
        .tab-list {
            list-style: none;
            display: flex;
            position: absolute;
            top: 30px;
            margin: 0;
            padding: 0;
            gap: 16px;
            &.left {
                right: 67%;
                flex-direction: row-reverse;
            }
            &.right {
                left: 67%;
            }
            .tab {
                background-image: url(../assets/images/tab-default.png);
                width: 112px;
                font-family: ZhenyanGB;
                height: 36px;
                line-height: 38px;
                font-size: 16px;
                letter-spacing: 4px;
                color: #A7CBF4;
                cursor: pointer;
                pointer-events: auto;
                transition: all .3s ease-in-out;
                &:hover {
                    background-image: url(../assets/images/tab-active.png);
                    color: #FF9751;
                }
                &.active {
                    background-image: url(../assets/images/tab-active.png);
                    color: #FF9751;
                }
            }
        }
    }
    .aside {
        position: absolute;
        top: 86px;
        z-index: 8;
        pointer-events: none;
        transform-origin: 0 0 0;

        &.aside-left {
            left: 20px;
            :deep(.type-btn-list) {
                position: absolute;
                top: 24px;
                right: -130px;
            }
        }
    }
}
</style>