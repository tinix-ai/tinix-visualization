import { useRoute } from 'vue-router'
import { ResultEnum } from '@/enums/httpEnum'
import { ErrorPageNameMap, PageEnum } from '@/enums/pageEnum'
import { docPath, giteeSourceCodePath } from '@/settings/pathConst'
import { cryptoDecode } from './crypto'
import { StorageEnum } from '@/enums/storageEnum'
import { clearLocalStorage, getLocalStorage } from './storage'
import router from '@/router'

/**
 * * Nhảy tuyến đường dựa trên tên
 * @param pageName
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByName = (
  pageName: string,
  isReplace?: boolean,
  windowOpen?: boolean
) => {
  if (windowOpen) {
    const path = fetchPathByName(pageName, 'href')
    openNewWindow(path)
    return
  }
  if (isReplace) {
    router.replace({
      name: pageName,
    })
    return
  }
  router.push({
    name: pageName,
  })
}

/**
 * * Nhận thông tin định tuyến dựa trên tên
 * @param pageName
 * @param pageName
 */
export const fetchPathByName = (pageName: string, p?: string) => {
  try {
    const pathData = router.resolve({
      name: pageName,
    })
    return p ? (pathData as any)[p] : pathData
  } catch (error) {
    window['$message'].warning(window['$t']('global.auto_30'))
  }
}

/**
 * * Chuyển định tuyến dựa trên đường dẫn
 * @param path
 * @param query
 * @param isReplace
 * @param windowOpen
 */
export const routerTurnByPath = (
  path: string,
  query?: Array<string | number>,
  isReplace?: boolean,
  windowOpen?: boolean
) => {
  let fullPath = ''
  if (query?.length) {
    fullPath = `${path}/${query.join('/')}`
  }
  if (windowOpen) {
    return openNewWindow(fullPath)
  }
  if (isReplace) {
    router.replace({
      path: fullPath,
    })
    return
  }
  router.push({
    path: fullPath,
  })
}

/**
 * * chuyển hướng trang lỗi
 * @param icon
 * @returns
 */
export const redirectErrorPage = (code: ResultEnum) => {
  if (!code) return false
  const pageName = ErrorPageNameMap.get(code)
  if (!pageName) return false
  routerTurnByName(pageName)
}

/**
 * * Tải lại trang định tuyến hiện tại
 */
export const reloadRoutePage = () => {
  routerTurnByName(PageEnum.RELOAD_NAME)
}

/**
 * * từ bỏ
 */
export const logout = () => {
  clearLocalStorage(StorageEnum.GO_LOGIN_INFO_STORE)
  routerTurnByName(PageEnum.BASE_LOGIN_NAME)
}

/**
 * * Trang mới
 * @param url
 */
export const openNewWindow = (url: string) => {
  return window.open(url, '_blank')
}

/**
 * * Mở tài liệu dự án
 * @param url
 */
export const openDoc = () => {
  openNewWindow(docPath)
}

/**
 * * Mở mã địa chỉ kho đám mây
 * @param url
 */
export const openGiteeSourceCode = () => {
  openNewWindow(giteeSourceCodePath)
}

/**
 * * Xác định xem đó có phải là trang xem trước hay không
 * @returns boolean
 */
export const isPreview = () => {
  return document.location.hash.includes('preview')
}

/**
 * * Lấy các thông số theo lộ trình hiện tại
 * @returns object
 */
export const fetchRouteParams = () => {
  try {
    const route = useRoute()
    return route.params
  } catch (error) {
    window['$message'].warning(window['$t']('global.auto_30'))
  }
}

/**
 * * Lấy tham số theo lộ trình hiện tại thông qua phân tích cú pháp cứng
 * @returns object
 */
 export const fetchRouteParamsLocation = () => {
  try {
    // Ngăn chặn việc thêmqueryKhi phân tích các tham số, phân tíchIDbất thường
    return document.location.hash.split('?')[0].split('/').pop() || ''
  } catch (error) {
    window['$message'].warning(window['$t']('global.auto_30'))
    return ''
  }
}

/**
 * * Quay lại trang chính
 * @param confirm
 */
export const goHome = () => {
  routerTurnByName(PageEnum.BASE_HOME_NAME)
}

/**
 * * Xác định có nên đăng nhập hay không (hiện tại có login chỉ dữ liệu)
 * @return boolean
 */
export const loginCheck = () => {
  try {
    const info = getLocalStorage(StorageEnum.GO_LOGIN_INFO_STORE)
    if (!info) return false
    const decodeInfo = cryptoDecode(info)
    if (decodeInfo) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}