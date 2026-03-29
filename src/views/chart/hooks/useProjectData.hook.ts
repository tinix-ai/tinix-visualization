import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useSync } from '@/views/chart/hooks/useSync.hook'
import { getSessionStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { templateList } from '@/views/project/templateMarket/data'
import { getProjectsApi, getUserTemplatesApi, getTemplateOverridesApi, getSystemTemplatesApi, saveProjectApi, saveUserTemplateApi, saveTemplateOverridesApi } from '@/api/storage.api'

export const useProjectData = () => {
  const route = useRoute()
  const chartEditStore = useChartEditStore()
  const { updateComponent } = useSync()

  onMounted(async () => {
    const routeId = route.params.id
    const id = Array.isArray(routeId) ? routeId.filter(v => v).pop() : routeId
    if (!id) return

    let projectData: any = null
    const idStr = id.toString()

    // 1. Nếu là ID của Chợ Mẫu (Starts with tpl-)
    if (idStr.startsWith('tpl-')) {
      // Thử lấy bản ghi đè từ Server (Overrides)
      const templateOverrides = await getTemplateOverridesApi()
      if (templateOverrides) {
        projectData = templateOverrides.find((item: any) => item.id === idStr)
        // Migration: Nếu server chưa có nhưng LocalStorage có
        if (!projectData) {
          const localOverrides = getLocalStorage(StorageEnum.GO_TEMPLATE_STORAGE) || []
          projectData = localOverrides.find((item: any) => item.id === idStr)
          if (projectData) {
            await saveTemplateOverridesApi(localOverrides)
          }
        }
      }

      // Nếu không có bản ghi đè, thử lấy từ Mẫu Hệ thống của Admin (SQLite)
      if (!projectData) {
        const systemTemplates = await getSystemTemplatesApi()
        if (systemTemplates) {
          const systemTpl = systemTemplates.find((t: any) => t.id === idStr)
          if (systemTpl) {
            projectData = systemTpl.config
          }
        }
      }

      // Nếu vẫn không có, lấy từ danh sách mặc định (Static defaults)
      if (!projectData) {
        const template = templateList.find(t => t.id === idStr)
        if (template) {
          projectData = template.config
        }
      }
    } else if (idStr.startsWith('ut-')) {
      // 2. Nếu là mẫu cá nhân (User Templates)
      const userTemplates = await getUserTemplatesApi()
      if (userTemplates) {
        const template = userTemplates.find((item: any) => item.id === idStr)
        if (template) {
          projectData = template.config
        }
      }
      
      // Migration fallback
      if (!projectData) {
        const localUserTemplates = getLocalStorage(StorageEnum.GO_USER_TEMPLATE_STORAGE) || []
        const template = localUserTemplates.find((item: any) => item.id === idStr)
        if (template) {
          projectData = template.config
          await saveUserTemplateApi(template) // Đồng bộ lên server
        }
      }
    } else {
      // 3. Dự án thông thường hoặc Mẫu số (Numeric IDs 1-200)
      // Thử lấy từ SessionStorage trước
      let storageList = getSessionStorage(StorageEnum.GO_CHART_STORAGE_LIST)
      
      // Nếu không có trong Session, thử lấy từ Server SQLite
      if (!storageList) {
        storageList = await getProjectsApi()
      }

      if (storageList && Array.isArray(storageList)) {
        projectData = storageList.find((item: any) => String(item.id) === idStr)
      }

      // NẾU VẪN KHÔNG CÓ: Kiểm tra xem có phải là Mẫu hệ thống số (Numeric Template IDs 1-200)
      if (!projectData && !isNaN(Number(idStr))) {
        const systemTemplates = await getSystemTemplatesApi()
        if (systemTemplates) {
          const sysTpl = systemTemplates.find((t: any) => String(t.id) === idStr)
          if (sysTpl) {
            projectData = sysTpl.config
          }
        }
      }
    }

    if (projectData) {
      await updateComponent(projectData, true)
    }
  })
}
