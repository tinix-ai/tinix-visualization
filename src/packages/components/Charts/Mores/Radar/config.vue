<template>
  <div>
    <!-- Echarts Cấu hình toàn cầu -->
    <global-setting :optionData="optionData"></global-setting>
    <CollapseItem :name="$t('packages.auto_302')"
 :expanded="true">
      <SettingItemBox :name="$t('packages.auto_150')"
>
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.splitArea.show">{{ $t('phase7.auto_124') }}</n-checkbox>
        </SettingItem>
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.splitLine.show">{{ $t('phase7.auto_246') }}</n-checkbox>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_308')"
>
          <n-select
            v-model:value="radarConfig.shape"
            size="small"
            :options="RadarShapeEnumList"
            :placeholder="$t('packages.auto_285')"

          />
        </SettingItem>
      </SettingItemBox>

      <SettingItemBox :name="$t('packages.auto_303')"
>
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.axisLine.show">{{ $t('phase7.auto_424') }}</n-checkbox>
        </SettingItem>
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.axisTick.show">{{ $t('phase7.auto_430') }}</n-checkbox>
        </SettingItem>
      </SettingItemBox>

      <SettingItemBox :name="$t('packages.auto_254')"
>
        <setting-item :name="window['$t']('packages.auto_307')">
          <n-slider
            v-model:value="radarProp.radius[0]"
            :min="0"
            :max="100"
            :format-tooltip="sliderFormatTooltip"
            @update:value="updateRadius0"
          ></n-slider>
        </setting-item>
        <setting-item :name="window['$t']('packages.auto_299')">
          <n-slider
            v-model:value="radarProp.radius[1]"
            :min="0"
            :max="100"
            :format-tooltip="sliderFormatTooltip"
            @update:value="updateRadius1"
          ></n-slider>
        </setting-item>
      </SettingItemBox>

      <SettingItemBox :name="$t('packages.auto_300')"
>
        <setting-item :name="window['$t']('packages.auto_301')">
          <n-slider
            v-model:value="radarProp.center[0]"
            :min="0"
            :max="100"
            :format-tooltip="sliderFormatTooltip"
            @update:value="updateCenter0"
          ></n-slider>
        </setting-item>
        <setting-item :name="window['$t']('packages.auto_298')">
          <n-slider
            v-model:value="radarProp.center[1]"
            :min="0"
            :max="100"
            :format-tooltip="sliderFormatTooltip"
            @update:value="updateCenter1"
          ></n-slider>
        </setting-item>
      </SettingItemBox>

      <SettingItemBox :name="$t('packages.auto_305')"
>
        <SettingItem :name="$t('packages.auto_21')"
>
          <n-color-picker size="small" :modes="['hex']" v-model:value="radarConfig.axisName.color"></n-color-picker>
        </SettingItem>
        <SettingItem :name="$t('packages.auto_104')"
>
          <n-input-number v-model:value="radarConfig.axisName.fontSize" size="small" :min="9"></n-input-number>
        </SettingItem>
        <SettingItem>
          <n-checkbox v-model:checked="radarConfig.axisName.show">{{ $t('phase7.auto_318') }}</n-checkbox>
        </SettingItem>
      </SettingItemBox>

      <SettingItemBox :name="$t('packages.auto_304')"
 :alone="true">
        <SettingItem :name="$t('packages.auto_306')"
>
          <n-input-number
            v-model:value="optionData.series[0].areaStyle.opacity"
            size="small"
            :min="0"
            :max="1"
            :step="0.1"
          ></n-input-number>
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, reactive } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option, RadarShapeEnumList } from './config'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})

const radarConfig = computed<typeof option.radar>(() => {
  return props.optionData.radar
})

const radarProp = reactive({
  radius: [0, 60],
  center: [50, 50]
})

// Xử lý cập nhật
const updateRadius0 = (value: number) => {
  props.optionData.radar.radius[0] = `${value}%`
}

const updateRadius1 = (value: number) => {
  props.optionData.radar.radius[1] = `${value}%`
}

// Xử lý cập nhật
const updateCenter0 = (value: number) => {
  props.optionData.radar.center[0] = `${value}%`
}

const updateCenter1 = (value: number) => {
  props.optionData.radar.center[1] = `${value}%`
}

// Trăm{{ $t('phase7.auto_434') }}hơn định dạng percent
const sliderFormatTooltip = (v: number) => {
  return `${v}%`
}
</script>
