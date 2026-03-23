<template>
  <n-space class="go-mt-0" :wrap="false">
    <n-button v-for="item in comBtnList" :key="item.title" :type="item.type" ghost @click="item.event">
      <template #icon>
        <component :is="item.icon"></component>
      </template>
      <span>{{ item.title }}</span>
    </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { renderIcon, goDialog, fetchPathByName, routerTurnByPath, setSessionStorage, getSessionStorage } from '@/utils'
import { PreviewEnum } from '@/enums/pageEnum'
import { StorageEnum } from '@/enums/storageEnum'
import { useRoute } from 'vue-router'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { syncData } from '../../ContentEdit/components/EditTools/hooks/useSyncUpdate.hook'
import { icon } from '@/plugins'
import { cloneDeep } from 'lodash'

const { BrowsersOutlineIcon, SendIcon, AnalyticsIcon } = icon.ionicons5
const chartEditStore = useChartEditStore()

const routerParamsInfo = useRoute()

import { downloadTextFile } from '@/utils/file'

// Xem trước
const previewHandle = () => {
  const path = fetchPathByName(PreviewEnum.CHART_PREVIEW_NAME, 'href')
  if (!path) return
  const { id } = routerParamsInfo.params
  // id biểu tượng
  const previewId = typeof id === 'string' ? id : id[0]
  const storageInfo = chartEditStore.getStorageInfo()
  const sessionStorageInfo = getSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST) || []

  if (sessionStorageInfo?.length) {
    const repeateIndex = sessionStorageInfo.findIndex((e: { id: string }) => e.id === previewId)
    // Lặp lại thay thế
    if (repeateIndex !== -1) {
      sessionStorageInfo.splice(repeateIndex, 1, { id: previewId, ...storageInfo })
      setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, sessionStorageInfo)
    } else {
      sessionStorageInfo.push({
        id: previewId,
        ...storageInfo
      })
      setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, sessionStorageInfo)
    }
  } else {
    setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [{ id: previewId, ...storageInfo }])
  }
  // Xem trước
  routerTurnByPath(path, [previewId], undefined, true)
}

// phát hành (Publish)
const sendHandle = () => {
  goDialog({
    message: 'Hệ thống sẽ trích xuất toàn bộ cấu hình Cụm Biểu Đồ (Dashboard) hiện hành thành tệp JSON. Bạn có chắc chắn muốn Tải về và Phát hành?',
    positiveText: 'Phát hành (Tải JSON)',
    negativeText: 'Hủy bớt',
    closeNegativeText: true,
    onPositiveCallback: () => {
      const storageInfo = chartEditStore.getStorageInfo()
      const jsonContent = JSON.stringify(storageInfo, null, 2)
      downloadTextFile(jsonContent, `tinix-dashboard-${new Date().getTime()}`, 'json')
      window['$message'].success('Phát hành cục bộ thành công! Tệp JSON cấu hình đã được tải về máy.')
    }
  })
}

const btnList = [
  {
    select: true,
    title: window['$t']('views_components.auto_299'),
    type: 'primary',
    icon: renderIcon(AnalyticsIcon),
    event: syncData
  },
  {
    select: true,
    title: window['$t']('views_components.auto_298'),
    icon: renderIcon(BrowsersOutlineIcon),
    event: previewHandle
  },
  {
    select: true,
    title: window['$t']('views_components.auto_301'),
    icon: renderIcon(SendIcon),
    event: sendHandle
  }
]

const comBtnList = computed(() => {
  if (chartEditStore.getEditCanvas.isCodeEdit) {
    return btnList
  }
  const cloneList = cloneDeep(btnList)
  cloneList.shift()
  return cloneList
})
</script>

<style lang="scss" scoped>
.align-center {
  margin-top: -4px;
}
</style>
