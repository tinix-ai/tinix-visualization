<template>
  <!-- Echarts Cấu hình toàn cầu -->
  <global-setting :optionData="optionData"> </global-setting>
  <!-- Biểu đồ hình phễu -->
  <collapse-item v-for="(item, index) in seriesList" :key="index" :name="window['$t']('packages.auto_253')" expanded>
    <setting-item-box :name="$t('packages.auto_250')"
 alone>
      <setting-item>
        <n-select v-model:value="item.sort" :options="FunnelOrderEnumList" size="small" />
      </setting-item>
    </setting-item-box>

    <SettingItemBox :name="$t('packages.auto_254')"
 :alone="true">
      <setting-item :name="window['$t']('packages.auto_255')">
        <n-slider v-model:value="item.top" :min="0" :max="300" :format-tooltip="sliderFormatTooltip"></n-slider>
      </setting-item>
    </SettingItemBox>

    <setting-item-box :name="$t('packages.auto_257')"
>
      <setting-item :name="$t('packages.auto_204')"
>
        <n-input-number v-model:value="item.itemStyle.borderWidth" :min="0" :max="10" size="small" />
      </setting-item>
      <setting-item :name="$t('packages.auto_256')"
>
        <n-color-picker v-model:value="item.itemStyle.borderColor" :modes="['hex']" size="small" />
      </setting-item>
      <setting-item :name="$t('packages.auto_252')"
>
        <n-input-number v-model:value="item.gap" :min="0" :max="20" size="small" />
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('packages.auto_108')"
>
      <setting-item :name="$t('packages.auto_143')"
>
        <n-checkbox v-model:checked="item.label.show" size="small">{{ $t('phase7.auto_253') }}</n-checkbox>
      </setting-item>
      <setting-item :name="$t('packages.auto_111')"
>
        <n-select v-model:value="item.label.position" :options="FunnelLabelPositionEnumList" size="small" />
      </setting-item>
      <setting-item :name="$t('packages.auto_104')"
>
        <n-input-number v-model:value="item.label.fontSize" :min="0" size="small" />
      </setting-item>
      <setting-item :name="$t('packages.auto_251')"
>
        <n-input-number v-model:value="item.emphasis.label.fontSize" :min="0" size="small" />
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { option, FunnelOrderEnumList, FunnelLabelPositionEnumList } from './config'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})

const sliderFormatTooltip = (v: number) => {
  return `${v}px`
}
</script>
