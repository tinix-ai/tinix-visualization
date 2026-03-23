<template>
  <n-space class="header-left-btn" :wrap="false" :size="25">
    <n-button size="small" quaternary @click="goHomeHandle()">
      <template #icon>
        <n-icon :depth="3">
          <home-icon></home-icon>
        </n-icon>
      </template>
    </n-button>
    <n-space :wrap="false">
      <!-- mô-đunXem / Hátcái nút -->
      <n-tooltip v-for="item in btnList" :key="item.key" placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="small" ghost :type="styleHandle(item)" :focusable="false" @click="clickHandle(item)">
            <component :is="item.icon"></component>
          </n-button>
        </template>
        <span>{{ item.title }}</span>
      </n-tooltip>

      <n-divider vertical />

      <!-- Lịch Sử Undocái nút -->
      <n-tooltip v-for="item in historyList" :key="item.key" placement="bottom" trigger="hover">
        <template #trigger>
          <n-button size="small" ghost type="primary" :disabled="!item.select" @click="clickHistoryHandle(item)">
            <component :is="item.icon"></component>
          </n-button>
        </template>
        <span>{{ item.title }}</span>
      </n-tooltip>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { toRefs, Ref, reactive, computed } from 'vue'
import { renderIcon, goDialog, goHome } from '@/utils'
import { icon } from '@/plugins'
import { useRemoveKeyboard } from '../../hooks/useKeyboard.hook'

import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { HistoryStackEnum } from '@/store/modules/chartHistoryStore/chartHistoryStore.d'

import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'

const { LayersIcon, BarChartIcon, PrismIcon, HomeIcon, ArrowBackIcon, ArrowForwardIcon } = icon.ionicons5
const { setItem } = useChartLayoutStore()
const { getLayers, getCharts, getDetails } = toRefs(useChartLayoutStore())
const chartEditStore = useChartEditStore()
const chartHistoryStore = useChartHistoryStore()

interface ItemType<T> {
  key: T
  select: Ref<boolean> | boolean
  title: string
  icon: any
}

const btnList = reactive<ItemType<ChartLayoutStoreEnum>[]>([
  {
    key: ChartLayoutStoreEnum.CHARTS,
    select: getCharts,
    title: window['$t']('views_components.auto_296'),
    icon: renderIcon(BarChartIcon)
  },
  {
    key: ChartLayoutStoreEnum.LAYERS,
    select: getLayers,
    title: window['$t']('views_components.auto_297'),
    icon: renderIcon(LayersIcon)
  },
  {
    key: ChartLayoutStoreEnum.DETAILS,
    select: getDetails,
    title: window['$t']('views_components.auto_295'),
    icon: renderIcon(PrismIcon)
  }
])

const isBackStack = computed(()=> chartHistoryStore.getBackStack.length> 1)

const isForwardStack = computed(()=> chartHistoryStore.getForwardStack.length> 0)

const historyList = reactive<ItemType<HistoryStackEnum>[]>([
  {
    key: HistoryStackEnum.BACK_STACK,
    // Phải có canvas khởi tạo
    select: isBackStack,
    title: window['$t']('views_components.auto_270'),
    icon: renderIcon(ArrowBackIcon)
  },
  {
    key: HistoryStackEnum.FORWARD_STACK,
    select: isForwardStack,
    title: window['$t']('views_components.auto_275'),
    icon: renderIcon(ArrowForwardIcon)
  }
])


// store mô tảXem / Hátgiá trị, như vậy và ContentConfigurations của collapsed thì ngược lại
const styleHandle = (item: ItemType<ChartLayoutStoreEnum>) => {
  if (item.key === ChartLayoutStoreEnum.DETAILS) {
    return item.select ? '' : 'primary'
  }
  return item.select ? 'primary' : ''
}

// Xử lý bố cục
const clickHandle = (item: ItemType<ChartLayoutStoreEnum>) => {
  setItem(item.key, !item.select)
}

// Lịch Sử Undođối phó với
const clickHistoryHandle = (item: ItemType<HistoryStackEnum>) => {
  switch (item.key) {
    case HistoryStackEnum.BACK_STACK:
      chartEditStore.setBack()
      break;
    case HistoryStackEnum.FORWARD_STACK:
      chartEditStore.setForward()
      break;
  }
}

// Quay lại trang chủ
const goHomeHandle = () => {
  goDialog({
    message: window['$t']('views_components.auto_294'),
    isMaskClosable: true,
    onPositiveCallback: () => {
      goHome()
      useRemoveKeyboard()
    }
  })
}
</script>
<style lang="scss" scoped>
.header-left-btn {
  margin-left: -37px;
 }
</style>
