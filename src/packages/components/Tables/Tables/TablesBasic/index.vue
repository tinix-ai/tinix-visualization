<template>
  <div class="go-tables-basic">
    <n-input
      v-model:value="inputData"
      :placeholder="$t('packages.auto_639')"

      :style="`display: ${inputShow}`"
      style="margin-bottom: 5px; float: right; width: 240px"
    >
      <template #prefix>
        <n-icon :component="SearchIcon" />
      </template>
    </n-input>
    <n-data-table
      :style="`
      width: ${w}px;
      height: ${h}px;
      font-size: ${option.style.fontSize}px;
      border-width: ${option.style.border === 'on' ? option.style.borderWidth : 0}px;
      border-color: ${option.style.borderColor};
      border-style: ${option.style.borderStyle}`"
      :bordered="option.style.border === 'on'"
      :single-column="option.style.singleColumn === 'on'"
      :single-line="option.style.singleLine === 'on'"
      :bottom-bordered="option.style.bottomBordered === 'on'"
      :striped="option.style.striped === 'on'"
      :max-height="h"
      size="small"
      :columns="option.dataset.dimensions"
      :data="filterData"
      :pagination="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, toRefs, watch, reactive, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { icon } from '@/plugins'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartDataFetch } from '@/hooks'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { SearchIcon } = icon.ionicons5

//Trường truy vấn
const inputData = ref('')
//Lọc giao diện người dùng
const filterData = computed(() => {
  return option?.dataset?.source?.filter((item: any) => {
    return Object.values(item).some(val => {
      return String(val).toLowerCase().includes(inputData.value.toLowerCase())
    })
  })
})

const { align, pagination, inputShow } = toRefs(props.chartConfig.option)

pagination.value.onChange = (page: number) => {
  pagination.value.page = page
}

const { w, h } = toRefs(props.chartConfig.attr)

const option = reactive({
  dataset: props.chartConfig.option.dataset,
  style: props.chartConfig.option.style
})

watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
    option?.dataset?.dimensions?.forEach((header: any) => {
      header.align = align.value
    })
  },
  {
    immediate: true,
    deep: true
  }
)

// setdata Giám sát và thay đổi dữ liệu
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  props.chartConfig.option.dataset = newData
})


</script>

<style lang="scss" scoped>
@include go('tables-basic') {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-end;
}
</style>
