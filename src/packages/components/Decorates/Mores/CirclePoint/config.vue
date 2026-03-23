<template>
  <CollapseItem :name="$t('packages.auto_118')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_391')"
>
      <SettingItem :name="$t('packages.auto_410')"
>
        <n-input-number
            size="small"
            v-model:value="optionData.outCircle"
        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_409')"
>
        <n-input-number
            size="small"
            v-model:value="optionData.inCircle"
        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_411')"
>
        <n-input-number
            size="small"
            v-model:value="optionData.outCircleWidth"
        ></n-input-number>
      </SettingItem>

      <SettingItem :name="$t('packages.auto_413')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.outCircleColor"></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_412')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.inCircleColor"></n-color-picker>
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
