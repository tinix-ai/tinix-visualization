<template>
  <!-- <edit-rule></edit-rule> -->
  <content-box
    id="go-chart-edit-layout"
    :flex="true"
    :showTop="false"
    :showBottom="true"
    :depth="1"
    :xScroll="true"
    :disabledScroll="true"
    @mousedown="mousedownHandleUnStop"
    @drop="dragHandle"
    @dragover="dragoverHandle"
    @dragenter="dragoverHandle"
  >
    <edit-rule>
      <!-- cơ thể vải -->
      <div id="go-chart-edit-content" @contextmenu="handleContextMenu">
        <!-- Xem / Hát -->
        <edit-range>
          <!-- Xem trước Màu Tone -->
          <div
            :style="{
              ...getFilterStyle(chartEditStore.getEditCanvasConfig),
              ...rangeStyle
            }"
          >
            <!-- Biểu đồ -->
            <div v-for="(item, index) in chartEditStore.getComponentList" :key="item.id">
              <!-- PhútNhóm -->
              <edit-group
                v-if="item.isGroup"
                :groupData="(item as CreateComponentGroupType)"
                :groupIndex="index"
              ></edit-group>

              <!-- Single Component -->
              <edit-shape-box
                v-else
                :data-id="item.id"
                :index="index"
                :style="{
                ...useComponentStyle(item.attr, index),
                ...(item.styles ? getBlendModeStyle(item.styles) : {}) as any
              }"
                :item="item"
                @click="mouseClickHandle($event, item)"
                @mousedown="mousedownHandle($event, item)"
                @mouseenter="mouseenterHandle($event, item)"
                @mouseleave="mouseleaveHandle($event, item)"
                @contextmenu="handleContextMenu($event, item, optionsHandle)"
              >
                <component
                  class="edit-content-chart"
                  :class="item.styles ? animationsClass(item.styles.animations) : ''"
                  :is="item.chartConfig.chartKey"
                  :chartConfig="item"
                  :themeSetting="themeSetting"
                  :themeColor="themeColor"
                  :style="{
                    ...useSizeStyle(item.attr),
                    ...(item.styles ? getFilterStyle(item.styles) : {}),
                    ...(item.styles ? getTransformStyle(item.styles) : {})
                  }"
                ></component>
              </edit-shape-box>
            </div>
          </div>
        </edit-range>
      </div>
    </edit-rule>

    <!-- Thanh Tool -->
    <template #aside>
      <edit-tools></edit-tools>
    </template>

    <!-- Dưới cùngđiều khiển -->
    <template #bottom>
      <EditBottom></EditBottom>
    </template>
  </content-box>
</template>

<script lang="ts" setup>
import { onMounted, computed, provide, watch } from 'vue'
import { chartColors } from '@/settings/chartThemes/index'
import { MenuEnum } from '@/enums/editPageEnum'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { animationsClass, getFilterStyle, getTransformStyle, getBlendModeStyle, colorCustomMerge } from '@/utils'
import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook'
import { MenuOptionsItemType } from '@/views/chart/hooks/useContextMenu.hook.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { SCALE_KEY } from '@/views/preview/hooks/useScale.hook'
import { useLayout } from './hooks/useLayout.hook'
import { useAddKeyboard } from '../hooks/useKeyboard.hook'
import { dragHandle, dragoverHandle, mousedownHandleUnStop, useMouseHandle } from './hooks/useDrag.hook'
import { useComponentStyle, useSizeStyle } from './hooks/useStyle.hook'
import { useInitVChartsTheme } from '@/hooks'

import { ContentBox } from '../ContentBox/index'
import { EditGroup } from './components/EditGroup'
import { EditRange } from './components/EditRange'
import { EditRule } from './components/EditRule'
import { EditBottom } from './components/EditBottom'
import { EditShapeBox } from './components/EditShapeBox'
import { EditTools } from './components/EditTools'

const chartEditStore = useChartEditStore()
const { handleContextMenu } = useContextMenu()

// Sửa (Edit)Gisự phóng thíchscalebiến, loại bỏ cảnh báo
provide(SCALE_KEY, null)

// Xử lý bố cục
useLayout(async () => {})

// nhấp chuộtSự kiện
const { mouseenterHandle, mouseleaveHandle, mousedownHandle, mouseClickHandle } = useMouseHandle()

// Nhấp chuột phảiSự kiện
const optionsHandle = (
  targetList: MenuOptionsItemType[],
  allList: MenuOptionsItemType[],
  targetInstance: CreateComponentType
) => {
  // Xử lý nhiều lựa chọn
  if (chartEditStore.getTargetChart.selectId.length > 1) {
    return allList.filter(i => [MenuEnum.GROUP, MenuEnum.DELETE].includes(i.key as MenuEnum))
  }
  const statusMenuEnums: MenuEnum[] = []
  if (targetInstance.status.lock) {
    statusMenuEnums.push(MenuEnum.LOCK)
  } else {
    statusMenuEnums.push(MenuEnum.UNLOCK)
  }
  if (targetInstance.status.hide) {
    statusMenuEnums.push(MenuEnum.HIDE)
  } else {
    statusMenuEnums.push(MenuEnum.SHOW)
  }
  return targetList.filter(i => !statusMenuEnums.includes(i.key as MenuEnum))
}

// màu chủ đề
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.getEditCanvasConfig.chartThemeSetting
  return chartThemeSetting || {}
})

// Các mục cấu hình
const themeColor = computed(() => {
  const colorCustomMergeData: any = colorCustomMerge(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo)
  return colorCustomMergeData[chartEditStore.getEditCanvasConfig.chartThemeColor]
})

// liệuXem / Hátkết xuất
const filterShow = computed(() => {
  return chartEditStore.getEditCanvasConfig.filterShow
})

// Background
const rangeStyle = computed(() => {
  // Cài Đặt ChỉnhBackgroundMàu sắc và hình ảnhBackground
  const background = chartEditStore.getEditCanvasConfig.background
  const backgroundImage = chartEditStore.getEditCanvasConfig.backgroundImage
  const selectColor = chartEditStore.getEditCanvasConfig.selectColor
  const backgroundColor = background ? background : undefined

  const computedBackground = selectColor
    ? { background: backgroundColor }
    : { background: `url(${backgroundImage}) no-repeat center center / cover !important` }

  return {
    ...computedBackground,
    width: 'inherit',
    height: 'inherit'
  }
})

// Đối phó với toàn cầu vChart chủ đề
useInitVChartsTheme(chartEditStore)

// bàn phímSự kiện
onMounted(() => {
  useAddKeyboard()
})
</script>

<style lang="scss" scoped>
@include goId('chart-edit-layout') {
  position: relative;
  width: 100%;
  overflow: hidden;
  @extend .go-point-bg;
  @include background-image('background-point');

  @include goId('chart-edit-content') {
    overflow: hidden;
    @extend .go-transition;
    @include fetch-theme('box-shadow');

    .edit-content-chart {
      position: absolute;
      overflow: hidden;
    }
  }
}
</style>
