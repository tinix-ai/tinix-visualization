import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { vChartGlobalThemeJson } from '@/settings/vchartThemes/index'

/**
 * * hợp nhất color VàCấu hình chungmục
 * @param option Cấu hình
 * @param themeSetting cài đặt
 * @param excludes loại trừ các phần tử
 * @returns object
 */
export const mergeTheme = <T, U>(option: T, themeSetting: U, includes: string[]) => {
  return (option = merge({}, pick(themeSetting, includes), option))
}

/**
 * * vCharts option Tiền xử lý thống nhất
 * @param option
 * @return option
 */
export const vChartOptionPrefixHandle = (option: any, includes: string[] = []) => {
  option['background'] = 'rgba(0,0,0,0)'
  return mergeTheme(option, vChartGlobalThemeJson, includes)
}
