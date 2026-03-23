<template>
  <n-space class="go-decorates-flipper-number" :size="flipperGap" align="center" justify="center">
    <flipper
      :count="item"
      :width="flipperWidth"
      :height="flipperHeight"
      :front-color="flipperTextColor"
      :back-color="flipperBgColor"
      :radius="flipperRadius"
      :flip-type="flipperType"
      :duration="flipperSpeed"
      :border-width="flipperBorderWidth"
      v-for="(item, index) in flipperData"
      :key="index"
      class="go-d-block"
    />
  </n-space>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'
import { Flipper } from '@/components/Pages/Flipper'
import { OptionType } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)

const {
  flipperLength,
  flipperBgColor,
  flipperTextColor,
  flipperWidth,
  flipperHeight,
  flipperRadius,
  flipperGap,
  flipperType,
  flipperSpeed,
  flipperBorderWidth
} = toRefs(props.chartConfig.option as OptionType)

const flipperData = ref<string[] | number[]>([])
const getFlipperData = (val: string | number) => {
  return val
    .toString()
    .padStart(flipperLength.value, '0') // {{ $t('phase7.auto_334') }}Căn chỉnh bên góc phải
    .split('') // Đổi mảng
    .slice(flipperLength.value * -1) // Lấy chiều dài cố định từ phía sau
}
const updateDatasetHandler = (newVal: string | number) => {
  flipperData.value = getFlipperData(newVal)
}

watch(
  () => props.chartConfig.option,
  newVal => {
    try {
      updateDatasetHandler((newVal as any as OptionType).dataset)
    } catch (error) {
      console.log(error)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

useChartDataFetch(props.chartConfig, useChartEditStore, (newVal: string | number) => {
  updateDatasetHandler(newVal)
})
</script>

<style lang="scss" scoped>
@include go('decorates-flipper-number') {
  width: v-bind('`${w}px`');
  height: v-bind('`${h}px`');
}
</style>
