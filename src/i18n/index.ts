//ngôn ngữ
import { lang } from '@/settings/designSetting'
import { createI18n } from 'vue-i18n' //giới thiệuvue-i18nthành phần
import { getLocalStorage } from '@/utils'
import { StorageEnum }from '@/enums/storageEnum'
import { LangEnum } from '@/enums/styleEnum'
import { LangStateType } from '@/store/modules/langStore/langStore.d'
import en from './en/index'
import vi from './vi/index'

const langStorage: LangStateType = getLocalStorage(StorageEnum.GO_LANG_STORE)

// mảng ngôn ngữ
export const langList = [
  {
    label: 'English',
    key: LangEnum.EN
  },
  {
    label: 'Tiếng Việt',
    key: LangEnum.VI
  }
]

const i18n = createI18n({
  legacy: false,
  globalInjection:true,
  locale: langStorage?.lang || lang,
  fallbackLocale: langStorage?.lang || lang,
  messages: {
    [LangEnum.EN]: en,
    [LangEnum.VI]: vi
  }
})

// Lupan: Gắn hàm '$t' vào window object để module TypeScript thuần gọi được runtime
window['$t'] = i18n.global.t

export default i18n
