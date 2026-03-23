<template>
  <CollapseItem :name="$t('packages.auto_118')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_406')"
>
      <SettingItem :name="$t('packages.auto_402')"
>
        <n-input-number size="small" :min="0" v-model:value="optionData.lineNum"></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_403')"
>
        <n-input-number size="small" :min="0" v-model:value="optionData.lineNumUp"></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_407')"
>
      <SettingItem :name="$t('packages.auto_404')"
>
        <n-input-number size="small" :min="1" v-model:value="optionData.lineWidth"></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_405')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.backgroundCol"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_401')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.animateCol"></n-color-picker>
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
