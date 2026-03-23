import { computed, toRefs } from 'vue'
import { darkTheme, GlobalThemeOverrides } from 'naive-ui'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { borderRadius } from '@/settings/designSetting'
import { alpha, lighten } from '@/utils'

/**
 * * Đặt chủ đề toàn cầu
 */
export const useThemeOverridesHook = () => {
  const designStore = useDesignStore()
  const { getAppTheme } = toRefs(designStore)
  const darkTheme = computed(
    (): GlobalThemeOverrides => {
      // Phổ quát
      const commonObj = {
        common: {
          primaryColor: getAppTheme.value,
          primaryColorHover: lighten(alpha(getAppTheme.value), 0.1),
          primaryColorPressed: lighten(alpha(getAppTheme.value), 0.1),
          primaryColorSuppl: getAppTheme.value,
          borderRadius
        }
      }
      // Chủ đề tươi sáng
      const lightObject = {
        common: {
          ...commonObj.common
        }
      }
      // chủ đề tối
      const dartObject = {
        common: {
          ...commonObj.common
        },
        LoadingBar: {
          colorLoading: getAppTheme.value
        }
      }
      return designStore.getDarkTheme ? dartObject : lightObject
    }
  )
  return darkTheme
}

// Quay lại chủ đề tối
export const useDarkThemeHook = () => {
  const designStore = useDesignStore()
  return computed(() => (designStore.getDarkTheme ? darkTheme : undefined))
}
