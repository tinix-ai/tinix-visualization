<template>
  <collapse-item :name="$t('packages.auto_18')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_396')"
 :alone="true">
      <setting-item>
        <n-input v-model:value="optionData.dataset" type="textarea" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>
  <collapse-item :name="$t('packages.auto_150')"
 :expanded="true">
    <setting-item-box :name="$t('packages.auto_396')"
>
      <setting-item :name="$t('packages.auto_223')"
>
        <n-input-number v-model:value="optionData.size" size="small" :placeholder="$t('packages.auto_223')"
></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_595')"
>
      <setting-item :name="$t('packages.auto_594')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.gradient.from"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('packages.auto_596')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.gradient.to"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('packages.auto_286')"
>
        <n-input-number v-model:value="optionData.gradient.deg" size="small" :placeholder="$t('packages.auto_597')"
></n-input-number>
      </setting-item>
    </setting-item-box>

  </collapse-item>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { option } from './config'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
