import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getLocalStorage, setLocalStorage, goDialog, setSessionStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { DialogEnum } from '@/enums/pluginEnum'
import { ChartList, Chartype } from '../../../index.d'
import { getProjectsApi, deleteProjectApi, getProjectApi, saveProjectApi } from '@/api/storage.api'
import { downloadTextFile } from '@/utils/file'
import { fetchPathByName, routerTurnByPath } from '@/utils'
import { PreviewEnum } from '@/enums/pageEnum'

// Khởi tạo dữ liệu
export const useDataListInit = () => {
  const list = ref<ChartList>([])
  const router = useRouter()

  const getItem = async () => {
    // Thử lấy từ Server SQLite trước
    const storageList = await getProjectsApi()
    if (storageList) {
      list.value = storageList.map((item: any) => {
        return {
          id: item.id,
          title: item.editCanvasConfig?.projectName || 'Dự án mới',
          release: item.isPublished || false,
          label: 'Dự án',
          image: item.editCanvasConfig?.backgroundImage || ''
        }
      })
    }
  }

  onMounted(() => {
    getItem()
  })

  // Xem trước (Preview)
  const previewHandle = (cardData: Chartype) => {
    const path = fetchPathByName(PreviewEnum.CHART_PREVIEW_NAME, 'href')
    if (!path) return
    const previewId = String(cardData.id)
    
    // Đặt vào SessionStorage để Preview page có thể đọc
    getProjectApi(previewId).then(storageInfo => {
      if (storageInfo) {
        setSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST, [{ id: previewId, ...storageInfo }])
        routerTurnByPath(path, [previewId], undefined, true)
      }
    })
  }

  // Phát hành (Publish)
  const publishHandle = (cardData: Chartype) => {
    const previewUrl = `${window.location.origin}/#/chart/preview/${cardData.id}`
    const embedCode = `<iframe src="${previewUrl}" width="100%" height="600px" frameborder="0"></iframe>`

    goDialog({
      type: DialogEnum.SUCCESS,
      title: 'Phát hành Dự án & Nhúng website',
      message: `Hệ thống sẽ trích xuất toàn bộ cấu hình JSON. Ngoài ra, bạn có thể sử dụng đoạn mã sau để nhúng vào website khác:\n\n${embedCode}`,
      positiveText: 'Tải JSON & Sao chép mã nhúng',
      negativeText: 'Hủy bớt',
      onPositiveCallback: async () => {
        const fullProject = await getProjectApi(String(cardData.id))
        if (fullProject) {
          // Cập nhật trạng thái phát hành
          fullProject.isPublished = true
          await saveProjectApi(fullProject)
          
          // Tải file JSON
          const jsonContent = JSON.stringify(fullProject, null, 2)
          downloadTextFile(jsonContent, `tinix-dashboard-${cardData.title}-${new Date().getTime()}`, 'json')
          
          // Sao chép mã nhúng
          try {
            await navigator.clipboard.writeText(embedCode)
            window['$message'].success('Phát hành thành công! Tệp JSON đã được tải về và Mã nhúng Iframe đã được sao chép vào bộ nhớ tạm.')
          } catch (e) {
            window['$message'].success('Phát hành thành công!')
          }
          getItem() // Tải lại danh sách
        }
      }
    })
  }

  // xóa bỏ
  const deleteHandle = (cardData: Chartype, index: number) => {
    goDialog({
      type: DialogEnum.DELETE,
      promise: true,
      onPositiveCallback: async () => {
        const res = await deleteProjectApi(cardData.id as string)
        if (res && res.success) {
          return Promise.resolve(1)
        } else {
          window['$message'].error('Không thể xóa dự án trên máy chủ.')
          return Promise.reject(0)
        }
      },
      promiseResCallback: (e: any) => {
        window['$message'].success(window['$t']('phase7.auto_149'))
        const listIndex = list.value.findIndex((item: any) => String(item.id) === String(cardData.id))
        if (listIndex !== -1) {
          list.value.splice(listIndex, 1)
        }
      }
    })
  }

  return {
    list,
    deleteHandle,
    publishHandle,
    previewHandle
  }
}
