<template>
  <CollapseItem :name="$t('packages.auto_12')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_163')"
>
      <SettingItem :name="$t('packages.auto_614')"
>
        <n-input-number
          v-model:value="optionData.rowNum"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_611')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_615')"
>
        <n-input-number
          v-model:value="optionData.waitTime"
          :min="1"
          size="small"
          :placeholder="$t('packages.auto_607')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_612')"
>
        <n-input
          v-model:value="optionData.unit"
          size="small"
          :placeholder="$t('packages.auto_612')"

        ></n-input>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_150')"
>
      <SettingItem :name="$t('packages.auto_605')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.color"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_608')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.textColor"
        ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_609')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.borderColor"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_606')"
>
       <SettingItem :name="$t('packages.auto_613')"
>
        <n-input-number
          size="small"
          v-model:value="optionData.indexFontSize"
          :min="12"
        />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_604')"
>
        <n-input-number
          size="small"
          v-model:value="optionData.leftFontSize"
          :min="12"
        />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_610')"
>
        <n-input-number
          size="small"
          v-model:value="optionData.rightFontSize"
          :min="12"
        />
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
import { option } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})
</script>
