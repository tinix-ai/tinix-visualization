import { h } from 'vue'
import { NIcon } from 'naive-ui'
import screenfull from 'screenfull'
import throttle from 'lodash/throttle'
import Image_404 from '../assets/images/exception/image-404.png'
import html2canvas from 'html2canvas'
import { downloadByA } from './file'
import { toString } from './type'
import cloneDeep from 'lodash/cloneDeep'
import { WinKeyboard } from '@/enums/editPageEnum'
import { RequestHttpIntervalEnum, RequestParamsObjType } from '@/enums/httpEnum'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { excludeParseEventKeyList, excludeParseEventValueList } from '@/enums/eventEnum'

/**
 * * Xác định xem đó có phải là môi trường phát triển không
 * @return { Boolean }
 */
export const isDev = () => {
  return import.meta.env.DEV
}

/**
 * * Tạo sự độc đáoID
 * @param { Number } randomLength
 */
export const getUUID = (randomLength = 10) => {
  return 'id_' + Number(Math.random().toString().substring(2, randomLength) + Date.now()).toString(36)
}

/**
 * * render biểu tượng
 *  @param icon biểu tượng
 *  @param set Cài Đặt Chỉnhmục
 */
export const renderIcon = (icon: any, set = {}) => {
  return () => h(NIcon, set, { default: () => h(icon) })
}
/**
 * * render ngôn ngữ
 *  @param lang định danh ngôn ngữ
 *  @param set Cài Đặt Chỉnhmục
 *  @param tag nhãn để hiển thị thành
 */
export const renderLang = (lang: string, set = {}, tag = 'span') => {
  return () => h(tag, set, { default: () => window['$t'](lang) })
}

/**
 * * Lấy hình ảnh xử lý lỗi, mặc định 404 hình ảnh
 * @returns url
 */
export const requireErrorImg = () => {
  return Image_404
}

/**
 * * Chức năng hoạt động toàn màn hình
 * @param isFullscreen
 * @param isEnabled
 * @returns
 */
export const screenfullFn = (isFullscreen?: boolean, isEnabled?: boolean) => {
  // Cho dù đó là toàn màn hình
  if (isFullscreen) return screenfull.isFullscreen

  // Có hỗ trợ toàn màn hình không
  if (isEnabled) return screenfull.isEnabled

  if (screenfull.isEnabled) {
    screenfull.toggle()
    return
  }
  // TODO lang
  window['$message'].warning(window['$t']('global.auto_31'))
}

/**
 * Sửa đổi phần tửVị trí
 * @param target sự vật
 * @param x Xtrục
 * @param y Ytrục
 */
export const setComponentPosition = (
  target: CreateComponentType | CreateComponentGroupType,
  x?: number,
  y?: number
) => {
  x && (target.attr.x = x)
  y && (target.attr.y = y)
}

/**
 * * Cài Đặt Chỉnhthuộc tính phần tử
 * @param HTMLElement yếu tố
 * @param key Tên khóa
 * @param value giá trị khóa
 */
export const setDomAttribute = <K extends keyof CSSStyleDeclaration, V extends CSSStyleDeclaration[K]>(
  HTMLElement: HTMLElement,
  key: K,
  value: V
) => {
  if (HTMLElement) {
    HTMLElement.style[key] = value
  }
}

/**
 * * Xác định xem đó có phải là mac
 * @returns boolean
 */
export const isMac = () => {
  return /macintosh|mac os x/i.test(navigator.userAgent)
}

/**
 * * filethay đổiurl
 */
export const fileToUrl = (file: File): string => {
  const Url = URL || window.URL || window.webkitURL
  const ImageUrl = Url.createObjectURL(file)
  return ImageUrl
}

/**
 * * filethay đổibase64
 */
export const fileTobase64 = (file: File, callback: Function) => {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e: ProgressEvent<FileReader>) {
    if (e.target) {
      let base64 = e.target.result
      callback(base64)
    }
  }
}

/**
 * * Giám sát gắn kết
 */
// eslint-disable-next-line no-undef
export const addEventListener = <K extends keyof WindowEventMap>(
  target: HTMLElement | Document,
  type: K,
  listener: any,
  delay?: number,
  // eslint-disable-next-line no-undef
  options?: boolean | AddEventListenerOptions | undefined
) => {
  if (!target) return
  target.addEventListener(
    type,
    throttle(listener, delay || 300, {
      leading: true,
      trailing: false
    }),
    options
  )
}

/**
 * * Giám sát gỡ cài đặt
 */
// eslint-disable-next-line no-undef
export const removeEventListener = <K extends keyof WindowEventMap>(
  target: HTMLElement | Document,
  type: K,
  listener: any
) => {
  if (!target) return
  target.removeEventListener(type, listener)
}

/**
 * * Chụp màn hình dưới dạng ảnh vàTải xuống
 * @param html Cần ngăn chặn DOM
 */
export const canvasCut = (html: HTMLElement | null, callback?: Function) => {
  if (!html) {
    window['$message'].error(window['$t']('global.auto_34'))
    if (callback) callback()
    return
  }

  html2canvas(html, {
    backgroundColor: null,
    allowTaint: true,
    useCORS: true
  }).then((canvas: HTMLCanvasElement) => {
    window['$message'].success(window['$t']('global.auto_33'))
    downloadByA(canvas.toDataURL(), undefined, 'png')
    if (callback) callback()
  })
}

/**
 * * Chụp ảnh màn hình Canvas và trả về Data URL (Captures Canvas and returns Data URL)
 * @returns Promise<string | null>
 */
