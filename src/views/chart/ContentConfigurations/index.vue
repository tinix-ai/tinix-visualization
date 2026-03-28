<template>
  <n-layout has-sider sider-placement="right">
    <n-layout-content>
      <!-- Biểu đồKéo vùng -->
      <content-edit></content-edit>
    </n-layout-content>
    <n-layout-sider
      collapse-mode="transform"
      :collapsed-width="0"
      :width="380"
      :collapsed="collapsed"
      :native-scrollbar="false"
      show-trigger="bar"
      @collapse="collapsedHandle"
      @expand="expandHandle"
    >
      <content-box class="go-content-configurations go-boderbox" :show-top="false" :depth="2">
        <!-- Cấu hình Trang -->
        <n-tabs v-if="!selectTarget" class="tabs-box" size="medium" type="line" justify-content="space-around">
          <n-tab-pane
            v-for="item in globalTabList"
            :key="item.key"
            :name="item.key"
            size="small"
            display-directive="show:lazy"
          >
            <template #tab>
              <div class="go-flex-items-center" style="gap: 4px;">
                <n-icon size="18">
                  <component :is="item.icon"></component>
                </n-icon>
                <span style="font-size: 13px; font-weight: bold;">{{ item.title }}</span>
              </div>
            </template>
            <component :is="item.render"></component>
          </n-tab-pane>
        </n-tabs>

        <!-- Sửa (Edit) -->
        <n-tabs v-if="selectTarget" v-model:value="tabsSelect" class="tabs-box" size="medium" type="line" justify-content="space-between">
          <n-tab-pane
            v-for="item in selectTarget.isGroup ? chartsDefaultTabList : chartsTabList"
            :key="item.key"
            :name="item.key"
            size="small"
            display-directive="show:lazy"
          >
            <template #tab>
              <div class="go-flex-items-center" style="gap: 4px;">
                <n-icon size="18">
                  <component :is="item.icon"></component>
                </n-icon>
                <span style="font-size: 13px; font-weight: bold;">{{ item.title }}</span>
              </div>
            </template>
            <component :is="item.render"></component>
          </n-tab-pane>
        </n-tabs>
      </content-box>
    </n-layout-sider>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, toRefs, watch, computed } from 'vue'
import { icon } from '@/plugins'
import { loadAsyncComponent } from '@/utils'
import { ContentBox } from '../ContentBox/index'
import { TabsEnum } from './index.d'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const { getDetails } = toRefs(useChartLayoutStore())
const { setItem } = useChartLayoutStore()
const chartEditStore = useChartEditStore()

const { ConstructIcon, FlashIcon, DesktopOutlineIcon, LeafIcon, RocketIcon } = icon.ionicons5

const ContentEdit = loadAsyncComponent(() => import('../ContentEdit/index.vue'))
const CanvasPage = loadAsyncComponent(() => import('./components/CanvasPage/index.vue'))
const ChartSetting = loadAsyncComponent(() => import('./components/ChartSetting/index.vue'))
const ChartData = loadAsyncComponent(() => import('./components/ChartData/index.vue'))
const ChartEvent = loadAsyncComponent(() => import('./components/ChartEvent/index.vue'))
const ChartAnimation = loadAsyncComponent(() => import('./components/ChartAnimation/index.vue'))

const collapsed = ref<boolean>(getDetails.value)
const tabsSelect = ref<TabsEnum>(TabsEnum.CHART_SETTING)

const collapsedHandle = () => {
  collapsed.value = true
  setItem(ChartLayoutStoreEnum.DETAILS, true)
}

const expandHandle = () => {
  collapsed.value = false
  setItem(ChartLayoutStoreEnum.DETAILS, false)
}

const selectTarget = computed(() => {
  const selectId = chartEditStore.getTargetChart.selectId
  // Loại trừ nhiều
  if (selectId.length !== 1) return undefined
  const target = chartEditStore.componentList[chartEditStore.fetchTargetIndex()]
  if (target?.isGroup) {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    tabsSelect.value = TabsEnum.CHART_SETTING
  }
  return target
})

watch(getDetails, newData => {
  if (newData) {
    collapsedHandle()
  } else {
    expandHandle()
  }
})

// trangCài Đặt Chỉnh
const globalTabList = [
  {
    key: TabsEnum.PAGE_SETTING,
    title: 'Trang',
    icon: DesktopOutlineIcon,
    render: CanvasPage
  }
]

const chartsDefaultTabList = [
  {
    key: TabsEnum.CHART_SETTING,
    title: 'Cấu hình',
    icon: ConstructIcon,
    render: ChartSetting
  },
  {
    key: TabsEnum.CHART_ANIMATION,
    title: 'Động',
    icon: LeafIcon,
    render: ChartAnimation
  }
]

const chartsTabList = [
  ...chartsDefaultTabList,
  {
    key: TabsEnum.CHART_DATA,
    title: 'Dữ liệu',
    icon: FlashIcon,
    render: ChartData
  },
  {
    key: TabsEnum.CHART_EVENT,
    title: 'Sự kiện',
    icon: RocketIcon,
    render: ChartEvent
  }
]
</script>

<style lang="scss" scoped>
@include go(content-configurations) {
  overflow: hidden;
  .tabs-box {
    padding: 4px 0;
    @include deep() {
      .n-tabs-tab {
        padding: 8px 12px;
      }
    }
  }
}
</style>
