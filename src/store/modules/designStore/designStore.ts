import { defineStore } from 'pinia'
import { theme } from '@/settings/designSetting'
import { DesignStateType, AppThemeColorType } from './designStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { ThemeEnum } from '@/enums/styleEnum'

const { GO_DESIGN_STORE } = StorageEnum

const { darkTheme, appTheme, appThemeDetail } = theme

const storageDesign = getLocalStorage(GO_DESIGN_STORE)

export const useDesignStore = defineStore({
  id: 'useDesignStore',
  state: (): DesignStateType =>
    storageDesign || {
      // Trời có tối không?
      darkTheme,
      // Tên chủ đề
      themeName: (darkTheme && ThemeEnum.DARK) || ThemeEnum.LIGHT,
      // Số màu màu
      appTheme,
      appThemeDetail,
    },
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
    // chuyển đổi chủ đề
    changeTheme(): void {
      this.darkTheme = !this.darkTheme
      this.themeName = this.darkTheme ? ThemeEnum.DARK : ThemeEnum.LIGHT
      setLocalStorage(GO_DESIGN_STORE, this.$state)
    },
    // Đặt màu
    setAppColor(color: AppThemeColorType): void {
      this.appTheme = color.hex
      this.appThemeDetail = color
      setLocalStorage(GO_DESIGN_STORE, this.$state)
    }
  }
})