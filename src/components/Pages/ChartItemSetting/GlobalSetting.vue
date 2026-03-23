<template>
  <collapse-item :name="$t('views_components.auto_415')"
>
    <setting-item-box :alone="true">
      <template #name>
        <n-text>{{ $t('phase7.auto_218') }}</n-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <n-text>{{ $t('phase7.auto_471') }}</n-text>
        </n-tooltip>
      </template>
      <EchartsRendererSetting v-model="themeSetting.renderer" />
    </setting-item-box>
    <setting-item-box :alone="true">
      <template #name>
        <n-text>{{ $t('phase7.auto_80') }}</n-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <n-text>{{ $t('phase7.auto_278') }}</n-text>
        </n-tooltip>
      </template>
      <EchartsRendererSetting v-model="optionData.renderer" includeInherit />
    </setting-item-box>
  </collapse-item>
  <collapse-item v-if="title" :name="$t('views_components.auto_397')"
>
    <template #header>
      <n-switch v-model:value="title.show" size="small"></n-switch>
    </template>
    <setting-item-box :name="$t('views_components.auto_397')"
>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker v-model:value="title.textStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_427')"
>
        <n-input-number v-model:value="title.textStyle.fontSize" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_409')"
>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker size="small" v-model:value="title.subtextStyle.color"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_427')"
>
        <n-input-number v-model:value="title.subtextStyle.fontSize" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item v-if="grid" :name="$t('views_components.auto_400')"
>
    <setting-item-box :name="$t('views_components.auto_408')"
>
      <setting-item :name="$t('views_components.auto_387')"
>
        <n-input v-model:value="grid.left" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('views_components.auto_417')"
>
        <n-input v-model:value="grid.right" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('views_components.auto_424')"
>
        <n-input v-model:value="grid.top" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('views_components.auto_423')"
>
        <n-input v-model:value="grid.bottom" size="small"></n-input>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item v-if="xAxis" :name="$t('views_components.auto_413')"
>
    <template #header>
      <n-switch v-model:value="xAxis.show" size="small"></n-switch>
    </template>
    <setting-item-box :name="$t('views_components.auto_399')"
>
      <setting-item :name="$t('views_components.auto_177')"
>
        <n-input v-model:value="xAxis.name" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker size="small" v-model:value="xAxis.nameTextStyle.color"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_427')"
>
        <n-input-number v-model:value="xAxis.nameTextStyle.fontSize" :min="12" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_425')"
>
        <n-input-number v-model:value="xAxis.nameGap" :min="5" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_412')"
>
      <setting-item :name="$t('views_components.auto_279')"
>
        <n-space>
          <n-switch v-model:value="xAxis.axisLabel.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker size="small" v-model:value="xAxis.axisLabel.color"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_427')"
>
        <n-input-number v-model:value="xAxis.axisLabel.fontSize" :min="8" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_425')"
>
        <n-input-number v-model:value="xAxis.axisLabel.rotate" :min="-90" :max="90" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_385')"
>
      <setting-item :name="$t('views_components.auto_279')"
>
        <n-space>
          <n-switch v-model:value="xAxis.axisLine.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker v-model:value="xAxis.axisLine.lineStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_403')"
>
        <n-input-number v-model:value="xAxis.axisLine.lineStyle.width" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_390')"
>
        <n-select v-model:value="xAxis.position" size="small" :options="axisConfig.xposition"></n-select>
      </setting-item>
      <setting-item :name="$t('views_components.auto_389')"
>
        <n-space>
          <n-switch v-model:value="xAxis.axisLine.onZero" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_406')"
>
        <n-space>
          <n-switch v-model:value="xAxis.inverse" size="small"></n-switch>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_391')"
>
      <setting-item :name="$t('views_components.auto_279')"
>
        <n-space>
          <n-switch v-model:value="xAxis.axisTick.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_398')"
>
        <n-input-number v-model:value="xAxis.axisTick.length" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_426')"
>
      <setting-item :name="$t('views_components.auto_279')"
