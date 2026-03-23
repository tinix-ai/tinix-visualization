<template>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="$t('packages.auto_321')"

    :expanded="true"
  >
    <SettingItemBox :name="$t('packages.auto_280')"
>
      <SettingItem :name="$t('packages.auto_239')"
>
        <n-input-number
          v-model:value="item.data[0]"
          :min="0"
          :step="0.01"
          size="small"
          :placeholder="$t('packages.auto_320')"

        ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_287')"
>
        <n-select v-model:value="item.shape" :options="shapes" :placeholder="$t('packages.auto_285')"
 />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_130')"
>
        <n-input-number v-model:value="item.label.normal.textStyle.fontSize" :min="0" :step="1" size="small" :placeholder="$t('packages.auto_271')"
>
        </n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_323')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.color[0].colorStops[0].color"
      ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_322')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.color[0].colorStops[1].color"
      ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_297')"
 :alone="true">
      <SettingItem>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.backgroundStyle.color"
        ></n-color-picker>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { option, shapes } from './config'
import {
  CollapseItem,
  SettingItemBox,
  SettingItem,
} from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true,
  },
})

const seriesList = computed(() => {
  return props.optionData.series
})
</script>
