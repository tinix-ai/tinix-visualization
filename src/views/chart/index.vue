<template>
  <!-- Bàn làm việc liên quan -->
  <div class="go-chart">
    <n-layout>
      <layout-header-pro>
        <template #left>
          <header-left-btn></header-left-btn>
        </template>
        <template #center>
          <header-title></header-title>
        </template>
        <template #ri-left>
          <header-right-btn></header-right-btn>
        </template>
      </layout-header-pro>
      <n-layout-content content-style="overflow:hidden; display: flex">
        <div style="overflow:hidden; display: flex">
          <content-charts></content-charts>
          <content-layers></content-layers>
        </div>
        <content-configurations></content-configurations>
      </n-layout-content>
    </n-layout>
  </div>
  <!-- Nhấp chuột phải -->
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    size="small"
    :x="mousePosition.x"
    :y="mousePosition.y"
    :options="menuOptions"
    :show="chartEditStore.getRightMenuShow"
    :on-clickoutside="onClickOutSide"
    @select="handleMenuSelect"
  ></n-dropdown>
  <!-- Tải mặt nạ -->
  <content-load></content-load>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, toRaw } from 'vue'
import { loadAsyncComponent, getLocalStorage, setLocalStorage, getCanvasThumbnail } from '@/utils'
import { LayoutHeaderPro } from '@/layout/components/LayoutHeaderPro'
import { useContextMenu } from './hooks/useContextMenu.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { useProjectData } from './hooks/useProjectData.hook'
import { SavePageEnum } from '@/enums/editPageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { 
  getTemplateOverridesApi, 
  saveProjectApi, 
  saveUserTemplateApi, 
  saveTemplateOverridesApi 
} from '@/api/storage.api'

const chartHistoryStoreStore = useChartHistoryStore()
const chartEditStore = useChartEditStore()

// Khởi tạo Phục hồi dữ liệu (Recover Data)
useProjectData()

// Khởi tạo bản ghi
chartHistoryStoreStore.canvasInit(chartEditStore.getEditCanvas)

// Lưu trữ dữ liệu (Save data)
const saveHandle = async (e: any) => {
  // Lấy dữ liệu thô để tránh các vấn đề về Proxy/Reactivity (Use toRaw to avoid Proxy issues)
  const detail = toRaw(e.detail)
  const id = detail.id.toString()

  // Chụp ảnh xem trước (Capture workflow preview)
  const thumbnail = await getCanvasThumbnail()
  if (thumbnail) {
    if (!detail.editCanvasConfig) detail.editCanvasConfig = {}
    detail.editCanvasConfig.backgroundImage = thumbnail
  }

  let success = false

  // Nếu là ID của Chợ Mẫu (Starts with tpl-)
  if (id.startsWith('tpl-')) {
    let templateStorage = await getTemplateOverridesApi() || []
    const index = templateStorage.findIndex((item: any) => String(item.id) === id)
    if (index !== -1) {
      templateStorage.splice(index, 1, detail)
    } else {
      templateStorage.push(detail)
    }
    // Lưu vào SQLite Server
    const res = await saveTemplateOverridesApi(templateStorage)
    success = !!res
    if (success) window['$message'].success('Đã lưu các thay đổi vào Chợ Mẫu (SQLite Server)')
  } else if (id.startsWith('ut-')) {
    // Lưu Mẫu cá nhân (User Templates)
    const templateData = {
      id: id,
      title: detail.editCanvasConfig?.projectName || 'Mẫu không tên',
      image: thumbnail,
      config: detail
    }
    // Lưu vào SQLite Server
    const res = await saveUserTemplateApi(templateData)
    success = !!res
    if (success) window['$message'].success('Đã cập nhất Mẫu cá nhân vào SQLite Server!')
  } else {
    // Lưu dự án thông thường
    const res = await saveProjectApi(detail)
    success = !!res
    if (success) window['$message'].success('Đã lưu vào SQLite Server thành công!')
  }

  if (!success) {
    window['$message'].error('Lưu thất bại! Hãy kiểm tra kết nối tới Backend SQLite Server.')
  }
}

onMounted(() => {
  window.addEventListener(SavePageEnum.CHART, saveHandle)
})

onUnmounted(() => {
  window.removeEventListener(SavePageEnum.CHART, saveHandle)
})

const HeaderLeftBtn = loadAsyncComponent(() => import('./ContentHeader/headerLeftBtn/index.vue'))
const HeaderRightBtn = loadAsyncComponent(() => import('./ContentHeader/headerRightBtn/index.vue'))
const HeaderTitle = loadAsyncComponent(() => import('./ContentHeader/headerTitle/index.vue'))
const ContentLayers = loadAsyncComponent(() => import('./ContentLayers/index.vue'))
const ContentCharts = loadAsyncComponent(() => import('./ContentCharts/index.vue'))
const ContentConfigurations = loadAsyncComponent(() => import('./ContentConfigurations/index.vue'))
const ContentLoad = loadAsyncComponent(() => import('./ContentLoad/index.vue'))

// Nhấp chuột phải
const {
  menuOptions,
  onClickOutSide,
  mousePosition,
  handleMenuSelect
} = useContextMenu()
</script>

<style lang="scss" scoped>
@include go("chart") {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include background-image("background-image");
}
</style>
