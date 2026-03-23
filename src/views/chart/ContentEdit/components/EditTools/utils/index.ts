import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { canvasCut, downloadTextFile, JSONStringify } from '@/utils'
const chartEditStore = useChartEditStore()

// Xuất khẩu
export const exportHandle = () => {
  // Bỏ chọn
  chartEditStore.setTargetSelectChart(undefined)

  // Xuất dữ liệu
  downloadTextFile(
    JSONStringify(chartEditStore.getStorageInfo() || []),
    undefined,
    'json'
  )

  // Xuất hình ảnh
  const range = document.querySelector('.go-edit-range') as HTMLElement
  const watermark = document.getElementById('go-edit-watermark')
  // Ẩn dòng lề
  if (!range || !watermark) {
    window['$message'].error(window['$t']('views_components.auto_293'))
    return
  }

  // Ghi lại tỷ lệ thu phóng
  const scaleTemp = chartEditStore.getEditCanvas.scale
  // Trang hiển thị 100%
  chartEditStore.setScale(1, true)
  // Hiển thị hình mờ
  watermark.style.display = 'block'

  setTimeout(() => {
    canvasCut(range, () => {
      // Ẩn hình mờ
      if (watermark) watermark.style.display = 'none'
      // Khôi phục kích thước trang
      chartEditStore.setScale(scaleTemp, true)
    })
  }, 600)
}
