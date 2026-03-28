import { defineStore } from 'pinia'
import { systemSetting } from '@/settings/systemSetting'
import { asideCollapsedWidth } from '@/settings/designSetting'
import { SettingStoreType, ToolsStatusEnum } from './settingStore.d'
import { saveGlobalSettingsApi, getGlobalSettingsApi } from '@/api/storage.api'

// Cài đặt chung
export const useSettingStore = defineStore({
  id: 'useSettingStore',
  state: (): SettingStoreType => systemSetting,
  getters: {
    getHidePackageOneCategory(): boolean {
      return this.hidePackageOneCategory
    },
    getChangeLangReload(): boolean {
      return this.changeLangReload
    },
    getAsideAllCollapsed(): boolean {
      return this.asideAllCollapsed
    },
    getAsideCollapsedWidth(): number {
      return this.asideAllCollapsed ? 0 : asideCollapsedWidth
    },
    getChartMoveDistance(): number {
      return this.chartMoveDistance
    },
    getChartAlignRange(): number {
      return this.chartAlignRange
    },
    getChartToolsStatus(): ToolsStatusEnum {
      return this.chartToolsStatus
    },
    getChartToolsStatusHide(): boolean {
      return this.chartToolsStatusHide
    },
    getHidePackageCategory(): boolean {
      return this.hidePackageCategory
    }
  },
  actions: {
    // Sync với Server khi khởi tạo
    async initialSync() {
      const serverSettings = await getGlobalSettingsApi('system_setting')
      if (serverSettings) {
        this.$patch(serverSettings)
      }
    },
    setItem<T extends keyof SettingStoreType, K extends SettingStoreType[T]>(
      key: T,
      value: K
    ): void {
      this.$patch(state => {
        state[key] = value
      })
      // Lưu lên server thay vì LocalStorage
      saveGlobalSettingsApi(this.$state, 'system_setting')
    }
  }
})
