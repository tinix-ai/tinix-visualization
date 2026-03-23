import merge from 'lodash/merge'
import pick from 'lodash/pick'
import { EchartsDataType } from '../index.d'
import { globalThemeJson } from '@/settings/chartThemes/index'
import type VChart from 'vue-echarts'

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
 * * ECharts option Tiền xử lý thống nhất
 * @param option
 * @return option
 */
export const echartOptionProfixHandle = (option: any, includes: string[] = []) => {
  option['backgroundColor'] = 'rgba(0,0,0,0)'
  return mergeTheme(option, globalThemeJson, includes)
}

/**
 * * Đặt dữ liệu
 * @param option
 * @return option
 */
export const setData = (option: any, data: EchartsDataType) => {
  option.dataset = data
  return option
}

/**
 * * Định cấu hình công khai setOption phương pháp
 * @param instance
 * @param data
 */
export const setOption = <T extends typeof VChart | undefined, D>(instance: T, data: D, notMerge = true) => {
  if (!instance) return
  const option = instance.getOption()
  option.dataset = null
  instance.setOption(data, {
    notMerge: notMerge
  })
}
