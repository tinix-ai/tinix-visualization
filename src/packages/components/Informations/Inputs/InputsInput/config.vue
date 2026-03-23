<template>
  <collapse-item :name="$t('packages.auto_518')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_502')"
 :alone="true">
      <n-input  v-model:value="optionData.dataset"  :placeholder="$t('packages.auto_517')"
/>
    </setting-item-box>
  </collapse-item>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>