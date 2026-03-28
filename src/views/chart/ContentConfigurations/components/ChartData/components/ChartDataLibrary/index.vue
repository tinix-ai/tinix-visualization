<template>
  <div class="go-chart-data-library">
    <n-space vertical>
      <setting-item-box name="Chọn từ Thư viện" :alone="true">
        <n-select
          v-model:value="selectedDatasetId"
          :options="datasetOptions"
          placeholder="Chọn một tập dữ liệu..."
          @update:value="handleDatasetSelect"
        />
      </setting-item-box>

      <n-button type="primary" ghost @click="fetchDatasets" size="small">
        <template #icon>
          <n-icon :component="RefreshIcon" />
        </template>
        Làm mới danh sách
      </n-button>
      
      <n-divider />

      <template v-if="selectedDatasetId">
        <n-text depth="3">Đang sử dụng tập dữ liệu: </n-text>
        <n-tag type="success" size="small">{{ currentDatasetName }}</n-tag>
      </template>

      <!-- Dữ liệu Xem/Khớp -->
      <chart-data-matching-and-show :show="!!selectedDatasetId" :ajax="false" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, toRaw } from 'vue'
import { icon } from '@/plugins'
import { getDatasetsApi } from '@/api/storage.api'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow'
import { newFunctionHandle } from '@/utils'

const { RefreshIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()

const loading = ref(false)
const datasets = ref([])
const selectedDatasetId = ref<string | null>(null)

// Map options for select
const datasetOptions = computed(() => {
  return datasets.value.map((d: any) => ({
    label: d.name,
    value: d.id
  }))
})

const currentDatasetName = computed(() => {
  return datasets.value.find((d: any) => d.id === selectedDatasetId.value)?.name || ''
})

// Fetch available datasets
const fetchDatasets = async () => {
  loading.value = true
  const data = await getDatasetsApi()
  if (data) {
    datasets.value = data
  }
  loading.value = false
}

// Handle selection change
const handleDatasetSelect = (id: string) => {
  const dataset = datasets.value.find((d: any) => d.id === id)
  if (dataset) {
    // Inject data into targetData
    // We store the ID in the request config for persistence
    if (!targetData.value.request) {
      targetData.value.request = {} as any
    }
    targetData.value.request.requestDataPondId = id // Reusing this field or adding new one
    // For now we just inject the content
    targetData.value.option.dataset = newFunctionHandle(dataset.content, dataset, targetData.value.filter)
  }
}

onMounted(() => {
  fetchDatasets()
  // Restore selection if exists
  if (targetData.value.request?.requestDataPondId) {
    selectedDatasetId.value = targetData.value.request.requestDataPondId
  }
})
</script>

<style scoped lang="scss">
.go-chart-data-library {
  padding: 5px;
}
</style>
