<template>
  <!-- Echarts Cấu hình toàn cầu -->
  <global-setting :optionData="optionData"> </global-setting>
  <!-- Biểu đồ dạng viên nang -->
  <collapse-item :name="$t('packages.auto_133')"
 expanded>
    <SettingItemBox :name="$t('packages.auto_125')"
>
      <setting-item :name="$t('packages.auto_132')"
>
        <n-input-number v-model:value="optionData.paddingLeft" :min="10" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_126')"
>
        <n-input-number v-model:value="optionData.paddingRight" :min="10" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_128')"
>
        <n-input-number v-model:value="optionData.itemHeight" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_130')"
>
      <setting-item :name="$t('packages.auto_131')"
>
        <n-input-number v-model:value="optionData.valueFontSize" :min="0" :step="1" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_127')"
>
        <n-input v-model:value="optionData.unit" size="small"></n-input>
      </setting-item>

      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.showValue" size="small"></n-switch>
          <n-text>{{ $t('phase7.auto_263') }}</n-text>
        </n-space>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_21')"
>
      <setting-item v-for="(item, index) in optionData.colors" :key="index" :name="window['$t']('packages.auto_129')">
        <n-color-picker v-model:value="optionData.colors[index]" size="small" :modes="['hex']"></n-color-picker>
      </setting-item>
    </SettingItemBox>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})
</script>
