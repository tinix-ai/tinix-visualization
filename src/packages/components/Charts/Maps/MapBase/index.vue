<template>
  <div>
    <div class="back-icon" v-if="(enter && levelHistory.length !== 0) || (enter && !isPreview())" @click="backLevel">
      <n-icon :color="backColor" :size="backSize * 1.1">
        <ArrowBackIcon />
      </n-icon>
      <span
        :style="{
          'font-weight': 200,
          color: backColor,
          'font-size': `${backSize}px`
        }"
      >
        {{ $t('phase7.auto_181') }}
      </span>
    </div>
    <v-chart
      v-if="mapReady"
      ref="vChartRef"
      :init-options="initOptions"
      :theme="themeColor"
      :option="option.value"
      :manual-update="isPreview()"
      autoresize
      @click="chartPEvents"
    >
    </v-chart>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, watch, ref, nextTick, toRefs } from 'vue'
import Config, { option as defaultOption, includes } from './config'
import VChart from 'vue-echarts'
import { icon } from '@/plugins'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use, registerMap } from 'echarts/core'
import { EffectScatterChart, MapChart, LinesChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useChartDataFetch } from '@/hooks'
import { mergeTheme, setOption } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import { DatasetComponent, GridComponent, TooltipComponent, GeoComponent, VisualMapComponent } from 'echarts/components'
import merge from 'lodash/merge'

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
    type: Object as PropType<Config>,
    required: true
  }
})

const { ArrowBackIcon } = icon.ionicons5
let levelHistory: any = ref([])
const mapReady = ref(false)

const { backColor, backSize, enter } = toRefs(props.chartConfig.option.mapRegion)
const initOptions = { ...useCanvasInitOptions(props.chartConfig.option, props.themeSetting), renderer: 'canvas' as const }

use([
  MapChart,
  LinesChart,
  DatasetComponent,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  GeoComponent,
  EffectScatterChart,
  VisualMapComponent
])

// Ensure geo config always exists on the component option (templates may omit it)
if (!props.chartConfig.option.geo) {
  props.chartConfig.option.geo = merge({}, defaultOption.geo)
}

// Cập nhật tên bản đồ trong cấu hình để khớp với adcode trước khi khởi tạo reactive
const initialAdcode = `${props.chartConfig.option.mapRegion.adcode}`
props.chartConfig.option.geo.map = initialAdcode
props.chartConfig.option.series.forEach((item: any) => {
  if (item.type === 'map') item.map = initialAdcode
})

// Build the fully merged option (defaults + component config + theme)
const buildMergedOption = () => {
  return mergeTheme(merge(merge({}, defaultOption), props.chartConfig.option), props.themeSetting, includes)
}

const option = reactive({
  value: buildMergedOption()
})
const vChartRef = ref<typeof VChart>()

//Mua lại độngjsonĐăng ký bản đồ
const getGeojson = (regionId: string) => {
  return new Promise<boolean>(resolve => {
    import(`./mapGeojson/${regionId}.json`).then(data => {
      registerMap(regionId, { geoJSON: data.default as any, specialAreas: {} })
      resolve(true)
    })
  })
}

// không đồng bộ Đăng ký bản đồ
const registerMapInitAsync = async () => {
  await nextTick()
  const adCode = `${props.chartConfig.option.mapRegion.adcode}`

  await getGeojson(adCode)
  // Reactive update with merged option (preserving geo)
  option.value = buildMergedOption()
  mapReady.value = true
  await nextTick()
  vEchartsSetOption()
}
registerMapInitAsync()

// Kích hoạt kết xuất theo cách thủ công
const vEchartsSetOption = () => {
  const mergedOption = buildMergedOption()
  option.value = mergedOption
  if (vChartRef.value) {
    setOption(vChartRef.value, mergedOption)
  }
}

// Cập nhật xử lý dữ liệu
const dataSetHandle = async (dataset: any) => {
  props.chartConfig.option.series.forEach((item: any) => {
    if (item.type === 'effectScatter' && dataset.point) item.data = dataset.point
    else if (item.type === 'lines' && dataset.line) {
      item.data = dataset.line.map((it: any) => {
        return {
          ...it,
          lineStyle: {
            color: props.chartConfig.option.series[2]?.lineStyle?.color
          }
        }
      })
    } else if (item.type === 'map' && dataset.map) item.data = dataset.map
  })
  if (dataset.pieces) props.chartConfig.option.visualMap.pieces = dataset.pieces

  isPreview() && vEchartsSetOption()
}

// vùng nhấp chuột
const chartPEvents = (e: any) => {
  if (e.seriesType !== 'map') return
  if (!props.chartConfig.option.mapRegion.enter) {
    return
  }
  // Drill-down logic can be added here if GeoJSON data is available
}

// trở lại cấp độ cao hơn
const backLevel = () => {
  levelHistory.value = []
  checkOrMap(`${props.chartConfig.option.mapRegion.adcode}`)
}

// Chuyển đổi bản đồ
const checkOrMap = async (newData: string) => {
  await getGeojson(newData)
  if (props.chartConfig.option.geo) {
    props.chartConfig.option.geo.map = newData
  }
  props.chartConfig.option.series.forEach((item: any) => {
    if (item.type === 'map') item.map = newData
  })
  vEchartsSetOption()
}

//màn hình dataset Thay đổi dữ liệu
watch(
  () => props.chartConfig.option.dataset,
  newData => {
    dataSetHandle(newData)
  },
  {
    immediate: true,
    deep: false
  }
)

// Giám sát màu dây
if (props.chartConfig.option.series[2] && !isPreview()) {
  watch(
    () => props.chartConfig.option.series[2]?.lineStyle?.color,
    () => {
      dataSetHandle(props.chartConfig.option.dataset)
    },
    {
      deep: false
    }
  )
}

//Theo dõi những thay đổi trong khu vực hiển thị bản đồ
watch(
  () => `${props.chartConfig.option.mapRegion.adcode}`,
  newData => {
    try {
      checkOrMap(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

// Xem trước
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  dataSetHandle(newData)
})
</script>

<style scope lang="scss">
.back-icon {
  z-index: 50;
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  gap: 2px;
}
</style>
