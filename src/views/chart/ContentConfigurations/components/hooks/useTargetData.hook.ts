import { computed, Ref } from 'vue'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

// Lấy dữ liệu đối tượng hiện tại
export const useTargetData = () => {
  const chartEditStore = useChartEditStore()
  const targetData: Ref<CreateComponentType | CreateComponentGroupType> = computed(() => {
    const list = chartEditStore.getComponentList
    const targetIndex = chartEditStore.fetchTargetIndex()
    return list[targetIndex]
  })
  return { targetData, chartEditStore }
}
