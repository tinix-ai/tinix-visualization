import { defineStore } from 'pinia'
import { ChartLayoutType, LayerModeEnum, ChartModeEnum } from './chartLayoutStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

const { GO_CHART_LAYOUT_STORE } = StorageEnum

const storageChartLayout: Partial<ChartLayoutType> = getLocalStorage(GO_CHART_LAYOUT_STORE)

// Chỉnh sửa bố cục vùng và cài đặt tĩnh
export const useChartLayoutStore = defineStore({
  id: 'useChartLayoutStore',
  state: (): ChartLayoutType => ({
    // Điều khiển lớp
    layers: true,
    // thành phần biểu đồ
    charts: true,
    // Cài đặt chi tiết (thu gọn thànhtrue）
    details: false,
    // Kiểu hiển thị danh sách thành phần (cột đơn mặc định)
    chartType: ChartModeEnum.SINGLE,
    // Loại lớp (ảnh mặc định)
    layerType: LayerModeEnum.THUMBNAIL,
    // Số lượng tải hiện tại
    percentage: 0,
    // Có đặt lại vị trí canvas hiện tại hay không
    rePositionCanvas: false,
    // Ngăn chặn giá trị không tồn tại
    ...storageChartLayout
  }),
  getters: {
    getLayers(): boolean {
      return this.layers
    },
    getCharts(): boolean {
      return this.charts
    },
    getDetails(): boolean {
      return this.details
    },
    getChartType(): ChartModeEnum {
      return this.chartType
    },
    getLayerType(): LayerModeEnum {
      return this.layerType
    },
    getPercentage(): number {
      return this.percentage
    },
    getRePositionCanvas(): boolean {
      return this.rePositionCanvas
    }
  },
  actions: {
    setItem<T extends keyof ChartLayoutType, K extends ChartLayoutType[T]>(
      key: T,
      value: K,
      computedScale = true
    ): void {
      this.$patch(state => {
        state[key] = value
      })
      // Cửa hàng địa phương
      setLocalStorage(GO_CHART_LAYOUT_STORE, this.$state)
      // Tại đây bạn cần đánh dấu vị trí đặt lại canvas
      this.rePositionCanvas = true;
      // Tính toán lại tỷ lệ vùng kéo
      if (computedScale) {
        setTimeout(() => {
          const chartEditStore = useChartEditStore()
          chartEditStore.computedScale()
        }, 500)
      }
    },
    setItemUnHandle<T extends keyof ChartLayoutType, K extends ChartLayoutType[T]>(key: T, value: K): void {
      this.$patch(state => {
        state[key] = value
      })
    }
  }
})