>
        <n-space>
          <n-switch v-model:value="xAxis.splitLine.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker v-model:value="xAxis.splitLine.lineStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_403')"
>
        <n-input-number v-model:value="xAxis.splitLine.lineStyle.width" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_103')"
>
        <n-select
          v-model:value="xAxis.splitLine.lineStyle.type"
          size="small"
          :options="axisConfig.splitLint.lineStyle.type"
        ></n-select>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item v-if="yAxis" :name="$t('views_components.auto_384')"
>
    <template #header>
      <n-switch v-model:value="yAxis.show" size="small"></n-switch>
    </template>
    <setting-item-box :name="$t('views_components.auto_399')"
>
      <setting-item :name="$t('views_components.auto_177')"
>
        <n-input v-model:value="yAxis.name" size="small"></n-input>
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker size="small" v-model:value="yAxis.nameTextStyle.color"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_427')"
>
        <n-input-number v-model:value="yAxis.nameTextStyle.fontSize" :min="8" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_425')"
>
        <n-input-number v-model:value="yAxis.nameGap" :min="5" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_412')"
>
      <setting-item :name="$t('views_components.auto_279')"
>
        <n-space>
          <n-switch v-model:value="yAxis.axisLabel.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker size="small" v-model:value="yAxis.axisLabel.color"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_427')"
>
        <n-input-number v-model:value="yAxis.axisLabel.fontSize" :min="8" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_425')"
>
        <n-input-number v-model:value="yAxis.axisLabel.rotate" :min="-90" :max="90" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_385')"
>
      <setting-item :name="$t('views_components.auto_279')"
>
        <n-space>
          <n-switch v-model:value="yAxis.axisLine.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker v-model:value="yAxis.axisLine.lineStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_403')"
>
        <n-input-number v-model:value="yAxis.axisLine.lineStyle.width" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_390')"
>
        <n-select v-model:value="yAxis.position" size="small" :options="axisConfig.yposition"></n-select>
      </setting-item>
      <setting-item :name="$t('views_components.auto_389')"
>
        <n-space>
          <n-switch v-model:value="yAxis.axisLine.onZero" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_406')"
>
        <n-space>
          <n-switch v-model:value="yAxis.inverse" size="small"></n-switch>
        </n-space>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_391')"
>
      <setting-item :name="$t('views_components.auto_279')"
>
        <n-space>
          <n-switch v-model:value="yAxis.axisTick.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_398')"
>
        <n-input-number v-model:value="yAxis.axisTick.length" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_426')"
>
      <setting-item :name="$t('views_components.auto_279')"
>
        <n-space>
          <n-switch v-model:value="yAxis.splitLine.show" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker v-model:value="yAxis.splitLine.lineStyle.color" size="small"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_403')"
>
        <n-input-number v-model:value="yAxis.splitLine.lineStyle.width" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_103')"
>
        <n-select
          v-model:value="yAxis.splitLine.lineStyle.type"
          size="small"
          :options="axisConfig.splitLint.lineStyle.type"
        ></n-select>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item v-if="legend" :name="$t('views_components.auto_396')"
>
    <template #header>
      <n-switch v-model:value="legend.show" size="small"></n-switch>
    </template>
    <setting-item-box :name="$t('views_components.auto_405')"
>
      <setting-item :name="$t('views_components.auto_420')"
>
        <n-color-picker size="small" v-model:value="legend.textStyle.color"></n-color-picker>
      </setting-item>
      <setting-item :name="$t('views_components.auto_427')"
>
        <n-input-number v-model:value="legend.textStyle.fontSize" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_388')"
>
      <setting-item :name="$t('views_components.auto_394')"
>
        <n-select v-model:value="legend.x" size="small" :options="legendConfig.lengendX" />
      </setting-item>
      <setting-item :name="$t('views_components.auto_392')"
>
        <n-select v-model:value="legend.y" size="small" :options="legendConfig.lengendY" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_410')"
>
      <setting-item :name="$t('views_components.auto_411')"
