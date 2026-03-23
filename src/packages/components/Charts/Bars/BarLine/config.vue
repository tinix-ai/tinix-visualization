<template>
  <!-- Echarts Cấu hình toàn cầu -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem
    v-for="(item, index) in seriesList"
    :key="index"
    :name="window['$t']('packages.auto_119')"
    :expanded="true"
  >
    <template #header>
      <n-text class="go-fs-13" depth="3">
        {{ item.type == 'bar' ? window['$t']('packages.auto_120') : window['$t']('packages.auto_117') }}
      </n-text>
    </template>
    <SettingItemBox :name="$t('packages.auto_116')"
>
      <SettingItem :name="$t('packages.auto_109')"
>
        <n-select
          :value="item.type"
          size="small"
          :options="[
            { label: window['$t']('packages.auto_99'), value: 'bar' },
            { label: window['$t']('packages.auto_96'), value: 'line' }
          ]"
          @update:value="(value: any) => {
            updateHandle(item, value)
          }"
        />
      </SettingItem>
 
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_106')"
 v-if="item.type == 'bar'">
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
        <n-input-number v-model:value="item.itemStyle.borderRadius" :min="0" size="small"></n-input-number>
      </SettingItem>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_118')"
 v-if="item.type == 'line'">
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
        <n-select v-model:value="item.lineStyle.type" size="small" :options="lineConf.lineStyle.type"></n-select>
      </SettingItem>
      <setting-item>
        <n-space>
          <n-switch v-model:value="item.smooth" size="small" />
          <n-text>{{ $t('phase7.auto_240') }}</n-text>
        </n-space>
      </setting-item>
    </SettingItemBox>
    <SettingItemBox :name="$t('packages.auto_122')"
 v-if="item.type == 'line'">
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
        <n-input-number v-model:value="item.label.fontSize" size="small" :min="1"></n-input-number>
      </setting-item>
      <setting-item :name="$t('packages.auto_121')"
>
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('packages.auto_111')"
>
        <n-select
          v-model:value="item.label.position"
          :options="[
            { label: window['$t']('packages.auto_29'), value: 'top' },
            { label: window['$t']('packages.auto_30'), value: 'left' },
            { label: window['$t']('packages.auto_28'), value: 'right' },
            { label: window['$t']('packages.auto_27'), value: 'bottom' }
          ]"
        />
      </setting-item>
    </setting-item-box>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed, toRaw } from 'vue'
import { merge, cloneDeep } from 'lodash';

import GlobalSetting from '@/components/Pages/ChartItemSetting/GlobalSetting.vue'
import CollapseItem from '@/components/Pages/ChartItemSetting/CollapseItem.vue'
import SettingItemBox from '@/components/Pages/ChartItemSetting/SettingItemBox.vue'
import SettingItem from '@/components/Pages/ChartItemSetting/SettingItem.vue'

import { lineConf } from '@/packages/chartConfiguration/echarts'
import { GlobalThemeJsonType } from '@/settings/chartThemes'
import { barSeriesItem, lineSeriesItem } from './config'


const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

const updateHandle = (item:any, value:string) => {
  const _label = cloneDeep(toRaw(item.label))
  lineSeriesItem.label = _label
  if (value === 'line') {
    merge(item, lineSeriesItem)
  } else {
    merge(item, barSeriesItem)
  }
}
</script>
