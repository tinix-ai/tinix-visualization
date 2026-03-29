<template>
  <div
    class="chart-item"
    :id="item.id"
    v-for="(item, index) in chartEditStore.componentList"
    :class="item.styles ? animationsClass(item.styles.animations) : ''"
    :key="item.id"
    :style="{
      ...getComponentAttrStyle(item.attr, index),
      ...getTransformStyle(item.styles),
      ...getStatusStyle(item.status),
      ...getPreviewConfigStyle(item.preview),
      ...(item.styles ? getBlendModeStyle(item.styles) : {}) as any,
      ...getSizeStyle(item.attr)
    }"
  >
    <!-- PhútNhóm -->
    <preview-render-group
      v-if="item.isGroup"
      :groupData="(item as CreateComponentGroupType)"
      :groupIndex="index"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
    ></preview-render-group>

    <!-- Single Component -->
    <component
      v-else
      :is="item.chartConfig.chartKey"
      :id="item.id"
      :chartConfig="item"
      :themeSetting="themeSetting"
      :themeColor="themeColor"
      :style="{ 
        ...getSizeStyle(item.attr),
        ...(item.styles ? getFilterStyle(item.styles) : {})
      }"
      v-on="useLifeHandler(item)"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted } from 'vue'
import { useChartDataPondFetch } from '@/hooks'
import { ChartEditStorageType } from '../../index.d'
import { PreviewRenderGroup } from '../PreviewRenderGroup/index'
import { CreateComponentGroupType } from '@/packages/index.d'
import { chartColors } from '@/settings/chartThemes/index'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle, colorCustomMerge } from '@/utils'
import { getSizeStyle, getComponentAttrStyle, getStatusStyle, getPreviewConfigStyle } from '../../utils'
import { useLifeHandler } from '@/hooks'

// khởi tạoDữ liệuhồ bơi
const { initDataPond, clearMittDataPondMap } = useChartDataPondFetch()
const chartEditStore = useChartEditStore()

// const props = defineProps({
//   localStorageInfo: {
//     type: Object as PropType<ChartEditStorageType>,
//     required: true
//   }
// })

// màu chủ đề
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.editCanvasConfig.chartThemeSetting
  return chartThemeSetting || {}
})

// Các mục cấu hình
const themeColor = computed(() => {
  try {
    const colorCustomMergeData = colorCustomMerge(chartEditStore.editCanvasConfig.chartCustomThemeColorInfo)
    const res = colorCustomMergeData[chartEditStore.editCanvasConfig.chartThemeColor]
    if (!res) {
       console.warn(`[PreviewRenderList] Theme Color '${chartEditStore.editCanvasConfig.chartThemeColor}' not found, falling back to dark.`)
       return colorCustomMergeData['dark']
    }
    return res
  } catch (e) {
    console.error('[PreviewRenderList] Error calculating themeColor:', e)
    // Emergency fallback to dark theme from base chartColors
    return colorCustomMerge([])['dark']
  }
})

// Kết xuất thành phần kết thúc quá trình khởi tạoDữ liệuhồ bơi
clearMittDataPondMap()
onMounted(() => {
  initDataPond(useChartEditStore)
})
</script>

<style lang="scss" scoped>
.chart-item {
  position: absolute;
}
</style>
