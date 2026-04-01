import { getSessionStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { getProjectApi, getTemplateOverridesApi, getSystemTemplatesApi } from '@/api/storage.api'

const chartEditStore = useChartEditStore()

export interface ChartEditStorageType extends ChartEditStorage {
  id: string
}

// Theo định tuyến id Nhận thông tin về dữ liệu được lưu trữ (Async to support Server fetch)
export const getSessionStorageInfo = async () => {
  const urlHash = document.location.hash
  const toPathArray = urlHash.split('/')
  let idStr = toPathArray && toPathArray[toPathArray.length - 1]
  
  if (!idStr) return
  
  // Clean up ID (remove query parameters like ?foo=bar)
  if (idStr.includes('?')) {
    idStr = idStr.split('?')[0]
  }

  // 1. Thử lấy từ SessionStorage (Dành cho xem trước nhanh từ Editor)
  const storageList: ChartEditStorageType[] = getSessionStorage(
    StorageEnum.GO_CHART_STORAGE_LIST
  )

  if (storageList) {
    const sessionItem = storageList.find(i => String(i.id) === idStr)
    if (sessionItem) {
      const { editCanvasConfig, requestGlobalConfig, componentList } = sessionItem
      chartEditStore.editCanvasConfig = editCanvasConfig
      chartEditStore.requestGlobalConfig = requestGlobalConfig
      chartEditStore.componentList = componentList
      return sessionItem
    }
  }

  // 2. Nếu không có trong Session, thử lấy từ Server SQLite (Dành cho Nhúng Iframe)
  let projectData: any = null
  
  if (idStr.startsWith('tpl-')) {
    // Nếu là mẫu, thử lấy bản ghi đè hoặc mẫu hệ thống
    const overrides = await getTemplateOverridesApi()
    if (overrides) {
      projectData = overrides.find((t: any) => t.id === idStr)
    }
    if (!projectData) {
      const systems = await getSystemTemplatesApi()
      if (systems) {
        const sysTpl = systems.find((t: any) => t.id === idStr)
        if (sysTpl) projectData = sysTpl.config
      }
    }
  } else {
    // 3. Dự án thông thường hoặc Mẫu số (Numeric IDs 1-200)
    projectData = await getProjectApi(idStr)
    
    // NẾU VẪN KHÔNG CÓ: Kiểm tra xem có phải là Mẫu hệ thống số (Numeric Template IDs 1-200)
    if (!projectData && !isNaN(Number(idStr))) {
      const systems = await getSystemTemplatesApi()
      if (systems) {
        const sysTpl = systems.find((t: any) => String(t.id) === idStr)
        if (sysTpl) projectData = sysTpl.config
      }
    }
  }

  if (projectData) {
    const { editCanvasConfig, requestGlobalConfig, componentList } = projectData
    
    // Deep merge with current state to ensure all fields (like previewScaleType) are populated
    chartEditStore.editCanvasConfig = {
      ...chartEditStore.editCanvasConfig,
      ...editCanvasConfig,
      width: editCanvasConfig.width || chartEditStore.editCanvasConfig.width || 1920,
      height: editCanvasConfig.height || chartEditStore.editCanvasConfig.height || 1080
    }
    chartEditStore.requestGlobalConfig = {
      ...chartEditStore.requestGlobalConfig,
      ...requestGlobalConfig
    }
    chartEditStore.componentList = componentList || []
    
    return projectData
  }
  
  return null
}