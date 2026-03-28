import { defineStore } from 'pinia'
import { lang } from '@/settings/designSetting'
import { LangStateType } from './langStore.d'
import { LangEnum } from '@/enums/styleEnum'
import { reloadRoutePage } from '@/utils'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { getGlobalSettingsApi, saveGlobalSettingsApi } from '@/api/storage.api'

// ngôn ngữ
export const useLangStore = defineStore({
  id: 'useLangStore',
  state: (): LangStateType => ({
    lang
  }),
  getters: {
    getLang(): LangEnum {
      return this.lang
    }
  },
  actions: {
    // Sync với Server khi khởi tạo
    async initialSync() {
      const serverSettings = await getGlobalSettingsApi('lang_setting')
      if (serverSettings && serverSettings.lang) {
        this.lang = serverSettings.lang
      }
    },
    changeLang(lang: LangEnum): void {
      const settingStore = useSettingStore()
      if (this.lang === lang) return
      this.lang = lang
      // Lưu lên server thay vì LocalStorage
      saveGlobalSettingsApi(this.$state, 'lang_setting')

      if (settingStore.getChangeLangReload) {
        reloadRoutePage()
      }
    }
  }
})
