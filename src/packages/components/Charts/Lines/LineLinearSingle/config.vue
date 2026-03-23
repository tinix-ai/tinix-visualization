<template>
  <!-- Echarts Cấu hình toàn cầu -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="window['$t']('packages.auto_140')"
    :expanded="true"
  >
    <SettingItemBox :name="$t('packages.auto_118')"
>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.lineStyle.color.colorStops[0].color"
       ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.lineStyle.color.colorStops[1].color"
       ></n-color-picker>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_109')"
>
        <n-input-number
          v-model:value="item.lineStyle.width"
          :min="1"
          :max="100"
          size="small"
          :placeholder="$t('packages.auto_110')"

       ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_116')"
>
        <n-select
          v-model:value="item.lineStyle.type"
          size="small"
          :options="lineConf.lineStyle.type"
       ></n-select>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_122')"
>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number
          v-model:value="item.symbolSize"
          :min="1"
          :max="100"
          size="small"
          :placeholder="$t('packages.auto_110')"

        ></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_139')"
 :alone="true">
      <SettingItem :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.lineStyle.shadowColor"
      ></n-color-picker>
      </SettingItem>
      
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_141')"
>
     <SettingItem :name="$t('packages.auto_139')"
>
        <n-button
          size="small"
          @click="item.lineStyle.shadowColor = 'rgba(0, 0, 0, 0)'"
        >
          Xóa Shadow
        </n-button>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { lineConf } from '@/packages/chartConfiguration/echarts/index'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import {
  GlobalSetting,
  CollapseItem,
  SettingItemBox,
  SettingItem
} from '@/components/Pages/ChartItemSetting'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})
</script>
