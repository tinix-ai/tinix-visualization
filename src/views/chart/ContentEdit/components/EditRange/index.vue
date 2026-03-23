<template>
  <div class="go-edit-range go-transition" :style="rangeStyle" @mousedown="mousedownBoxSelect($event, undefined)">
    <slot></slot>
    <!-- hình mờ -->
    <edit-watermark></edit-watermark>
    <!-- lôi kéoGiCác dòng phụ cho ờ -->
    <edit-align-line></edit-align-line>
    <!-- Lựa chọn khungGiờ hộp kiểu -->
    <edit-select></edit-select>
    <!-- lôi kéoGiMặt nạ cho ờ -->
    <div class="go-edit-range-model" :style="rangeModelStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
import { useSizeStyle } from '../../hooks/useStyle.hook'
import { canvasModelIndex } from '@/settings/designSetting'
import { mousedownBoxSelect } from '../../hooks/useDrag.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditAlignLine } from '../EditAlignLine'
import { EditWatermark } from '../EditWatermark'
import { EditSelect } from '../EditSelect'

const chartEditStore = useChartEditStore()

const { getEditCanvasConfig, getEditCanvas } = toRefs(chartEditStore)

const size = computed(() => {
  return {
    w: getEditCanvasConfig.value.width,
    h: getEditCanvasConfig.value.height
  }
})

const rangeStyle = computed(() => {
  // Phóng
  const scale = {
    transform: `scale(${getEditCanvas.value.scale})`
  }
  // @ts-ignore
  return { ...useSizeStyle(size.value), ...scale }
})

// lớp phương thức
const rangeModelStyle = computed(() => {
  const dragStyle = getEditCanvas.value.isCreate && { 'z-index': 99999 }
  // @ts-ignore
  return { ...useSizeStyle(size.value), ...dragStyle }
})
</script>

<style lang="scss" scoped>
@include go(edit-range) {
  position: relative;
  transform-origin: left top;
  background-size: cover;
  overflow: hidden;
  @include fetch-border-color('hover-border-color');
  @include fetch-bg-color('background-color2');
  @include go(edit-range-model) {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
