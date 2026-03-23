<template>
    <collapse-item :name="$t('packages.auto_523')"
 :expanded="true">
      <setting-item-box :alone="false" :name="$t('packages.auto_526')"
>
        <setting-item  :name="$t('packages.auto_524')"
 :alone="true">
          <n-input-number v-model:value="optionData.pageValue" size="small" :placeholder="$t('packages.auto_223')"
></n-input-number>
        </setting-item>
        <setting-item  :name="$t('packages.auto_525')"
 :alone="true">
          <n-select v-model:value="optionData.pageSize" size="small"
                    :options="page" />
        </setting-item>
        <setting-item  :name="$t('packages.auto_522')"
 :alone="true">
          <n-input-number v-model:value="optionData.dataset" size="small" :placeholder="$t('packages.auto_223')"
></n-input-number>
        </setting-item>
      </setting-item-box>
    </collapse-item>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import {CollapseItem, SettingItem, SettingItemBox} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const page = [
  {label:'2',value:2},
  {label:'4',value:4},
  {label:'8',value:8},
  {label:'10',value:10},
  {label:'20',value:20}
]
defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>