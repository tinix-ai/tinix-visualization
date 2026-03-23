<template>
  <v-chart
    ref="vChartRef"
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    :update-options="{
      replaceMerge: replaceMergeArr
    }"
    autoresize
  ></v-chart>
</template>

<script setup lang="ts">
import { ref, computed, watch, PropType, nextTick } from 'vue'
import VChart from 'vue-echarts'
import { isObject, cloneDeep } from 'lodash'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
//Giới thiệu biểu đồ thanh Biểu đồ đường
import { BarChart, LineChart } from 'echarts/charts'
import config, { includes, barSeriesItem, lineSeriesItem } from './config'
import { mergeTheme } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

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

use([DatasetComponent, CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent])

const replaceMergeArr = ref<string[]>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

watch(
  () => props.chartConfig.option.dataset,
  (newData: any, oldData) => {
    try {
      if (!isObject(newData) || !('dimensions' in newData)) return
      if (Array.isArray((newData as any)?.dimensions)) {
        const seriesArr: typeof barSeriesItem[] = []
        // PhảioldDataĐưa ra các phán đoán để ngăn chặn dữ liệu sai đến can thiệp vào phán đoán của các chiều cũ.
        // Những gì được tính toán ở đây làdimensionscủaYkích thước trục, nếudimensions.lengthvì0hoặc1, mặc định là1,loại trừXnhiễu kích thước trục
        const oldDimensions =
          Array.isArray(oldData?.dimensions) && oldData.dimensions.length >= 1 ? oldData.dimensions.length : 1
        const newDimensions = (newData as any).dimensions.length >= 1 ? (newData as any).dimensions.length : 1
        const dimensionsGap = newDimensions - oldDimensions
        if (dimensionsGap < 0) {
          props.chartConfig.option.series.splice(newDimensions - 1)
        } else if (dimensionsGap > 0) {
          if (!oldData || !oldData?.dimensions || !Array.isArray(oldData?.dimensions) || !oldData?.dimensions.length) {
            props.chartConfig.option.series = []
          }
          for (let i = 0; i < dimensionsGap; i++) {
            seriesArr.push(cloneDeep(barSeriesItem))
          }
          props.chartConfig.option.series.push(...seriesArr)
        }
        replaceMergeArr.value = ['series']
        nextTick(() => {
          replaceMergeArr.value = []
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
})
</script>
