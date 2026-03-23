import { ref, toRefs, toRaw, watch } from 'vue'
import type VChart from 'vue-echarts'
import { customizeHttp } from '@/api/http'
import { useChartDataPondFetch } from '@/hooks/'
import { CreateComponentType, ChartFrameEnum } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { isPreview, newFunctionHandle, intervalUnitHandle } from '@/utils'
import { setOption } from '@/packages/public/chart'
import { isNil } from 'lodash'

// Nhận loại
type ChartEditStoreType = typeof useChartEditStore

/**
 * setdata Giám sát và thay đổi dữ liệu
 * @param targetComponent
 * @param useChartEditStore Nếu bạn nhập trực tiếp, lỗi sẽ được báo cáo và lỗi chỉ có thể được chuyển động.
 * @param updateCallback Chức năng cập nhật tùy chỉnh
 */
export const useChartDataFetch = (
  targetComponent: CreateComponentType,
  useChartEditStore: ChartEditStoreType,
  updateCallback?: (...args: any) => any
) => {
  const vChartRef = ref<typeof VChart | null>(null)
  let fetchInterval: any = 0

  // nhóm dữ liệu
  const { addGlobalDataInterface } = useChartDataPondFetch()

  // Loại thành phần
  const { chartFrame } = targetComponent.chartConfig

  // eCharts Giao phối thành phần vChart Phương pháp cập nhật thư viện
  const echartsUpdateHandle = (dataset: any) => {
    if (chartFrame === ChartFrameEnum.ECHARTS) {
      if (vChartRef.value) {
        setOption(vChartRef.value, { dataset: dataset }, false)
      }
    }
  }

  const requestIntervalFn = () => {
    const chartEditStore = useChartEditStore()

    // dữ liệu toàn cầu
    const {
      requestOriginUrl,
      requestIntervalUnit: globalUnit,
      requestInterval: globalRequestInterval
    } = toRefs(chartEditStore.getRequestGlobalConfig)

    // thành phần mục tiêu
    const {
      requestDataType,
      requestUrl,
      requestIntervalUnit: targetUnit,
      requestInterval: targetInterval
    } = toRefs(targetComponent.request)

    // loại không yêu cầu
    if (requestDataType.value !== RequestDataTypeEnum.AJAX) return

    try {
      // địa chỉ xử lý
      // @ts-ignore
      if (requestUrl?.value) {
        // requestOriginUrl được phép để trống
        const completePath = requestOriginUrl && requestOriginUrl.value + requestUrl.value
        if (!completePath) return

        clearInterval(fetchInterval)

        const fetchFn = async () => {
          const res = await customizeHttp(toRaw(targetComponent.request), toRaw(chartEditStore.getRequestGlobalConfig))
          if (res) {
            try {
              const filter = targetComponent.filter
              const { data } = res
              echartsUpdateHandle(newFunctionHandle(data, res, filter))
              // Cập nhật chức năng gọi lại
              if (updateCallback) {
                updateCallback(newFunctionHandle(data, res, filter))
              }
            } catch (error) {
              console.error(error)
            }
          }
        }

        // Giám sát quá trình khởi tạo và tương tác thành phần thông thường
        watch(
          () => targetComponent.request.requestParams,
          () => {
            fetchFn()
          },
          {
            immediate: true,
            deep: true
          }
        )

        // Thời gian
        const time = targetInterval && !isNil(targetInterval.value) ? targetInterval.value : globalRequestInterval.value
        // đơn vị
        const unit = targetInterval && !isNil(targetInterval.value) ? targetUnit.value : globalUnit.value
        // Bật bỏ phiếu
        if (time) {
          fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit))
        }
      }
      // eslint-disable-next-line no-empty
    } catch (error) {
      console.log(error)
    }
  }

  if (isPreview()) {
    targetComponent.request.requestDataType === RequestDataTypeEnum.Pond
      ? addGlobalDataInterface(targetComponent, useChartEditStore, (newData: any) => {
          echartsUpdateHandle(newData)
          if (updateCallback) updateCallback(newData)
        })
      : requestIntervalFn()
  } else {
    requestIntervalFn()
  }
  return { vChartRef }
}