>
        <n-select v-model:value="legend.orient" size="small" :options="legendConfig.orient" />
      </setting-item>
      <setting-item :name="$t('views_components.auto_402')"
>
        <n-select v-model:value="legend.icon" size="small" :options="legendConfig.shape" />
      </setting-item>
    </setting-item-box>
    <setting-item-box :name="$t('views_components.auto_416')"
>
      <setting-item :name="$t('views_components.auto_407')"
>
        <n-input-number v-model:value="legend.itemWidth" :min="1" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_419')"
>
        <n-input-number v-model:value="legend.itemHeight" :min="1" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>
  </collapse-item>

  <collapse-item v-if="visualMap" :name="$t('views_components.auto_401')"
>
    <template #header>
      <n-switch v-model:value="visualMap.show" size="small"></n-switch>
    </template>

    <setting-item-box :name="$t('views_components.auto_393')"
>
      <setting-item :name="$t('views_components.auto_404')"
>
        <n-input-number v-model:value="visualMap.min" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_414')"
>
        <n-input-number v-model:value="visualMap.max" size="small"></n-input-number>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('views_components.auto_420')"
>
      <setting-item name="ex + 1" v-for="(item, index) in visualMap.inRange.color" :key="index">
        <n-color-picker v-model:value="visualMap.inRange.color[index]" size="small"></n-color-picker>
      </setting-item>
    </setting-item-box>

    <setting-item-box :name="$t('views_components.auto_386')"
>
      <setting-item :name="$t('views_components.auto_421')"
>
        <n-select v-model:value="visualMap.orient" size="small" :options="axisConfig.visualMap.orient"></n-select>
      </setting-item>
      <setting-item :name="$t('views_components.auto_32')"
>
        <n-input-number v-model:value="visualMap.itemWidth" :min="5" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_31')"
>
        <n-input-number v-model:value="visualMap.itemHeight" :min="5" size="small"></n-input-number>
      </setting-item>
      <setting-item :name="$t('views_components.auto_418')"
>
        <n-space>
          <n-switch v-model:value="visualMap.inverse" size="small"></n-switch>
        </n-space>
      </setting-item>
      <setting-item :name="$t('views_components.auto_422')"
>
        <n-space>
          <n-switch v-model:value="visualMap.realtime" size="small"></n-switch>
        </n-space>
      </setting-item>
    </setting-item-box>
    <global-setting-position :targetData="visualMap"></global-setting-position>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, computed, watch } from 'vue'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import { axisConfig, legendConfig } from '@/packages/chartConfiguration/echarts/index'
import { CollapseItem, SettingItemBox, SettingItem, GlobalSettingPosition } from '@/components/Pages/ChartItemSetting'
import { icon } from '@/plugins'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import EchartsRendererSetting from './EchartsRendererSetting.vue'

const { HelpOutlineIcon } = icon.ionicons5

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  },
  inChart: {
    type: Boolean,
    required: false,
    default: false
  }
})

const chartEditStore = useChartEditStore()
const themeSetting = computed(() => {
  const chartThemeSetting = chartEditStore.getEditCanvasConfig.chartThemeSetting
  return chartThemeSetting
})

const title = computed(() => {
  return props.optionData.title
})

const xAxis = computed(() => {
  return props.optionData.xAxis
})

const yAxis = computed(() => {
  return props.optionData.yAxis
})

const legend = computed(() => {
  return props.optionData.legend
})

const grid = computed(() => {
  return props.optionData.grid
})

const visualMap = computed(() => {
  return props.optionData.visualMap
})

// màn hìnhlegend colorthay đổi màu sắctype = scrollmàu sắc
watch(() => legend.value && legend.value.textStyle.color, (newVal) => {
  if (legend.value && newVal) {
     if (!legend.value.pageTextStyle) {
      legend.value.pageTextStyle = { color: newVal }
    } else {
      legend.value.pageTextStyle.color = newVal
    }
  }
}, {
  immediate: true,
  deep: true,
})
</script>
