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
