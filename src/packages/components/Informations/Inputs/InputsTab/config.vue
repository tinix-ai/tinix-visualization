<template>
  <collapse-item :name="$t('packages.auto_534')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_533')"
 :alone="true">
      <n-select size="small" v-model:value="optionData.tabType" :options="tabTypeOptions" />
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_502')"
 :alone="true">
       <n-select size="small" v-model:value="optionData.tabLabel" value-field="label" :options="optionData.dataset" />
    </setting-item-box>
  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const tabTypeOptions = [
  {
    label: window['$t']('packages.auto_118'),
    value: 'bar'
  },
  {
    label: window['$t']('packages.auto_535'),
    value: 'segment'
  }
]
</script>
