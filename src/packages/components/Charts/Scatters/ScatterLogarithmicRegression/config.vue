<template>
  <!-- Echarts Cấu hình toàn cầu -->
  <global-setting :optionData="optionData" :in-chart="true"></global-setting>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting } from '@/components/Pages/ChartItemSetting'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})
</script>
