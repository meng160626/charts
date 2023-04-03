/// <reference types="vite/client" />

import type { EChartType } from "@/enum";
import type { VueElement } from "vue";

type TChartConfig = {
    name: string;
    js: string;
    ts: string;
    html: string;
    scss: string;
    componentType: Array<EComponentType>;
    chartType?: Array<EChartType>;
}

type TExample = {
    componentClass: DefineComponent;
    componentConfig: TChartConfig;
}

type TGroupItem = {
    value: EChartType;
    text: string;
    active: boolean;
}