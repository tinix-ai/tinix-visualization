<template>
  <!-- Echarts Cấu hình toàn cầu -->
  <global-setting :optionData="optionData" :in-chart="true"></global-setting>

  <CollapseItem :name="window['$t']('packages.auto_360')" expanded v-for="(item, index) in optionData.series" :key="index">
    <SettingItemBox :name="$t('packages.auto_150')"
>
      <SettingItem :name="$t('packages.auto_116')"
>
        <n-select v-model:value="item.type" size="small" :options="ScatterEffectTypeEnumList" :placeholder="$t('packages.auto_361')"
 />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number v-model:value="item.symbolSize" size="small" :min="1"></n-input-number>
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_362')"
>
      <SettingItem :name="$t('packages.auto_363')"
>
        <n-input-number v-model:value="item.markArea.itemStyle.borderWidth" size="small" :min="0"></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_365')"
>
        <n-select
          v-model:value="item.markArea.itemStyle.borderType"
          size="small"
          :options="axisConfig.splitLint.lineStyle.type"
          :placeholder="$t('packages.auto_361')"

        />
      </SettingItem>
    </SettingItemBox>

    <SettingItemBox :name="$t('packages.auto_364')"
>
      <SettingItem :name="$t('packages.auto_287')"
>
        <n-select v-model:value="item.markPoint.symbol" size="small" :options="SymbolEnumList" :placeholder="$t('packages.auto_361')"
 />
      </SettingItem>
      <SettingItem :name="$t('packages.auto_104')"
>
        <n-input-number v-model:value="item.markPoint.symbolSize" size="small" :min="0"></n-input-number>
      </SettingItem>
    </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
import { ScatterEffectTypeEnumList, SymbolEnumList } from '../shard'
import { axisConfig } from '@/packages/chartConfiguration/echarts/index'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType & typeof option>,
    required: true
  }
})
</script>
