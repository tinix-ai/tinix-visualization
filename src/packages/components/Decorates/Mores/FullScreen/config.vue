<template>
  <CollapseItem :name="$t('packages.auto_441')"
 expanded>
    <SettingItemBox :name="$t('packages.auto_440')"
>
      <SettingItem :name="$t('packages.auto_417')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.bgColor"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_416')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.borderColor"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_204')"
>
        <n-input-number v-model:value="optionData.border" size="small" :step="0.5" :min="0"></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