export const getCanvasThumbnail = async () => {
  const range = document.querySelector('.go-edit-range') as HTMLElement
  if (!range) return null

  try {
    const canvas = await html2canvas(range, {
      backgroundColor: null,
      allowTaint: true,
      useCORS: true,
      logging: false,
      scale: 0.5 // Thumbnail scale
    })
    return canvas.toDataURL('image/jpeg', 0.7) // Use JPEG 0.7 for smaller size
  } catch (error) {
    console.error('Snapshot failed:', error)
    return null
  }
}

/**
 * * bộ lọc chức năng
 * @param data Dữ liệugiá trị
 * @param res Trả về đối tượng cấp cao nhất
 * @param funcStr chuỗi chức năng
 * @param isToString Có nên chuyển đổi thành chuỗi không
 * @param errorCallBack chức năng gọi lại lỗi
 * @param successCallBack chức năng gọi lại thành công
 * @returns
 */
export const newFunctionHandle = (
  data: any,
  res: any,
  funcStr?: string,
  isToString?: boolean,
  errorCallBack?: Function,
  successCallBack?: Function
) => {
  try {
    if (!funcStr) return data
    const fn = new Function('data', 'res', funcStr)
    const fnRes = fn(cloneDeep(data), cloneDeep(res))
    const resHandle = isToString ? toString(fnRes) : fnRes
    // gọi lại thành công
    successCallBack && successCallBack(resHandle)
    return resHandle
  } catch (error) {
    // Gọi lại thất bại
    errorCallBack && errorCallBack(error)
    return window['$t']('global.auto_32')
  }
}

/**
 * * đối phó vớiReuqest DataSự kiệnĐơn vị
 * @param num Giờkhoảng thời gian
 * @param unit RequestHttpIntervalEnum
 * @return number giây
 */
export const intervalUnitHandle = (num: number, unit: RequestHttpIntervalEnum) => {
  switch (unit) {
    // Thứ hai
    case RequestHttpIntervalEnum.SECOND:
      return num * 1000
    // Phút
    case RequestHttpIntervalEnum.MINUTE:
      return num * 1000 * 60
    // Giờ
    case RequestHttpIntervalEnum.HOUR:
      return num * 1000 * 60 * 60
    // bầu trời
    case RequestHttpIntervalEnum.DAY:
      return num * 1000 * 60 * 60 * 24
    default:
      return num * 1000
  }
}

/**
 * * chuyển đổi đối tượng cookie Định dạng
 * @param obj
 * @returns string
 */
export const objToCookie = (obj: RequestParamsObjType) => {
  if (!obj) return ''

  let str = ''
  for (const key in obj) {
    str += key + '=' + obj[key] + ';'
  }
  return str.substring(0, str.length - 1)
}

/**
 * * Cài Đặt Chỉnhnhấn phím bàn phímDưới cùngXem / Hát
 * @param keyCode
 * @returns
 */
export const setKeyboardDressShow = (keyCode?: number) => {
  const code = new Map([
    [17, WinKeyboard.CTRL],
    [32, WinKeyboard.SPACE]
  ])

  const dom = document.getElementById('keyboard-dress-show')
  if (!dom) return
  if (!keyCode) {
    window.onKeySpacePressHold?.(false)
    dom.innerText = ''
    return
  }
  if (keyCode && code.has(keyCode)) {
    if (keyCode == 32) window.onKeySpacePressHold?.(true)
    dom.innerText = `Đã nhấn "${code.get(keyCode)}"chìa khóa`
  }
}

/**
 * * JSONTuần tự hóa, hỗ trợ các chức năng và undefined
 * @param data
 */
export const JSONStringify = <T>(data: T) => {
  return JSON.stringify(
    data,
    (key, val) => {
      // Xử lý vấn đề mất chức năng
      if (typeof val === 'function') {
        return `${val}`
      }
      // đối phó với undefined Vấn đề bị mất
      if (typeof val === 'undefined') {
        return null
      }
      return val
    }
  )
}

export const evalFn = (fn: string) => {
  var Fun = Function // một biến trỏ đếnFunction, để ngăn công cụ biên dịch giao diện người dùng báo cáo lỗi
  return new Fun('return ' + fn)()
}

/**
 * * JSONKhử tuần tự hóa, hỗ trợ các chức năng và undefined
 * @param data
 */
export const JSONParse = (data: string) => {
  if (data.trim() === '') return
  return JSON.parse(data, (k, v) => {
    // // Chuỗi hàm lọc
    // if (excludeParseEventKeyList.includes(k)) return v
    // // biểu thức giá trị hàm lọc
    // if (typeof v === 'string') {
    //   const someValue = excludeParseEventValueList.some(excludeValue => v.indexOf(excludeValue) > -1)
    //   if (someValue) return v
    // }
    if (k !== 'formatter') {
      return v
    }
    // khôi phục giá trị chức năng
    if (typeof v === 'string' && v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
      return evalFn(`(function(){return ${v}})()`)
    } else if (typeof v === 'string' && v.indexOf && v.indexOf('return ') > -1) {
      const baseLeftIndex = v.indexOf('(')
      if (baseLeftIndex > -1) {
        const newFn = `function ${v.substring(baseLeftIndex)}`
        return evalFn(`(function(){return ${newFn}})()`)
      }
    }
    return v
  })
}

/**
 * * Ôn lạiTrên cùngtiêu đề
 * @param title
 */
export const setTitle = (title?: string) => {
  title && (document.title = title)
}
