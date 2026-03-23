<template>
  <div class="go-edit-align-line">
    <div
      class="line"
      v-for="item in line.lineArr"
      :key="item"
      :class="[item.includes('row') ? 'row' : 'col', line['select'].has(item) && 'visible']"
      :style="useComponentStyle(line['select'].get(item))"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { setComponentPosition } from '@/utils'
import throttle from 'lodash/throttle'
import cloneDeep from 'lodash/cloneDeep'
// màu sắc toàn cầu
const designStore = useDesignStore()

const chartEditStore = useChartEditStore()
const settingStore = useSettingStore()

// * Bộ sưu tập dòng
const line = reactive({
  // hàng ngangrow(trên, giữa và dưới), đường thẳng đứng của cộtcol(trái ở giữa bên phải)
  lineArr: ['rowt', 'rowc', 'rowb', 'coll', 'colc', 'colr'],
  // dòng hiển thị
  select: new Map(),
  // Đã hấp phụ
  sorptioned: {
    x: false,
    y: false
  }
})

// * Tính toán vị trí
const useComponentStyle = (attr?: Partial<{ x: number; y: number }>) => {
  if (!attr) return {}
  const componentStyle = {
    left: `${attr.x ? attr.x : 0}px`,
    top: `${attr.y ? attr.y : 0}px`
  }
  return componentStyle
}

// màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// * khoảng cách hấp phụ
const minDistance = computed(() => {
  return settingStore.getChartAlignRange
})

// * Có nên bắt đầu tính toán hay không
const isComputedLine = computed(() => {
  // IS_DRAG Khi di chuyển true，Drag Hookcài đặt trong
  const isDrag = chartEditStore.getEditCanvas[EditCanvasTypeEnum.IS_DRAG]
  return isDrag
})

// * Phán đoán hấp phụ
const isSorption = (selectValue: number, componentValue: number) => {
  const isSorption = Math.abs(selectValue - componentValue) <= minDistance.value
  return isSorption
}

// * mục tiêu hiện tại
const selectId = computed(() => chartEditStore.getTargetChart.selectId)
const selectTarget = computed(() => chartEditStore.getComponentList[chartEditStore.fetchTargetIndex()])
const selectAttr = computed(() => selectTarget.value?.attr || {})

// * tọa độ canvas
const canvasPositionList = computed(() => {
  return {
    id: '0',
    attr: {
      w: cloneDeep(chartEditStore.getEditCanvasConfig.width),
      h: cloneDeep(chartEditStore.getEditCanvasConfig.height),
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0,
      zIndex: 0
    }
  }
})

