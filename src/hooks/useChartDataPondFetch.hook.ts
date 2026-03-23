import { toRaw, watch, computed, ComputedRef } from 'vue'
import { customizeHttp } from '@/api/http'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { RequestGlobalConfigType, RequestDataPondItemType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { newFunctionHandle, intervalUnitHandle } from '@/utils'

// Nhận loại
type ChartEditStoreType = typeof useChartEditStore

// Các kiểu dữ liệu được lưu trữ trong data pool
type DataPondMapType = {
  updateCallback: (...args: any) => any
  filter?: string | undefined
}

// nhóm dữ liệu Map Thư từ yêu cầu trung bình callback
const mittDataPondMap = new Map<string, DataPondMapType[]>()

// Tạo một giao diện thăm dò mục dữ liệu duy nhất
const newPondItemInterval = (
  requestGlobalConfig: RequestGlobalConfigType,
  requestDataPondItem: ComputedRef<RequestDataPondItemType>,
  dataPondMapItem?: DataPondMapType[]
) => {
  if (!dataPondMapItem) return
  let fetchInterval: any = 0

  clearInterval(fetchInterval)

  // hỏi
  const fetchFn = async () => {
    try {
      const res = await customizeHttp(toRaw(requestDataPondItem.value.dataPondRequestConfig), toRaw(requestGlobalConfig))
      if (res) {
        try {
          // Chức năng gọi lại cập nhật truyền tải
          dataPondMapItem.forEach(item => {
            item.updateCallback(newFunctionHandle(res?.data, res, item.filter))
          })
        } catch (error) {
          console.error(error)
          return error
        }
      }
    } catch (error) {
      return error
    }
  }

  watch(
    () => requestDataPondItem.value.dataPondRequestConfig.requestParams.Params,
    () => {
      fetchFn()
    },
    {
      immediate: false,
      deep: true
    }
  )


  // Gọi ngay
  fetchFn()


  const targetInterval = requestDataPondItem.value.dataPondRequestConfig.requestInterval
  const targetUnit = requestDataPondItem.value.dataPondRequestConfig.requestIntervalUnit

  const globalRequestInterval = requestGlobalConfig.requestInterval
  const globalUnit = requestGlobalConfig.requestIntervalUnit

  // Thời gian
  const time = targetInterval ? targetInterval : globalRequestInterval
  // đơn vị
  const unit = targetInterval ? targetUnit : globalUnit
  // Bật bỏ phiếu
  if (time) fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit))
}

/**
 * Xử lý giao diện nhóm dữ liệu
 */
export const useChartDataPondFetch = () => {
  // Thêm giao diện toàn cầu
  const addGlobalDataInterface = (
    targetComponent: CreateComponentType,
    useChartEditStore: ChartEditStoreType,
    updateCallback: (...args: any) => any
  ) => {
    const chartEditStore = useChartEditStore()
    const { requestDataPond } = chartEditStore.getRequestGlobalConfig

    // Nhóm dữ liệu tương ứng với thành phần Id
    const requestDataPondId = targetComponent.request.requestDataPondId as string
    // Thêm mục dữ liệu mới
    const mittPondIdArr = mittDataPondMap.get(requestDataPondId) || []
    mittPondIdArr.push({
      updateCallback: updateCallback,
      filter: targetComponent.filter
    })
    mittDataPondMap.set(requestDataPondId, mittPondIdArr)
  }

  // Xóa dữ liệu cũ
  const clearMittDataPondMap = () => {
    mittDataPondMap.clear()
  }

  // Khởi tạo nhóm dữ liệu
  const initDataPond = (useChartEditStore: ChartEditStoreType) => {
    const { requestGlobalConfig } = useChartEditStore()
    const chartEditStore = useChartEditStore()
    // theo mapId Tìm cấu hình nhóm dữ liệu tương ứng
    for (let pondKey of mittDataPondMap.keys()) {
      const requestDataPondItem = computed(() => {
        return requestGlobalConfig.requestDataPond.find(item => item.dataPondId === pondKey)
      }) as ComputedRef<RequestDataPondItemType>
      if (requestDataPondItem) {
        newPondItemInterval(chartEditStore.requestGlobalConfig, requestDataPondItem, mittDataPondMap.get(pondKey))
      }
    }
  }

  return {
    addGlobalDataInterface,
    clearMittDataPondMap,
    initDataPond
  }
}
