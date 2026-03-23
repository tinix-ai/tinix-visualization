<template>
  <CollapseItem :name="$t('packages.auto_118')"
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
    <SettingItemBox :name="$t('packages.auto_391')"
>
      <SettingItem :name="$t('packages.auto_390')"
>
        <n-input-number
          size="small"
          v-model:value="optionData.lineHeight"
        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_392')"
>
        <n-input-number
          size="small"
          v-model:value="optionData.endWidth"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem :name="$t('packages.auto_351')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_372')"
>
      <SettingItem>
        <n-input-number
          v-model:value="optionData.dur"
          size="small"
          :step="0.5"
          :min="0.5"
        ></n-input-number>
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
