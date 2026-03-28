import { StorageEnum } from '@/enums/storageEnum'
import { getLocalStorage, clearLocalStorage } from '@/utils'
import { 
  saveProjectApi, 
  saveUserTemplateApi, 
  saveGlobalSettingsApi, 
  savePrivatePhotoApi 
} from '@/api/storage.api'

/**
 * * Di chuyển dữ liệu từ LocalStorage lên Server SQLite
 * * Giúp người dùng cũ không bị mất dữ liệu khi chuyển sang hệ thống mới.
 */
export const migrateLocalStorageToServer = async () => {
  console.log('[MIGRATION] Checking for local data to migrate...')

  // 1. Di chuyển Dự án (Projects)
  const localProjects = getLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST)
  if (localProjects && Array.isArray(localProjects) && localProjects.length > 0) {
    console.log(`[MIGRATION] Migrating ${localProjects.length} projects...`)
    for (const project of localProjects) {
      await saveProjectApi(project)
    }
    clearLocalStorage(StorageEnum.GO_CHART_STORAGE_LIST)
  }

  // 2. Di chuyển Mẫu cá nhân (User Templates)
  const localTemplates = getLocalStorage(StorageEnum.GO_USER_TEMPLATE_STORAGE)
  if (localTemplates && Array.isArray(localTemplates) && localTemplates.length > 0) {
    console.log(`[MIGRATION] Migrating ${localTemplates.length} user templates...`)
    for (const template of localTemplates) {
      await saveUserTemplateApi(template)
    }
    clearLocalStorage(StorageEnum.GO_USER_TEMPLATE_STORAGE)
  }

  // 3. Di chuyển Cài đặt hệ thống (System Settings)
  const localSettings = getLocalStorage(StorageEnum.GO_SYSTEM_SETTING_STORE)
  if (localSettings) {
    console.log('[MIGRATION] Migrating system settings...')
    await saveGlobalSettingsApi(localSettings, 'system_setting')
    clearLocalStorage(StorageEnum.GO_SYSTEM_SETTING_STORE)
  }

  // 4. Di chuyển Ngôn ngữ (Language)
  const localLang = getLocalStorage(StorageEnum.GO_LANG_STORE)
  if (localLang) {
    console.log('[MIGRATION] Migrating language preference...')
    await saveGlobalSettingsApi(localLang, 'lang_setting')
    clearLocalStorage(StorageEnum.GO_LANG_STORE)
  }

  // 5. Di chuyển Chủ đề / Thiết kế (Design)
  const localDesign = getLocalStorage(StorageEnum.GO_DESIGN_STORE)
  if (localDesign) {
    console.log('[MIGRATION] Migrating theme/design settings...')
    await saveGlobalSettingsApi(localDesign, 'design_setting')
    clearLocalStorage(StorageEnum.GO_DESIGN_STORE)
  }

  // 6. Di chuyển Ảnh cá nhân (Private Photos)
  const localPhotos = getLocalStorage(StorageEnum.GO_USER_MEDIA_PHOTOS)
  if (localPhotos && Array.isArray(localPhotos) && localPhotos.length > 0) {
    console.log(`[MIGRATION] Migrating ${localPhotos.length} private photos...`)
    for (const photo of localPhotos) {
      // Gán ID nếu chưa có
      if (!photo.id) photo.id = `photo-migrated-${new Date().getTime()}-${Math.random().toString(36).substr(2, 5)}`
      await savePrivatePhotoApi({
        id: photo.id,
        name: photo.title || 'Migrated Photo',
        content: photo.image // base64
      })
    }
    clearLocalStorage(StorageEnum.GO_USER_MEDIA_PHOTOS)
  }

  console.log('[MIGRATION] Migration completed successfully!')
}
