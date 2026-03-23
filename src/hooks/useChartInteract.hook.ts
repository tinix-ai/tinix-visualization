import { toRefs } from 'vue'
import { isPreview } from '@/utils'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

// Nhận loại
type ChartEditStoreType = typeof useChartEditStore

// Params Trình kích hoạt sửa đổi tham số api Yêu cầu cập nhật biểu đồ
export const useChartInteract = (
  chartConfig: CreateComponentType,
  useChartEditStore: ChartEditStoreType,
  param: { [T: string]: any },
  interactEventOn: string
) => {
  if (!isPreview()) return
  const chartEditStore = useChartEditStore()
  const { interactEvents } = chartConfig.events
  const fnOnEvent = interactEvents.filter(item => {
    return item.interactOn === interactEventOn
  })

  if (fnOnEvent.length === 0) return
  fnOnEvent.forEach(item => {

    const globalConfigPindAprndex = chartEditStore.requestGlobalConfig.requestDataPond.findIndex(cItem =>
      cItem.dataPondId === item.interactComponentId
    )
    if (globalConfigPindAprndex !== -1) {
      const { Params, Header } = toRefs(chartEditStore.requestGlobalConfig.requestDataPond[globalConfigPindAprndex].dataPondRequestConfig.requestParams)

      Object.keys(item.interactFn).forEach(key => {
        if (key in Params.value) {
          Params.value[key] = param[item.interactFn[key]]
        }
        if (key in Header.value) {
          Header.value[key] = param[item.interactFn[key]]
        }
      })
    } else {
      const index = chartEditStore.fetchTargetIndex(item.interactComponentId)
      if (index === -1) return
      const { Params, Header } = toRefs(chartEditStore.componentList[index].request.requestParams)

      Object.keys(item.interactFn).forEach(key => {
        if (key in Params.value) {
          Params.value[key] = param[item.interactFn[key]]
        }
        if (key in Header.value) {
          Header.value[key] = param[item.interactFn[key]]
        }
      })
    }
  })
}
// Được kích hoạt bởi sự kiện liên kết type Khi thay đổi, hãy xóa nội dung ràng buộc hiện tại
export const clearInteractEvent = (chartConfig: CreateComponentType) => {

}
