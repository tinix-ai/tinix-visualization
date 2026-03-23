<template>
  <CollapseItem :name="$t('packages.auto_368')"
 :expanded="true">
    <SettingItemBox
      :name="window['$t']('packages.auto_373')"
      v-for="(item, index) in optionData.colors"
      :key="index"
    >
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.colors[index]"
        ></n-color-picker>
      </SettingItem>
      <SettingItem>
        <n-button
          size="small"
          @click="optionData.colors[index] = option.colors[index]"
        >
          {{ $t('phase7.auto_58') }}
        </n-button>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
  
  <CollapseItem :name="$t('packages.auto_297')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_21')"
>
      <SettingItem>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.backgroundColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
</script>