// * Theo dõi chuyển động của chuột
watch(
  () => chartEditStore.getMousePosition,
  throttle(() => {
    try {
      if (!isComputedLine.value || selectId.value.length !== 1) return
      // Nhận dữ liệu thành phần mục tiêu

      const selectW = selectAttr.value.w
      const selectH = selectAttr.value.h

      // Khoảng cách bên trái
      const selectLeftX = selectAttr.value.x
      const selectHalfX = selectLeftX + selectW / 2
      const selectRightX = selectLeftX + selectW
      const seletX = [selectLeftX, selectHalfX, selectRightX]

      // khoảng cách từ đầu
      const selectTopY = selectAttr.value.y
      const selectHalfY = selectTopY + selectH / 2
      const selectBottomY = selectTopY + selectH
      const selectY = [selectTopY, selectHalfY, selectBottomY]

      line.select.clear()
      line.sorptioned.y = false
      // Lặp lại tất cả dữ liệu thành phần
      const componentList = chartEditStore.getComponentList.map((e: CreateComponentType | CreateComponentGroupType) => {
        return {
          id: e.id,
          attr: e.attr
        }
      })
      componentList.push(canvasPositionList.value)
      // Truyền dữ liệu canvas
      line.lineArr.forEach(lineItem => {
        componentList.forEach((component: typeof canvasPositionList.value) => {
          // loại trừ chính mình
          if (selectId.value[0] === component.id) return
          const componentW = component.attr.w
          const componentH = component.attr.h

          // Khoảng cách bên trái
          const componentLeftX = component.attr.x
          const componentHalfX = componentLeftX + componentW / 2
          const componentRightX = componentLeftX + componentW
          const componentX = [componentLeftX, componentHalfX, componentRightX]

          // khoảng cách từ đầu
          const componentTopY = component.attr.y
          const componentHalfY = componentTopY + componentH / 2
          const componentBottomY = componentTopY + componentH
          const componentY = [componentTopY, componentHalfY, componentBottomY]

          // Đường ngang so sánh Y
          if (lineItem.includes('rowt')) {
            // đứng đầu
            if (isSorption(selectTopY, componentTopY)) {
              line.select.set(lineItem, { y: componentTopY })
              setComponentPosition(selectTarget.value, selectLeftX, componentTopY)
            }
            if (isSorption(selectTopY, componentHalfY)) {
              line.select.set(lineItem, { y: componentHalfY })
              setComponentPosition(selectTarget.value, selectLeftX, componentHalfY)
            }
            if (isSorption(selectTopY, componentBottomY)) {
              line.select.set(lineItem, { y: componentBottomY })
              setComponentPosition(selectTarget.value, selectLeftX, componentBottomY)
            }
          }
          if (lineItem.includes('rowc')) {
            // đứng đầu
            if (isSorption(selectHalfY, componentTopY)) {
              line.select.set(lineItem, { y: componentTopY })
              setComponentPosition(selectTarget.value, selectLeftX, componentTopY - selectH / 2)
            }
            if (isSorption(selectHalfY, componentHalfY)) {
              line.select.set(lineItem, { y: componentHalfY })
              setComponentPosition(selectTarget.value, selectLeftX, componentHalfY - selectH / 2)
            }
            if (isSorption(selectHalfY, componentBottomY)) {
              line.select.set(lineItem, { y: componentBottomY })
              setComponentPosition(selectTarget.value, selectLeftX, componentBottomY - selectH / 2)
            }
          }
          if (lineItem.includes('rowb')) {
            // đứng đầu
            if (isSorption(selectBottomY, componentTopY)) {
              line.select.set(lineItem, { y: componentTopY })
              setComponentPosition(selectTarget.value, selectLeftX, componentTopY - selectH)
            }
            if (isSorption(selectBottomY, componentHalfY)) {
              line.select.set(lineItem, { y: componentHalfY })
              setComponentPosition(selectTarget.value, selectLeftX, componentHalfY - selectH)
            }
            if (isSorption(selectBottomY, componentBottomY)) {
              line.select.set(lineItem, { y: componentBottomY })
              setComponentPosition(selectTarget.value, selectLeftX, componentBottomY - selectH)
            }
          }

          // Đường thẳng đứng so sánh X
          if (lineItem.includes('coll')) {
            if (isSorption(selectLeftX, componentLeftX)) {
              line.select.set(lineItem, { x: componentLeftX })
              setComponentPosition(selectTarget.value, componentLeftX, selectTopY)
            }
            if (isSorption(selectLeftX, componentHalfX)) {
              line.select.set(lineItem, { x: componentHalfX })
              setComponentPosition(selectTarget.value, componentHalfX, selectTopY)
            }
            if (isSorption(selectLeftX, componentRightX)) {
              line.select.set(lineItem, { x: componentRightX })
              setComponentPosition(selectTarget.value, componentRightX, selectTopY)
            }
          }
          if (lineItem.includes('colc')) {
            if (isSorption(selectHalfX, componentLeftX)) {
              line.select.set(lineItem, { x: componentLeftX })
              setComponentPosition(selectTarget.value, componentLeftX - selectW / 2, selectTopY)
            }
            if (isSorption(selectHalfX, componentHalfX)) {
              line.select.set(lineItem, { x: componentHalfX })
              setComponentPosition(selectTarget.value, componentHalfX - selectW / 2, selectTopY)
            }
            if (isSorption(selectHalfX, componentRightX)) {
              line.select.set(lineItem, { x: componentRightX })
              setComponentPosition(selectTarget.value, componentRightX - selectW / 2, selectTopY)
            }
          }
          if (lineItem.includes('colr')) {
            if (isSorption(selectRightX, componentLeftX)) {
              line.select.set(lineItem, { x: componentLeftX })
              setComponentPosition(selectTarget.value, componentLeftX - selectW, selectTopY)
            }
            if (isSorption(selectRightX, componentHalfX)) {
              line.select.set(lineItem, { x: componentHalfX })
              setComponentPosition(selectTarget.value, componentHalfX - selectW, selectTopY)
            }
            if (isSorption(selectRightX, componentRightX)) {
              line.select.set(lineItem, { x: componentRightX })
              setComponentPosition(selectTarget.value, componentRightX - selectW, selectTopY)
            }
          }
        })
      })
    } catch (err) {
      console.log(err)
    }
  }, 200),
  {
    deep: true
  }
)

// * Hủy căn chỉnh dòng
watch(
  () => isComputedLine.value,
  (val: boolean) => {
    if (!val) {
      line.select.clear()
      line.sorptioned.y = false
    }
  }
)
</script>

<style lang="scss" scoped>
@include go(edit-align-line) {
  .line {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    border-width: 1px;
    border-style: solid;
    border-color: v-bind('themeColor');
    opacity: 0.7;
    &.visible {
      display: block;
    }
  }
  .row {
    width: 100%;
  }
  .col {
    height: 100%;
  }
}
</style>
