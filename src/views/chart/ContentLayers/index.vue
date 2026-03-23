<template>
  <content-box
    class="go-content-layers"
    :class="{ scoped: !chartLayoutStore.getLayers }"
    :title="$t('views_components.auto_307')"

    :depth="2"
    @back="backHandle"
    @mousedown="boxMousedownHandle($event)"
  >
    <template #icon>
      <n-icon size="16" :depth="2" :component="LayersIcon" />
    </template>

    <template #top-right>
      <n-button-group style="display: flex">
        <n-button
          v-for="(item, index) in layerModeList"
          :key="index"
          ghost
          size="small"
          :type="layerMode === item.value ? 'primary' : 'tertiary'"
          @click="changeLayerType(item.value)"
        >
          <n-tooltip :show-arrow="false" trigger="hover">
            <template #trigger>
              <n-icon size="14" :component="item.icon" />
            </template>
            {{ item.label }}
          </n-tooltip>
        </n-button>
      </n-button-group>
    </template>

    <!-- Lớp Object Class -->
    <n-space v-if="reverseList.length === 0" justify="center">
      <n-text class="not-layer-text">{{ $t('phase7.auto_89') }}</n-text>
    </n-space>

    <!-- https://github.com/SortableJS/vue.draggable.next -->
    <draggable item-key="id" v-model="layerList" ghostClass="ghost" @change="onMoveCallback">
      <template #item="{ element }">
        <div class="go-content-layer-box">
          <!-- Group -->
          <layers-group-list-item
            v-if="element.isGroup"
            :componentGroupData="element"
            :layer-mode="layerMode"
          ></layers-group-list-item>
          <!-- Single Component -->
          <layers-list-item
            v-else
            :componentData="element"
            :layer-mode="layerMode"
            @mousedown="mousedownHandle($event, element)"
            @mouseenter="mouseenterHandle(element)"
            @mouseleave="mouseleaveHandle(element)"
            @contextmenu="handleContextMenu($event, element, optionsHandle)"
          ></layers-list-item>
        </div>
      </template>
    </draggable>
  </content-box>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Draggable from 'vuedraggable'
import cloneDeep from 'lodash/cloneDeep'
import { ContentBox } from '../ContentBox/index'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum, LayerModeEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { MenuOptionsItemType } from '@/views/chart/hooks/useContextMenu.hook.d'
import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook'
import { MenuEnum, MouseEventButton, WinKeyboard, MacKeyboard } from '@/enums/editPageEnum'

import { LayersListItem } from './components/LayersListItem/index'
import { LayersGroupListItem } from './components/LayersGroupListItem/index'

import { icon } from '@/plugins'

const { LayersIcon, GridIcon, ListIcon } = icon.ionicons5
const { LaptopIcon } = icon.carbon
const chartLayoutStore = useChartLayoutStore()
const chartEditStore = useChartEditStore()
const { handleContextMenu, onClickOutSide } = useContextMenu()

const layerModeList = [
  { label: window['$t']('views_components.auto_308'), icon: LaptopIcon, value: LayerModeEnum.THUMBNAIL },
  { label: window['$t']('views_components.auto_306'), icon: ListIcon, value: LayerModeEnum.TEXT }
]

const layerList = ref<any>([])
const layerMode = ref<LayerModeEnum>(chartLayoutStore.getLayerType)

// Đảo ngược thứ tựXem / Hát
const reverseList = computed(() => {
  const list: Array<CreateComponentType | CreateComponentGroupType> = cloneDeep(chartEditStore.getComponentList)
  return list.reverse()
})

watch(
  () => reverseList.value,
  newValue => {
    layerList.value = newValue
  }
)

// Nhấp chuột phảiSự kiện
const optionsHandle = (
  targetList: MenuOptionsItemType[],
  allList: MenuOptionsItemType[],
  targetInstance: CreateComponentType
) => {
  // Xử lý nhiều lựa chọn
  if (chartEditStore.getTargetChart.selectId.length > 1) {
    return targetList.filter(i => i.key === MenuEnum.GROUP)
  }
  const statusMenuEnums: MenuEnum[] = []
  // Xử lý khóa và ẩn
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
  return targetList.filter(item => !statusMenuEnums.includes(item.key as MenuEnum))
}

// thu nhỏ
const backHandle = () => {
  chartLayoutStore.setItem(ChartLayoutStoreEnum.LAYERS, false)
}

// Di chuyển kết thúc quá trình xử lý
const onMoveCallback = (val: any) => {
  const { oldIndex, newIndex } = val.moved
  if (newIndex - oldIndex > 0) {
    // từ{{ $t('phase7.auto_510') }}xuống
    const moveTarget = chartEditStore.getComponentList.splice(-(oldIndex + 1), 1)[0]
    chartEditStore.getComponentList.splice(-newIndex, 0, moveTarget)
  } else {
    // từ dưới lên trênTrên
    const moveTarget = chartEditStore.getComponentList.splice(-(oldIndex + 1), 1)[0]
    if (newIndex === 0) {
      chartEditStore.getComponentList.push(moveTarget)
    } else {
      chartEditStore.getComponentList.splice(-newIndex, 0, moveTarget)
    }
  }
}

const boxMousedownHandle = (e: MouseEvent) => {
  const box = document.querySelector('.go-content-layer-box')
  if ((e.target as any).contains(box)) {
    chartEditStore.setTargetSelectChart()
  }
}

// nhấp chuộtSự kiện
const mousedownHandle = (e: MouseEvent, item: CreateComponentType) => {
  onClickOutSide()
  // Nếu vậy{{ $t('phase7.auto_10') }}ép CTRL, Cho biết nhiều lựa chọn
  const id = item.id
  if (e.buttons === MouseEventButton.LEFT && window.$KeyboardActive?.ctrl) {
    // Nếu đãTrạng Trái Hover Active, sau đó loại bỏ
    if (chartEditStore.targetChart.selectId.includes(id)) {
      const exList = chartEditStore.targetChart.selectId.filter(e => e !== id)
      chartEditStore.setTargetSelectChart(exList)
    } else {
      chartEditStore.setTargetSelectChart(id, true)
    }
    return
  }
  chartEditStore.setTargetSelectChart(id)
}

// Đi vàoSự kiện
const mouseenterHandle = (item: CreateComponentType) => {
  chartEditStore.setTargetHoverChart(item.id)
}

// dọn ra ngoàiSự kiện
const mouseleaveHandle = (item: CreateComponentType) => {
  chartEditStore.setTargetHoverChart(undefined)
}

// Sửa đổi lớpXem / HátĐường
const changeLayerType = (value: LayerModeEnum) => {
  layerMode.value = value
  chartLayoutStore.setItem(ChartLayoutStoreEnum.LAYER_TYPE, value)
}
</script>

<style lang="scss" scoped>
$wight: 200px;
@include go('content-layers') {
  width: $wight;
  overflow: hidden;
  @extend .go-transition;
  .not-layer-text {
    position: relative;
    top: 10px;
    white-space: nowrap;
    opacity: 0.4;
  }
  &.scoped {
    width: 0;
  }
  .ghost {
    opacity: 0;
  }
  .go-layer-mode-active {
    color: #51d6a9;
  }
}
</style>
