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

import { DialogEnum } from '@/enums/pluginEnum'
import { getCanvasThumbnail } from '@/utils'
import { useUserTemplateData } from '@/views/project/mtTemplate/hooks/useUserTemplateData.hook'
import { saveSystemTemplateApi, saveProjectApi } from '@/api/storage.api'

const { saveUserTemplate } = useUserTemplateData()

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
  const { id } = routerParamsInfo.params
  const idStr = typeof id === 'string' ? id : id[0]
  const previewUrl = `${window.location.origin}/#/chart/preview/${idStr}`
  const embedCode = `<iframe src="${previewUrl}" width="100%" height="600px" frameborder="0"></iframe>`

  goDialog({
    type: DialogEnum.SUCCESS,
    title: 'Phát hành Dự án & Nhúng website',
    message: `Hệ thống sẽ lưu trữ Dashboard hiện tại và cung cấp link chia sẻ công khai. Bạn có thể sử dụng mã sau để nhúng vào website khác:\n\n${embedCode}`,
    positiveText: 'Lưu & Sao chép mã nhúng',
    negativeText: 'Hủy bớt',
    onPositiveCallback: async () => {
      const storageInfo = chartEditStore.getStorageInfo()
      
      // 1. Lưu dự án lên Server (Cloud Publishing)
      const saveRes = await saveProjectApi({
        id: idStr,
        ...storageInfo
      })

      if (saveRes) {
        // 2. Tải JSON dự phòng
        const jsonContent = JSON.stringify(storageInfo, null, 2)
        downloadTextFile(jsonContent, `tinix-dashboard-${new Date().getTime()}`, 'json')
        
        // 3. Sao chép mã nhúng
        try {
          await navigator.clipboard.writeText(embedCode)
          window['$message'].success('Phát hành thành công! Dashboard đã được lưu trực tuyến và Mã nhúng Iframe đã được sao chép.')
        } catch (e) {
          window['$message'].success('Phát hành thành công! Link xem trước đã sẵn sàng.')
        }
      } else {
        window['$message'].error('Lỗi khi lưu Dashboard lên Server. Vui lòng kiểm tra lại kết nối.')
      }
    }
  })
}

// Lưu thành mẫu (Save as Template)
const { DuplicateOutlineIcon, ShieldIcon } = icon.ionicons5
const saveAsTemplateHandle = async () => {
  goDialog({
    type: DialogEnum.SUCCESS,
    title: 'Lưu thành Mẫu của tôi',
    message: 'Bạn có muốn lưu thiết kế hiện tại thành một Bản mẫu cá nhân để tái sử dụng sau này không?',
    positiveText: 'Lưu thành Mẫu',
    negativeText: 'Hủy',
    onPositiveCallback: async () => {
      const storageInfo = chartEditStore.getStorageInfo()
      const projectName = chartEditStore.getEditCanvasConfig.projectName || 'Mẫu mới'
      
      // Chụp ảnh xem trước
      const thumbnail = await getCanvasThumbnail()
      
      await saveUserTemplate(projectName, thumbnail || '', storageInfo)
      window['$message'].success('Đã lưu vào danh sách "Mẫu của tôi" thành công!')
    }
  })
}

// Lưu đè Mẫu Hệ thống (Save to System Template - Admin)
const saveToSystemHandle = async () => {
  const { id } = routerParamsInfo.params
  const idStr = typeof id === 'string' ? id : id[0]
  
  goDialog({
    type: DialogEnum.WARNING,
    title: 'Lưu đè Mẫu Hệ thống (Admin)',
    message: 'Bạn đang thực hiện thay đổi TRỰC TIẾP vào Mẫu gốc của Chợ Mẫu. Mọi người dùng khác sẽ thấy thay đổi này. Bạn có chắc chắn?',
    positiveText: 'Xác nhận Lưu Gốc',
    negativeText: 'Hủy',
    onPositiveCallback: async () => {
      const storageInfo = chartEditStore.getStorageInfo()
      const projectName = chartEditStore.getEditCanvasConfig.projectName || 'Mẫu hệ thống'
      const thumbnail = await getCanvasThumbnail()
      
      const res = await saveSystemTemplateApi({
        id: idStr,
        title: projectName,
        image: thumbnail,
        config: storageInfo
      })
      if (res) {
        window['$message'].success('Đã cập nhật Mẫu gốc trong Chợ Mẫu thành công!')
      } else {
        window['$message'].error('Lỗi khi lưu vào Mẫu hệ thống.')
      }
    }
  })
}

const btnList = [
  {
    select: true,
    title: window['$t']('views_components.auto_299'),
    type: 'primary',
    icon: renderIcon(AnalyticsIcon),
    event: () => {
      const { id } = routerParamsInfo.params
      syncData(id as string)
    }
  },
  {
    select: true,
    title: 'Lưu thành Mẫu',
    icon: renderIcon(DuplicateOutlineIcon),
    event: () => {
      saveAsTemplateHandle()
    }
  },
  {
    admin: true,
    title: 'Lưu đè Mẫu Gốc',
    icon: renderIcon(ShieldIcon),
    event: () => {
      saveToSystemHandle()
    }
  },
  {
    select: true,
    title: window['$t']('views_components.auto_298'),
    icon: renderIcon(BrowsersOutlineIcon),
    event: () => {
      previewHandle()
    }
  },
  {
    select: true,
    title: window['$t']('views_components.auto_301'),
    icon: renderIcon(SendIcon),
    event: () => {
      sendHandle()
    }
  }
]

const comBtnList = computed(() => {
  const { id } = routerParamsInfo.params
  const idStr = id ? (typeof id === 'string' ? id : id[0]) : ''
  
  return btnList.filter(item => {
    // Nếu là nút Admin, chỉ hiển thị khi sửa Mẫu Chợ Mẫu (ID tpl-)
    if (item.admin) {
      return idStr.startsWith('tpl-')
    }
    return true
  })
})
</script>

<style lang="scss" scoped>
.align-center {
  margin-top: -4px;
}
</style>
