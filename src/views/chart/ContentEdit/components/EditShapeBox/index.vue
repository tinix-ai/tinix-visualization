<template>
  <div class="go-shape-box" :class="{ lock, hide }">
    <slot></slot>
    <!-- Điểm Neo Pin -->
    <template v-if="!hiddenPoint">
      <div
        :class="`shape-point ${point}`"
        v-for="(point, index) in select ? pointList : []"
        :key="index"
        :style="usePointStyle(point, index, item.attr, cursorResize)"
        @mousedown="useMousePointHandle($event, point, item.attr)"
      ></div>
    </template>

    <!-- Trạng Trái Hover Active -->
    <div class="shape-modal" :style="useSizeStyle(item.attr)">
      <div class="shape-modal-select" :class="{ active: select }"></div>
      <div class="shape-modal-change" :class="{ selectActive: select, hoverActive: hover }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

import { useDesignStore } from '@/store/modules/designStore/designStore'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { useSizeStyle, usePointStyle } from '../../hooks/useStyle.hook'
import { useMousePointHandle } from '../../hooks/useDrag.hook'

const props = defineProps({
  item: {
    type: Object as PropType<CreateComponentType | CreateComponentGroupType>,
    required: true
  },
  hiddenPoint: {
    type: Boolean,
    required: false
  }
})

const designStore = useDesignStore()
const chartEditStore = useChartEditStore()

// Điểm Neo Pin
const pointList = ['t', 'r', 'b', 'l', 'lt', 'rt', 'lb', 'rb']

// hướng con trỏ
const cursorResize = ['n', 'e', 's', 'w', 'nw', 'ne', 'sw', 'se']

// Màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// Tính toán hiện tạiTrạng Trái Hover ActiveMục tiêu
const hover = computed(() => {
  const isDrag = chartEditStore.getEditCanvas[EditCanvasTypeEnum.IS_DRAG]
  if (isDrag) return false

  if (props.item.status.lock) return false
  return props.item.id === chartEditStore.getTargetChart.hoverId
})

// Tương thích với các kịch bản đa giá trị
const select = computed(() => {
  const id = props.item.id
  if (props.item.status.lock) return false
  return chartEditStore.getTargetChart.selectId.find((e: string) => e === id)
})

// khóa
const lock = computed(() => {
  return props.item.status.lock
})

// trốn
const hide = computed(() => {
  return props.item.status.hide
})
</script>

<style lang="scss" scoped>
@include go(shape-box) {
  position: absolute;
  cursor: move;

  &.lock {
    cursor: default !important;
  }

  &.hide {
    display: none;
  }

  /* Điểm Neo Pin */
  .shape-point {
    z-index: 1;
    position: absolute;
    width: 7px;
    height: 7px;
    border: 3px solid v-bind('themeColor');
    border-radius: 5px;
    background-color: #fff;
    transform: translate(-40%, -30%);
    &.t {
      width: 30px;
      transform: translate(-50%, -50%);
    }
    &.b {
      width: 30px;
      transform: translate(-50%, -30%);
    }
    &.l,
    &.r {
      height: 30px;
    }
    &.r {
      transform: translate(-20%, -50%);
    }
    &.l {
      transform: translate(-45%, -50%);
    }
    &.rt,
    &.rb {
      transform: translate(-30%, -30%);
    }
  }
  /* Trạng Trái Hover Active */
  .shape-modal {
    position: absolute;
    top: 0;
    left: 0;

    .shape-modal-select,
    .shape-modal-change {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }

    .shape-modal-select {
      opacity: 0.1;
      top: 2px;
      left: 2px;
      &.active {
        background-color: v-bind('themeColor');
      }
    }
    .shape-modal-change {
      border: 2px solid rgba(0, 0, 0, 0);
      &.selectActive,
      &.hoverActive {
        border-color: v-bind('themeColor');
        border-width: 2px;
      }
      &.hoverActive {
        border-style: dotted;
      }
      &.selectActive {
        border-style: solid;
      }
    }
  }
}
</style>
