import { computed } from 'vue'
import { LangEnum } from '@/enums/styleEnum'
import { useLangStore } from '@/store/modules/langStore/langStore'
import { enUS, dateEnUS } from 'naive-ui'

type LangStoreType = typeof useLangStore

// chuyển đổi ngôn ngữ
export const useLang = () => {
  const lang = useLangStore()
  
  const locale = computed(() => {
    return enUS
  })

  const dateLocale = computed(() => {
    return dateEnUS
  })

  return {
    locale,
    dateLocale
  }
}
