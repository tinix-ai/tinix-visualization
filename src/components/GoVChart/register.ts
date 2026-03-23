import { VChart } from '@visactor/vchart/esm/core';
import { registerBarChart, registerAreaChart, registerLineChart, registerPieChart, registerFunnelChart, registerWordCloudChart, registerScatterChart } from '@visactor/vchart/esm/chart';
import { registerTooltip, registerCartesianCrossHair, registerDiscreteLegend, registerLabel } from '@visactor/vchart/esm/component';
import { registerDomTooltipHandler } from '@visactor/vchart/esm/plugin/components';
import { registerAnimate } from '@visactor/vchart';

export const registerChartsAndComponents = () => {
  VChart.useRegisters([
    // biểu đồ
    registerBarChart,
    registerAreaChart,
    registerLineChart,
    registerPieChart,
    registerScatterChart,
    registerFunnelChart,
    registerWordCloudChart,

    // thành phần
    registerTooltip,
    registerDomTooltipHandler,
    registerCartesianCrossHair,
    registerDiscreteLegend,
    registerLabel,

    // hoạt hình
    registerAnimate
  ]);
}

