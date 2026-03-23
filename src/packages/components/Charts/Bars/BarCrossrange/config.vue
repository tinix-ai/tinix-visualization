<template>
  <!-- Echarts Cấu hình toàn cầu --> 
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="window['$t']('packages.auto_112')" :expanded="true">
    <SettingItemBox :name="$t('packages.auto_106')"
>
      <SettingItem :name="$t('packages.auto_109')"
>
          <n-input-number
          v-model:value="item.barWidth"
          :min="1"
          :max="100"
          size="small"
          :placeholder="$t('packages.auto_110')"

       ></n-input-number>
      </SettingItem>
      <SettingItem :name="$t('packages.auto_105')"
>
          <n-input-number
          v-model:value="item.itemStyle.borderRadius"
          :min="0"
          size="small"
       ></n-input-number>
      </SettingItem>
    </SettingItemBox>
        <setting-item-box :name="$t('packages.auto_108')"
>
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.label.show" size="small" />
          <n-text>{{ $t('phase7.auto_305') }}</n-text>
        </n-space>
      </setting-item>
      <setting-item :name="$t('packages.auto_104')"
>
        <n-input-number
          v-model:value="item.label.fontSize"
          size="small"
          :min="1"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_21')"
>
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="item.label.color"
        ></n-color-picker>
      </setting-item>
      <setting-item :name="$t('packages.auto_111')"
>
        <n-select
          v-model:value="item.label.position"
          :options="[
            { label: 'top', value: 'top' },
            { label: 'left', value: 'left' },
            { label: 'right', value: 'right' },
            { label: 'bottom', value: 'bottom' },
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

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
