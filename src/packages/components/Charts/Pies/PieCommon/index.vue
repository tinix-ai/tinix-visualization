<template>
  <v-chart
    ref="vChartRef"
    autoresize
    :init-options="initOptions"
    :theme="themeColor"
    :option="option"
    :manual-update="isPreview()"
    @mouseover="handleHighlight"
    @mouseout="handleDownplay"
  ></v-chart>
</template>

<script setup lang="ts">
import { computed, PropType, onMounted, onUnmounted, watch, ref } from 'vue'
import VChart from 'vue-echarts'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { mergeTheme, setOption } from '@/packages/public/chart'
import config, { includes } from './config'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import dataJson from './data.json'

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
let seriesDataNum = -1
let seriesDataMaxLength = 0
let intervalInstance: any = null

use([DatasetComponent, CanvasRenderer, PieChart, GridComponent, TooltipComponent, LegendComponent])

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

// Dữ liệu cần chọn và hiển thị sẽ được chọn lại.
const handleSeriesData = () => {
  if (seriesDataNum > -1) {
    vChartRef.value?.dispatchAction({
      type: 'downplay',
      dataIndex: seriesDataNum
    })
  }
  seriesDataNum = seriesDataNum >= seriesDataMaxLength - 1 ? 0 : seriesDataNum + 1
  vChartRef.value?.dispatchAction({
    type: 'highlight',
    dataIndex: seriesDataNum
  })
}

// Thêm băng chuyền
const addPieInterval = (newData?: typeof dataJson, skipPre = false) => {
  if (!skipPre && !Array.isArray(newData?.source)) return
  if (!skipPre) seriesDataMaxLength = newData?.source.length || 0
  clearInterval(intervalInstance)
  intervalInstance = setInterval(() => {
    handleSeriesData()
  }, 1000)
}

// Hủy băng chuyền
const clearPieInterval = () => {
  vChartRef.value?.dispatchAction({
    type: 'downplay',
    dataIndex: seriesDataNum
  })
  clearInterval(intervalInstance)
  intervalInstance = null
}

// Xử lý nội dung được đánh dấu bằng tiêu điểm chuột
const handleHighlight = () => {
  clearPieInterval()
}

// Xử lý chuột di chuột
const handleDownplay = () => {
  if (props.chartConfig.option.isCarousel && !intervalInstance) {
    // Tiếp tục băng chuyền
    addPieInterval(undefined, true)
  }
}

watch(
  () => props.chartConfig.option.type,
  newData => {
    try {
      // Ngăn chặn việc kích hoạt các sửa đổi trong quá trình khởi tạo, dẫn đến mất một số tham số
      if (isPreview()) {
        return
      }
      if (newData === 'nomal') {
        props.chartConfig.option.series[0].radius = '70%'
        props.chartConfig.option.series[0].roseType = false
      } else if (newData === 'ring') {
        props.chartConfig.option.series[0].radius = ['40%', '65%']
        props.chartConfig.option.series[0].roseType = false
      } else {
        props.chartConfig.option.series[0].radius = '70%'
        props.chartConfig.option.series[0].roseType = true
      }
    } catch (error) {
      console.log(error)
    }
  },
  { deep: false, immediate: true }
)

watch(
  () => props.chartConfig.option.isCarousel,
  newData => {
    if (newData) {
      addPieInterval(undefined, true)
      props.chartConfig.option.legend.show = false
    } else {
      props.chartConfig.option.legend.show = true
      clearPieInterval()
    }
  }
)

const { vChartRef } = useChartDataFetch(props.chartConfig, useChartEditStore, (newData: typeof dataJson) => {
  clearPieInterval()
  if (props.chartConfig.option.isCarousel) {
    addPieInterval(newData)
  }
})

let timer: any = null
onMounted(() => {
  seriesDataMaxLength = dataJson.source.length
  if (props.chartConfig.option.isCarousel) {
    addPieInterval(undefined, true)
  }
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
  clearPieInterval()
})
</script>
