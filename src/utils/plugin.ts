import { icon } from '@/plugins'
import { DialogEnum } from '@/enums/pluginEnum'
import { dialogIconSize } from '@/settings/designSetting'
import { maskClosable } from '@/settings/designSetting'
import { DialogReactive } from 'naive-ui'
const { InformationCircleIcon } = icon.ionicons5
import { renderIcon } from '@/utils'

// * Cho phép tải
export const loadingStart = () => {
  window['$loading'].start()
}

// * Đang tải kết thúc
export const loadingFinish = () => {
  setTimeout(() => {
    window['$loading'].finish()
  })
}

// * Lỗi tải
export const loadingError = () => {
  setTimeout(() => {
    window['$loading'].error()
  })
}

/**
 * * render hộp thoại
 * @param { Object} params Thông số cấu hình, Xem chi tiết https://www.naiveui.com/zh-CN/light/components/dialog
 * ```
 * Đơn giản nhất demo
 * goDialog({
 *    onPositiveCallback: () => {}
 * })
 * ```
 */
export const goDialog = (
  params: {
    // nền tảng
    type?: DialogEnum
    // tiêu đề
    title?: string | (() => any)
    // gợi ý
    message?: string
    // Xác nhận lời nhắc
    positiveText?: string
    // hủy lời nhắc
    negativeText?: string
    // Có hiển thị nút hủy hay không
    closeNegativeText?: boolean,
    // Bấm vào xem mặt nạ có bị đóng không
    isMaskClosable?: boolean
    // gọi lại
    onPositiveCallback: Function
    onNegativeCallback?: Function
    // không đồng bộ
    promise?: boolean
    promiseResCallback?: Function
    promiseRejCallback?: Function
    [T:string]: any
  }
) => {
  const {
    type,
    title,
    message,
    positiveText,
    negativeText,
    closeNegativeText,
    isMaskClosable,
    onPositiveCallback,
    onNegativeCallback,
    promise,
    promiseResCallback,
    promiseRejCallback
  } = params

  const typeObj = {
    // Tùy chỉnh
    [DialogEnum.DELETE]: {
      fn: window['$dialog'].warning,
      message: message || window['$t']('global.auto_26')
    },
    // nguyên bản
    [DialogEnum.WARNING]: {
      fn: window['$dialog'].warning,
      message: message || window['$t']('global.auto_25')
    },
    [DialogEnum.ERROR]: {
      fn: window['$dialog'].error,
      message: message || window['$t']('global.auto_25')
    },
    [DialogEnum.SUCCESS]: {
      fn: window['$dialog'].success,
      message: message || window['$t']('global.auto_25')
    }
  }

  const dialogConfig = typeObj[type as DialogEnum] || typeObj[DialogEnum.WARNING]

  const dialog: DialogReactive = dialogConfig['fn']({
    // Nhập phần còn lại NaiveUI Thông số hỗ trợ
    ...params,
    title: title || window['$t']('global.auto_28'),
    icon: renderIcon(InformationCircleIcon, { size: dialogIconSize }),
    content: dialogConfig['message'],
    positiveText: positiveText || window['$t']('global.auto_29'),
    negativeText: closeNegativeText ? undefined : (negativeText || window['$t']('global.auto_27')),
    // Có nên đóng qua mặt nạ không
    maskClosable: isMaskClosable || maskClosable,
    onPositiveClick: async () => {
      // Thực thi không đồng bộ
      if (promise && onPositiveCallback) {
        dialog.loading = true
        try {
          const res = await onPositiveCallback()
          promiseResCallback && promiseResCallback(res)
        } catch (err) {
          promiseRejCallback && promiseRejCallback(err)
        }
        dialog.loading = false
        return
      }
      onPositiveCallback && onPositiveCallback(dialog)
    },
    onNegativeClick: async () => {
      onNegativeCallback && onNegativeCallback(dialog)
    }
  })
}
