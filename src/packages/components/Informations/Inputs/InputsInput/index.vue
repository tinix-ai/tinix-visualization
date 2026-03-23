<template>
  <div>
    <n-input :style="`width:${w}px;`" type="text"
             v-model:value="option.value.dataset"
             :placeholder="$t('packages.auto_520')"

             @change="onChange">

    </n-input>
  </div>
</template>

<script lang="ts" setup>
import { PropType, toRefs, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const option = shallowReactive({
  value: {
    inputValue: props.chartConfig.option.inputValue,
    dataset: props.chartConfig.option.dataset
  }
})

const onChange = (v: string) => {
  if(v == undefined) return;
  // Lưu trữ trong dữ liệu được liên kết
  useChartInteract(
      props.chartConfig,
      useChartEditStore,
      { [ComponentInteractParamsEnum.DATA]: v },
      InteractEventOn.CHANGE
  )
}

// Cập nhật thủ công
watch(
    () => props.chartConfig.option,
    (newData: any) => {
      option.value = newData
      onChange(newData.inputValue)
    },
    {
      immediate: true,
      deep: true
    }
)

</script>





