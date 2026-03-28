import { getLocalStorage, setLocalStorage, getUUID } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { getUserTemplatesApi, saveUserTemplateApi, deleteUserTemplateApi } from '@/api/storage.api'

export interface UserTemplateType {
  id: string
  title: string
  image: string
  config: any
  createTime: string
}

export const useUserTemplateData = () => {
  /**
   * * Lấy danh sách mẫu cá nhân
   */
  const getUserTemplateList = async (): Promise<UserTemplateType[]> => {
    // Thử lấy từ Server SQLite trước
    const templates = await getUserTemplatesApi()
    return templates || []
  }

  /**
   * * Lưu mẫu cá nhân mới
   * @param title Tên mẫu
   * @param image Ảnh preview (data URL)
   * @param config Cấu hình dashboard
   */
  const saveUserTemplate = async (title: string, image: string, config: any) => {
    const newItem: UserTemplateType = {
      id: `ut-${getUUID()}`,
      title: title || 'Mẫu không tên',
      image: image,
      config: config,
      createTime: new Date().toLocaleString()
    }
    // Lưu vào SQLite Server
    await saveUserTemplateApi(newItem)
    return newItem
  }

  /**
   * * Xóa mẫu cá nhân
   * @param id 
   */
  const deleteUserTemplate = async (id: string) => {
    // Xóa từ SQLite Server
    await deleteUserTemplateApi(id)
  }

  return {
    getUserTemplateList,
    saveUserTemplate,
    deleteUserTemplate
  }
}
