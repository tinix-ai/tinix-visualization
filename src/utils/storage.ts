import { JSONStringify, JSONParse } from './utils'

/**
 * * Lưu trữ dữ liệu phiên cục bộ
 * @param k Tên khóa
 * @param v Giá trị khóa (không cầnstringiiy）
 * @returns RemovableRef
 */
export const setLocalStorage = <T>(k: string, v: T) => {
  try {
    window.localStorage.setItem(k, JSONStringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * Nhận dữ liệu phiên cục bộ
 * @param k Tên khóa
 * @returns any
 */
export const getLocalStorage = (k: string) => {
  const item = window.localStorage.getItem(k)
  try {
    return item ? JSONParse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * * Xóa dữ liệu phiên cục bộ
 * @param name
 */
export const clearLocalStorage = (name: string) => {
  window.localStorage.removeItem(name)
}

/**
 * * Lưu trữ dữ liệu phiên tạm thời
 * @param k Tên khóa
 * @param v giá trị khóa
 * @returns RemovableRef
 */
export const setSessionStorage = <T>(k: string, v: T) => {
  try {
    window.sessionStorage.setItem(k, JSONStringify(v))
  } catch (error) {
    return false
  }
}

/**
 * * Nhận dữ liệu phiên tạm thời
 * @returns any
 */
export const getSessionStorage: (k: string) => any = (k: string) => {
  const item = window.sessionStorage.getItem(k)
  try {
    return item ? JSONParse(item) : item
  } catch (err) {
    return item
  }
}

/**
 * * Xóa dữ liệu phiên cục bộ
 * @param name
 */
export const clearSessioStorage = (name: string) => {
  window.sessionStorage.removeItem(name)
}
