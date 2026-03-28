import { defineStore } from 'pinia'
import { theme } from '@/settings/designSetting'
import { DesignStateType, AppThemeColorType } from './designStore.d'
import { ThemeEnum } from '@/enums/styleEnum'
import { getGlobalSettingsApi, saveGlobalSettingsApi } from '@/api/storage.api'

const { darkTheme, appTheme, appThemeDetail } = theme

export const useDesignStore = defineStore({
  id: 'useDesignStore',
  state: (): DesignStateType => ({
    // Trời có tối không?
    darkTheme,
    // Tên chủ đề
    themeName: (darkTheme && ThemeEnum.DARK) || ThemeEnum.LIGHT,
    // Số màu màu
    appTheme,
    appThemeDetail,
  }),
  getters: {
    getDarkTheme(e): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeDetail(): AppThemeColorType | null {
      return this.appThemeDetail
    }
  },
  actions: {
    // Sync với Server khi khởi tạo
    async initialSync() {
      const serverSettings = await getGlobalSettingsApi('design_setting')
      if (serverSettings) {
        this.$patch(serverSettings)
      }
    },
    // chuyển đổi chủ đề
    changeTheme(): void {
      this.darkTheme = !this.darkTheme
      this.themeName = this.darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT
      // Lưu lên máy chủ
      saveGlobalSettingsApi(this.$state, 'design_setting')
    },
    // Đặt màu
    setAppColor(color: AppThemeColorType): void {
      this.appTheme = color.hex
      this.appThemeDetail = color
      // Lưu lên máy chủ
      saveGlobalSettingsApi(this.$state, 'design_setting')
    }
  }
})