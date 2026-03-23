<template>
  <!-- vCharts Cấu hình toàn cầu -->
  <VChartGlobalSetting :optionData="optionData"></VChartGlobalSetting>
  <Axis :axis="optionData.xAxis"></Axis>
  <Axis :axis="optionData.yAxis"></Axis>
  <!-- Nhãn -->
  <Label :optionData="optionData"></Label>
  <!-- xi lanh -->
  <Bar :optionData="optionData"></Bar>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { VChartGlobalSetting, Axis, Label, Bar } from '@/components/Pages/VChartItemSetting'
import { vChartGlobalThemeJsonType } from '@/settings/vchartThemes/index'

defineProps({
  optionData: {
    type: Object as PropType<vChartGlobalThemeJsonType>,
    required: true
  }
})
</script>
