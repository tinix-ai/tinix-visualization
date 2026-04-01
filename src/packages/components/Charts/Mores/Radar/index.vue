<template>
  <v-chart ref="vChartRef" :init-options="initOptions" :theme="themeColor" :option="option" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import { ref, computed, PropType, watch, onMounted, onUnmounted } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import dataJson from './data.json'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { includes } from './config'
import { mergeTheme, setOption } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
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
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([DatasetComponent, CanvasRenderer, RadarChart, GridComponent, TooltipComponent, LegendComponent])

const vChartRef = ref<typeof VChart>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const dataSetHandle = (dataset: any) => {
  if (!dataset) return

  // 1. Support standard ECharts dataset format (dimensions, source)
  if (dataset.dimensions && dataset.source && Array.isArray(dataset.source)) {
    const dimensions = dataset.dimensions
    const source = dataset.source

    // Use dimensions (skipping the first one, e.g., 'product') as radar indicators
    const indicatorNames = dimensions.slice(1)
    
    // Calculate max values for each indicator with a 10% buffer
    const radarIndicator = indicatorNames.map((name: string) => {
      let maxVal = 0
      source.forEach((item: any) => {
        const val = parseFloat(item[name])
        if (val > maxVal) maxVal = val
      })
      // If max is 0, default to 100 to avoid flat rendering
      return { name, max: maxVal > 0 ? Math.ceil(maxVal * 1.1) : 100 }
    })

    // Map source data to radar series data
    const seriesData = source.map((item: any) => {
      return {
        name: item[dimensions[0]], // Use the first dimension as the item name
        value: indicatorNames.map((name: string) => item[name])
      }
    })

    props.chartConfig.option.radar.indicator = radarIndicator
    props.chartConfig.option.series[0].data = seriesData
    // @ts-ignore
    props.chartConfig.option.legend.data = seriesData.map(i => i.name)
  } 
  // 2. Support legacy custom format (seriesData, radarIndicator)
  else {
    if (dataset.seriesData) {
      props.chartConfig.option.series[0].data = dataset.seriesData
      // @ts-ignore
      props.chartConfig.option.legend.data = dataset.seriesData.map((i: { name: string }) => i.name)
    }
    if (dataset.radarIndicator) {
      props.chartConfig.option.radar.indicator = dataset.radarIndicator
    }
  }

  if (vChartRef.value && isPreview()) {
    setOption(vChartRef.value, props.chartConfig.option)
  }
}

watch(
  () => props.chartConfig.option.dataset,
  newData => {
    try {
      dataSetHandle(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

let timer: any = null
onMounted(() => {
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

useChartDataFetch(props.chartConfig, useChartEditStore, (newData: typeof dataJson) => {
  dataSetHandle(newData)
})
</script>
