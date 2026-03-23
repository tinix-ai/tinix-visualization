<template>
  <div class="go-chart-configurations-data" v-if="targetData">
    <setting-item-box :name="$t('views_components.auto_94')"
 :alone="true">
      <n-select v-model:value="targetData.request.requestDataType" :disabled="isNotData" :options="selectOptions" />
    </setting-item-box>
    <!-- Static (Cứng) -->
    <chart-data-static v-if="targetData.request.requestDataType === RequestDataTypeEnum.STATIC"></chart-data-static>
    <!-- Dynamic (Động) -->
    <chart-data-ajax v-if="targetData.request.requestDataType === RequestDataTypeEnum.AJAX"></chart-data-ajax>
    <!-- Dữ liệuhồ bơi -->
    <chart-data-pond v-if="targetData.request.requestDataType === RequestDataTypeEnum.Pond"></chart-data-pond>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { loadAsyncComponent } from '@/utils'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { ChartFrameEnum } from '@/packages/index.d'
import { useTargetData } from '../hooks/useTargetData.hook'
import { SelectCreateDataType, SelectCreateDataEnum } from './index.d'

const ChartDataStatic = loadAsyncComponent(() => import('./components/ChartDataStatic/index.vue'))
const ChartDataAjax = loadAsyncComponent(() => import('./components/ChartDataAjax/index.vue'))
const ChartDataPond = loadAsyncComponent(() => import('./components/ChartDataPond/index.vue'))

const { targetData } = useTargetData()

// Tùy chọn
const selectOptions: SelectCreateDataType[] = [
  {
    label: SelectCreateDataEnum.STATIC,
    value: RequestDataTypeEnum.STATIC
  },
  {
    label: SelectCreateDataEnum.AJAX,
    value: RequestDataTypeEnum.AJAX
  },
  {
    label: SelectCreateDataEnum.Pond,
    value: RequestDataTypeEnum.Pond
  }
]

// Báo cáo No-datanguồn
const isNotData = computed(() => {
  return (
    targetData.value.chartConfig?.chartFrame === ChartFrameEnum.STATIC ||
    typeof targetData.value?.option?.dataset === 'undefined'
  )
})
</script>
