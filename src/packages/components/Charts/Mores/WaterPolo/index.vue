<template>
  <v-chart :theme="themeColor" :init-options="initOptions" :option="option.value" autoresize></v-chart>
</template>

<script setup lang="ts">
import { PropType, watch, reactive } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import 'echarts-liquidfill/src/liquidFill.js'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components'
import config from './config'
import { isPreview, isString, isNumber, colorGradientCustomMerge } from '@/utils'
import { chartColorsSearch, defaultTheme } from '@/settings/chartThemes/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([CanvasRenderer, GridComponent])

const chartEditStore = useChartEditStore()

const option = reactive({
  value: {}
})

// Xử lý màu gradient
watch(
  () => chartEditStore.getEditCanvasConfig.chartThemeColor,
  (newColor: keyof typeof chartColorsSearch) => {
    try {
      if (!isPreview()) {
        const themeColor =
          colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[newColor] ||
          colorGradientCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)[defaultTheme]
        // Màu nền
        props.chartConfig.option.series[0].backgroundStyle.color = themeColor[2]
        // màu sắc của môn bóng nước
        props.chartConfig.option.series[0].color[0].colorStops = [
          {
            offset: 0,
            color: themeColor[0]
          },
          {
            offset: 1,
            color: themeColor[1]
          }
        ]
      }
      option.value = props.chartConfig.option
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true
  }
)

// Xử lý dữ liệu
const dataHandle = (newData: number | string) => {
  newData = isString(newData) ? parseFloat(newData) : newData
  return parseFloat(newData.toFixed(2))
}

// biên tập
watch(
  () => props.chartConfig.option.dataset,
  newData => {
    if (!isString(newData) && !isNumber(newData)) return
    props.chartConfig.option.series[0].data = [dataHandle(newData)]
    option.value = props.chartConfig.option
  },
  {
    immediate: true,
    deep: false
  }
)

// Xem trước
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: number) => {
  // @ts-ignore
  option.value.series[0].data = [dataHandle(newData)]
})
</script>
