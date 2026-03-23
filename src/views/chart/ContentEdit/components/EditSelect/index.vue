<template>
  <div class="go-edit-select" v-if="isSelect" :style="positionStyle">
    <div class="select-background"></div>
    <div class="select-border"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useSizeStyle, useComponentStyle } from '../../hooks/useStyle.hook'
import { selectBoxIndex } from '@/settings/designSetting'

// màu sắc toàn cầu
const designStore = useDesignStore()
const chartEditStore = useChartEditStore()
const { isSelect, scale } = toRefs(chartEditStore.getEditCanvas)

const themeColor = computed(() => {
  return designStore.getAppTheme
})

// Vị trí
const positionStyle = ref()

watch(
  () => chartEditStore.getMousePosition,
  positionInfo => {
    if (!isSelect.value) return

    // Đây là x,y là giá trị dịch chuyển tương đối được tính toán
    const { startX, startY, x, y } = positionInfo

    const attr = {
      zIndex: selectBoxIndex,
      // left
      x: 0,
      // top
      y: 0,
      // Chiều rộng
      w: 0,
      // cao
      h: 0,
      // bù lại
      offsetX: 0,
      offsetY: 0
    }

    // địa điểm xử lý
    if (x > startX && y > startY) {
      // Hướng dưới bên phải
      attr.x = startX
      attr.y = startY
      attr.w = Math.round((x - startX) / scale.value)
      attr.h = Math.round((y - startY) / scale.value)
    } else if (x > startX && y < startY) {
      // Hướng trên bên phải
      attr.x = startX
      attr.w = Math.round((x - startX) / scale.value)
      attr.h = Math.round((startY - y) / scale.value)
      attr.y = startY - attr.h
    } else if (x < startX && y > startY) {
      // Hướng dưới bên trái
      attr.y = startY
      attr.w = Math.round((startX - x) / scale.value)
      attr.h = Math.round((y - startY) / scale.value)
      attr.x = startX - attr.w
    } else {
      // Hướng trên bên trái
      attr.w = Math.round((startX - x) / scale.value)
      attr.h = Math.round((startY - y) / scale.value)
      attr.x = startX - attr.w
      attr.y = startY - attr.h
    }

    positionStyle.value = {
      ...useComponentStyle(attr, selectBoxIndex),
      ...useSizeStyle(attr)
    }
  },
  {
    deep: true
  }
)
</script>

<style lang="scss" scoped>
@include go('edit-select') {
  position: absolute;
  .select-border,
  .select-background {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .select-border {
    left: 0;
    top: 0;
    opacity: 1;
    border-width: 1px;
    border-style: solid;
    border-color: v-bind('themeColor');
  }
  .select-background {
    top: 2px;
    left: 2px;
    opacity: 0.08;
    background-color: v-bind('themeColor');
  }
}
</style>
