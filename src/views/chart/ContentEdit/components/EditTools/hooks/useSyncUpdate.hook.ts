import { watch } from 'vue'
import { useRoute } from 'vue-router'
import throttle from 'lodash/throttle'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useSync } from '@/views/chart/hooks/useSync.hook'
import { ChartEnum } from '@/enums/pageEnum'
import { SavePageEnum } from '@/enums/editPageEnum'
import { editToJsonInterval } from '@/settings/designSetting'
import { goDialog } from '@/utils'

const { updateComponent } = useSync()
const chartEditStore = useChartEditStore()

export const syncData = (id?: string) => {
  goDialog({
    message: window['$t']('views_components.auto_290'),
    isMaskClosable: true,
    transformOrigin: 'center',
    onPositiveCallback: () => {
      window['$message'].success("chartAnimation")
      dispatchEvent(new CustomEvent(SavePageEnum.CHART, { 
        detail: {
          ...chartEditStore.getStorageInfo(),
          id: id
        } 
      }))
    }
  })
}

// Đồng bộ hóa dữ liệu vào trang xem trước
export const syncDataToPreview = () => {
  dispatchEvent(new CustomEvent(SavePageEnum.CHART_TO_PREVIEW, { detail: chartEditStore.getStorageInfo() }))
}

// Cập nhật người nghe
const useSyncUpdateHandle = () => {
  // Xác định các biến người nghe
  let timer: any

  // Xử lý cập nhật
  const updateFn = (e: any) => {
    window['$message'].success(window['$t']('views_components.auto_292'))
    updateComponent(e!.detail, true)
  }

  // Xử lý đóng trang
  const closeFn = () => {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_CODE_EDIT, false)
  }

  // Bật nghe
  const use = () => {
    // Đồng bộ dữ liệu thường xuyên (chưa kích hoạt)
    // timer = setInterval(() => {
    //   // Cửa sổ đang hoạt động và trên bàn làm việc
    //   document.hasFocus() && syncData()
    // }, editToJsonInterval)

    // Làm mờ dữ liệu đồng bộ hóa
    addEventListener('blur', syncDataToPreview)

    // Nghe sự kiện lưu trình chỉnh sửa Làm mới biểu đồ bàn làm việc
    addEventListener(SavePageEnum.JSON, updateFn)

    // Theo dõi việc đóng trang chỉnh sửa
    addEventListener(SavePageEnum.CLOSE, throttle(closeFn, 1000))
  }

  // Tắt nghe
  const unUse = () => {
    // clearInterval(timer)
    removeEventListener('blur', syncDataToPreview)
    removeEventListener(SavePageEnum.JSON, updateFn)
  }

  // Xử lý khi định tuyến thay đổi
  const watchHandler = (toName: any, fromName: any) => {
    if (fromName == ChartEnum.CHART_HOME_NAME) {
      unUse()
    }
    if (toName == ChartEnum.CHART_HOME_NAME) {
      use()
    }
  }

  return watchHandler
}

export const useSyncUpdate = () => {
  const routerParamsInfo = useRoute()
  watch(() => routerParamsInfo.name, useSyncUpdateHandle(), { immediate: true })
}
