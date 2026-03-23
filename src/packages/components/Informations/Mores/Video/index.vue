<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- QUAN TRỌNG: Phải set crossOrigin="anonymous", nếu không hình ảnh sẽ tèo -->
  <video
    ref="vVideoRef"
    class="go-video"
    preload="auto"
    crossOrigin="anonymous"
    playsinline
    autoplay
    :loop="option.loop"
    :muted="option.muted"
    :width="w"
    :height="h"
    :src="option.dataset"
  ></video>
</template>

<script setup lang="ts">
import { PropType, toRefs, shallowReactive, watch, ref } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
let option = shallowReactive({ ...configOption })

// Xem trước bản cập nhật
const vVideoRef = ref(null)
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})

// Sửa (Edit)gia hạn
watch(
  () => props.chartConfig.option,
  (newData: any) => {
    option = newData
    if (!vVideoRef.value) return
    const video: any = vVideoRef.value
    video.loop = option.loop
    video.muted = option.muted
    video.play()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<style lang="scss" scoped>
@include go('video') {
  display: block;
  object-fit: v-bind('option.fit');
}
</style>
