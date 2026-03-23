<template>
  <!-- Echarts Cấu hình toàn cầu -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem :name="$t('packages.auto_342')"
 :expanded="true">
    <SettingItemBox :name="$t('packages.auto_116')"
>
      <SettingItem>
        <n-select v-model:value="optionData.type" size="small" :options="fontWeightOptions" />
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_351')"
 :alone="true">
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.isCarousel" size="small"></n-switch>
          <n-text>Bật<n-text :depth="3">{{ $t('phase7.auto_81') }}</n-text></n-text>
        </n-space>
      </SettingItem>
      <SettingItem>
        <n-text :depth="3">{{ $t('phase7.auto_369') }}</n-text>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_106')"
>
      <setting-item :name="$t('packages.auto_345')"
>
        <n-input v-model:value="optionData.series[0].radius[0]" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('packages.auto_340')"
>
        <n-input v-model:value="optionData.series[0].radius[1]" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('packages.auto_341')"
>
        <n-input v-model:value="optionData.series[0].center[0]" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('packages.auto_347')"
>
        <n-input v-model:value="optionData.series[0].center[1]" size="small"></n-input>
      </setting-item>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_108')"
>
      <SettingItem>
        <n-space>
          <n-switch v-model:value="optionData.series[0].label.show" size="small"></n-switch>
          <n-text>{{ $t('phase7.auto_305') }}</n-text>
        </n-space>
      </SettingItem>
      <setting-item>
        <n-space>
          <n-switch v-model:value="optionData.series[0].labelLine.show" size="small"></n-switch>
          <n-text>{{ $t('phase7.auto_475') }}</n-text>
        </n-space>
      </setting-item>
      <SettingItem :name="$t('packages.auto_111')"
>
        <n-select v-model:value="optionData.series[0].label.position" size="small" :options="labelConfig.position" />
      </SettingItem>
      <setting-item :name="$t('packages.auto_348')"
>
        <n-select v-model:value="optionData.series[0].label.formatter" size="small" :options="labelFormatterOptions" />
      </setting-item>
    </SettingItemBox>
    <setting-item-box :name="$t('packages.auto_244')"
>
      <setting-item :name="$t('packages.auto_104')"
>
        <n-input-number v-model:value="optionData.series[0].label.fontSize" size="small" :min="0"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_21')"
 v-if="optionData.series[0].label.color">
        <n-color-picker size="small" :modes="['hex']" v-model:value="optionData.series[0].label.color"></n-color-picker>
      </setting-item>
      <SettingItem :name="$t('packages.auto_343')"
 v-if="optionData.series[0].label.fontWeight">
        <n-select
          v-model:value="optionData.series[0].label.fontWeight"
          size="small"
          :options="labelConfig.fontWeight"
        />
      </SettingItem>
      <setting-item :name="$t('packages.auto_354')"
 v-if="optionData.series[0].label.textBorderWidth > -1">
        <n-input-number
          v-model:value="optionData.series[0].label.textBorderWidth"
          size="small"
          :min="0"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_353')"
 v-if="optionData.series[0].label.textBorderColor">
        <n-color-picker
          size="small"
          :modes="['hex']"
          v-model:value="optionData.series[0].label.textBorderColor"
        ></n-color-picker>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_352')"
>
      <setting-item :name="$t('packages.auto_356')"
>
        <n-input-number
          v-model:value="optionData.series[0].itemStyle.borderRadius"
          size="small"
          :min="0"
        ></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_349')"
>
        <n-input-number
          v-model:value="optionData.series[0].itemStyle.borderWidth"
          size="small"
          :min="0"
        ></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('packages.auto_344')"
>
      <setting-item :name="$t('packages.auto_271')"
>
        <n-input-number
          v-model:value="optionData.series[0].emphasis.label.fontSize"
          size="small"
          :min="0"
        ></n-input-number>
      </setting-item>
      <SettingItem :name="$t('packages.auto_343')"
 v-if="optionData.series[0].emphasis.label.fontWeight">
        <n-select
          v-model:value="optionData.series[0].emphasis.label.fontWeight"
          size="small"
          :options="labelConfig.fontWeight"
        />
      </SettingItem>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, watch } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { PieTypeObject, PieTypeEnum } from './config'
import { labelConfig } from '@/packages/chartConfiguration/echarts'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})
const fontWeightOptions = [
  {
    label: PieTypeEnum.NORMAL,
    value: PieTypeObject[PieTypeEnum.NORMAL]
  },
  {
    label: PieTypeEnum.RING,
    value: PieTypeObject[PieTypeEnum.RING]
  },
  {
    label: PieTypeEnum.ROSE,
    value: PieTypeObject[PieTypeEnum.ROSE]
  }
]

const labelFormatterOptions = [
  { label: window['$t']('packages.auto_350'), value: '{b}' },
  { label: window['$t']('packages.auto_346'), value: '{d}' },
  { label: window['$t']('packages.auto_355'), value: '{b}:{d}%' }
]
</script>
