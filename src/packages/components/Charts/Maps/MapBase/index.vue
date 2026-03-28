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
import config, { includes } from './config'
import VChart from 'vue-echarts'
import { icon } from '@/plugins'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use, registerMap } from 'echarts/core'
import { EffectScatterChart, MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useChartDataFetch } from '@/hooks'
import { mergeTheme, setOption } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
import mapJsonWithoutHainanIsLands from './mapWithoutHainanIsLands.json'
import mapChinaJson from './mapGeojson/china.json'
import { DatasetComponent, GridComponent, TooltipComponent, GeoComponent, VisualMapComponent } from 'echarts/components'

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

const { ArrowBackIcon } = icon.ionicons5
let levelHistory: any = ref([])
const mapReady = ref(false)

const { backColor, backSize, enter } = toRefs(props.chartConfig.option.mapRegion)
const initOptions = { ...useCanvasInitOptions(props.chartConfig.option, props.themeSetting), renderer: 'canvas' }

use([
  MapChart,
  DatasetComponent,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  GeoComponent,
  EffectScatterChart,
  VisualMapComponent
])

// Cập nhật tên bản đồ trong cấu hình để khớp với adcode trước khi khởi tạo reactive
const initialAdcode = `${props.chartConfig.option.mapRegion.adcode}`
props.chartConfig.option.geo.map = initialAdcode
props.chartConfig.option.series.forEach((item: any) => {
  if (item.type === 'map') item.map = initialAdcode
})

const option = reactive({
  value: mergeTheme(props.chartConfig.option, props.themeSetting, includes)
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

  if (adCode !== 'china') {
    await getGeojson(adCode)
  } else {
    await hainanLandsHandle(props.chartConfig.option.mapRegion.showHainanIsLands)
  }
  // Reactive update
  option.value = props.chartConfig.option
  mapReady.value = true
  await nextTick()
  vEchartsSetOption()
}
registerMapInitAsync()

// Kích hoạt kết xuất theo cách thủ công
const vEchartsSetOption = () => {
  option.value = props.chartConfig.option
  if (vChartRef.value) {
    setOption(vChartRef.value, props.chartConfig.option)
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
            color: props.chartConfig.option.series[2]?.lineStyle?.color || props.chartConfig.option.series[2]?.lineStyle?.normal?.color
          }
        }
      })
    } else if (item.type === 'map' && dataset.map) item.data = dataset.map
  })
  if (dataset.pieces) props.chartConfig.option.visualMap.pieces = dataset.pieces

  isPreview() && vEchartsSetOption()
}
// Đối phó với quần đảo Hải Nam
const hainanLandsHandle = async (newData: boolean) => {
  if (newData) {
    await getGeojson('china')
  } else {
    registerMap('china', { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} })
  }
}

// vùng nhấp chuột
const chartPEvents = (e: any) => {
  if (e.seriesType !== 'map') return
  if (!props.chartConfig.option.mapRegion.enter) {
    return
  }
  mapChinaJson.features.forEach(item => {
    var pattern = new RegExp(e.name)
    if (pattern.test(item.properties.name)) {
      let code = String(item.properties.adcode)
      levelHistory.value.push(code)
      checkOrMap(code)
    }
  })
}

// trở lại{{ $t('phase7.auto_510') }}Cấp 1
const backLevel = () => {
  levelHistory.value = []
  if (levelHistory.value.length > 1) {
    levelHistory.value.pop()
    const code = levelHistory[levelHistory.value.length - 1]
    checkOrMap(code)
  } else {
    checkOrMap('china')
  }
}

// Chuyển đổi bản đồ
const checkOrMap = async (newData: string) => {
  if (newData === 'china') {
    if (props.chartConfig.option.mapRegion.showHainanIsLands) {
      // {{ $t('phase7.auto_227') }}Biển Đông
      hainanLandsHandle(true)
      vEchartsSetOption()
    } else {
      // Biển Đông ẩn giấu
      hainanLandsHandle(false)
      vEchartsSetOption()
    }
  } else {
    await getGeojson(newData)
  }
  props.chartConfig.option.geo.map = newData
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
    () => props.chartConfig.option.series[2]?.lineStyle?.color || props.chartConfig.option.series[2]?.lineStyle?.normal?.color,
    () => {
      dataSetHandle(props.chartConfig.option.dataset)
    },
    {
      deep: false
    }
  )
}

//Giám sát xem{{ $t('phase7.auto_372') }}
if (!isPreview()) {
  watch(
    () => props.chartConfig.option.mapRegion.showHainanIsLands,
    async newData => {
      try {
        await hainanLandsHandle(newData)
        vEchartsSetOption()
      } catch (error) {
        console.log(error)
      }
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
