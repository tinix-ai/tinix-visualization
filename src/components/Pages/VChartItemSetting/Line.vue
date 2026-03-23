<template>
  <collapse-item :name="$t('views_components.auto_484')"
 v-if="optionData.line">
    <SettingItemBox :name="$t('views_components.auto_477')"
>
      <setting-item :name="$t('views_components.auto_32')"
>
        <n-input-number v-model:value="optionData.line.style.lineWidth" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_486')"
>
        <n-select
          v-model:value="optionData.line.style.curveType"
          :options="styleConfig.curveType"
          size="small"
        ></n-select>
      </setting-item>
      <setting-item :name="$t('views_components.auto_485')"
>
        <n-select v-model:value="optionData.line.style.lineCap" :options="styleConfig.lineCap" size="small"></n-select>
      </setting-item>
    </SettingItemBox>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { vChartGlobalThemeJsonType } from '@/settings/vchartThemes/index'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { styleConfig } from '@/packages/chartConfiguration/vcharts/index'

defineProps({
  optionData: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  }
})
</script>
