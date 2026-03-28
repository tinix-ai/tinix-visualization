<template>
  <n-config-provider
    :theme="darkTheme"
    :hljs="hljsTheme"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="overridesTheme"
  >
    <go-app-provider>
      <I18n></I18n>
      <router-view></router-view>
    </go-app-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { GoAppProvider } from '@/components/GoAppProvider'
import { I18n } from '@/components/I18n'
import { useDarkThemeHook, useThemeOverridesHook, useCode, useLang } from '@/hooks'
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import { useLangStore } from '@/store/modules/langStore/langStore'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
import { onMounted } from 'vue'
import { migrateLocalStorageToServer } from '@/utils/migration'

const settingStore = useSettingStore()
const langStore = useLangStore()
const designStore = useDesignStore()
const packagesStore = usePackagesStore()

onMounted(async () => {
  // 1. Thực hiện di chuyển dữ liệu từ LocalStorage lên Server (nếu có)
  await migrateLocalStorageToServer()

  // 2. Sync toàn bộ từ server sau khi di chuyển
  await Promise.all([
    settingStore.initialSync(),
    langStore.initialSync(),
    designStore.initialSync(),
    packagesStore.initialSync()
  ])
})

// chủ đề tối
const darkTheme = useDarkThemeHook()

// Cấu hình chủ đề
const overridesTheme = useThemeOverridesHook()

// chủ đề mã
const hljsTheme = useCode()

// ngôn ngữ toàn cầu
const { locale, dateLocale } = useLang()
//nộp bài kiểm tra
</script>
