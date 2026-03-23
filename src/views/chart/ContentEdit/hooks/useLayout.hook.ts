import { onUnmounted, onMounted } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

const chartEditStore = useChartEditStore()

// Xử lý bố cục
export const useLayout = (fn: () => Promise<void>) => {
  let removeScale: Function = () => { }
  onMounted(async () => {
    // cài đặt Dom giá trị(ref Nếu nó không có hiệu lực, hãy sử dụng nó trước document)
    chartEditStore.setEditCanvas(
      EditCanvasTypeEnum.EDIT_LAYOUT_DOM,
      document.getElementById('go-chart-edit-layout')
    )
    chartEditStore.setEditCanvas(
      EditCanvasTypeEnum.EDIT_CONTENT_DOM,
      document.getElementById('go-chart-edit-content')
    )

    // Nhận dữ liệu
    await fn()
    // Giám sát khởi tạo
    removeScale = chartEditStore.listenerScale()

  })

  onUnmounted(() => {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.EDIT_LAYOUT_DOM, null)
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.EDIT_CONTENT_DOM, null)
    removeScale()
  })
}