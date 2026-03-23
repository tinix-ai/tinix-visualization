<template>
  <CollapseItem :name="$t('packages.auto_396')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_280')"
 :alone="true">
      <SettingItem>
        <n-input v-model:value="optionData.dataset" size="small"></n-input>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_150')"
>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.textColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number
          v-model:value="optionData.textSize"
          size="small"
          :min="12"
        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>

  <CollapseItem :name="$t('packages.auto_150')"
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
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true,
  },
})
</script>
