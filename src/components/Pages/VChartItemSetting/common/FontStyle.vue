<template>
  <!-- todo Bổ sung các item config thường dùng -->
  <template v-if="style">
    <setting-item :name="$t('views_components.auto_420')"
>
      <n-color-picker v-model:value="style.fill.value" size="small" />
    </setting-item>
    <setting-item :name="$t('views_components.auto_427')"
>
      <n-input-number v-model:value="style.fontSize.value" :min="1" size="small" />
    </setting-item>
    <setting-item :name="$t('views_components.auto_480')"
>
      <n-select v-model:value="style.fontFamily.value" :options="fontStyleConfig.fontFamily" size="small" />
    </setting-item>
    <setting-item :name="$t('views_components.auto_501')"
>
      <n-select v-model:value="style.fontWeight.value" :options="fontStyleConfig.fontWeight" size="small" />
    </setting-item>
    <setting-item v-if="style?.dx" :name="$t('views_components.auto_502')"
>
      <n-input-number v-model:value="style.dx.value" size="small" />
    </setting-item>
    <setting-item v-if="style?.dy" :name="$t('views_components.auto_500')"
>
      <n-input-number v-model:value="style.dy.value" size="small" />
    </setting-item>
    <setting-item v-if="style?.angle" :name="$t('views_components.auto_499')"
>
      <n-input-number v-model:value="style.angle.value" :step="0.1" :min="0" :max="360" size="small" />
    </setting-item>
  </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { fontStyleConfig } from '@/packages/chartConfiguration/vcharts/index'
import { FontType } from '@/settings/vchartThemes/index'
import { SettingItem } from '@/components/Pages/ChartItemSetting'

defineProps({
  style: {
    type: Object as PropType<any>,
    required: true
  }
})
</script>
