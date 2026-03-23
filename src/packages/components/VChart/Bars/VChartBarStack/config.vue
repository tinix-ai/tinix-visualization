<template>
  <!-- vCharts Cấu hình toàn cầu -->
  <VChartGlobalSetting :optionData="optionData"></VChartGlobalSetting>
  <Axis :axis="optionData.xAxis"></Axis>
  <Axis :axis="optionData.yAxis"></Axis>
  <!-- Nhãn -->
  <Label :optionData="optionData"></Label>
  <!-- xi lanh -->
  <Bar :optionData="optionData"></Bar>
  <!-- BậtTrămPhútSo sánh -->
  <CollapseItem :name="$t('packages.auto_664')"
>
    <SettingItemBox :name="$t('packages.auto_217')"
 alone>
      <n-space>
        <span>{{ $t('phase7.auto_125') }}</span>
        <n-switch v-model:value="optionData.percent" size="small"></n-switch>
      </n-space>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { VChartGlobalSetting, Axis, Label, Bar } from '@/components/Pages/VChartItemSetting'
import { vChartGlobalThemeJsonType } from '@/settings/vchartThemes/index'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'

defineProps({
  optionData: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  }
})
</script>
