<template>
  <div class="go-chart-configurations-setting" v-if="targetData">
    <!-- Danh xưng -->
    <name-setting :chartConfig="targetData.chartConfig"></name-setting>
    <!-- kích cỡ -->
    <size-setting :isGroup="targetData.isGroup" :chartAttr="targetData.attr"></size-setting>
    <!-- Vị trí -->
    <position-setting :chartAttr="targetData.attr" :canvasConfig="chartEditStore.getEditCanvasConfig" />
    <!-- Tone Filter -->
    <styles-setting :isGroup="targetData.isGroup" :chartStyles="targetData.styles"></styles-setting>
    <!-- Các mục cấu hình tùy chỉnh -->
    <component :is="targetData.chartConfig.conKey" :optionData="targetData.option"></component>
  </div>
</template>

<script setup lang="ts">
import { NameSetting, PositionSetting, SizeSetting, StylesSetting } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../hooks/useTargetData.hook'
const { targetData, chartEditStore } = useTargetData()
</script>

<style lang="scss" scoped>
@include go('chart-configurations-setting') {
}
</style>
