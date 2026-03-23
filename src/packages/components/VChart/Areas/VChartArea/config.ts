import { PublicConfigClass } from '@/packages/public'
import { VChartAreaConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import axisThemeJson from '@/settings/vchartThemes/axis.theme.json'
import { IAreaOption } from '../../index.d'

export const includes = ['legends', 'tooltip']
export const option: IAreaOption & { dataset?: any } = {
  // Biểu cấu hình đồ thị
  type: 'area',
  dataset: data,
  xField: 'type',
  yField: 'value',
  seriesField: 'country',
  stack: true,
  // Cấu hình doanh nghiệp (sẽ được chuyển đổi thànhBiểu đồspec)
  category: VChartAreaConfig.category,
  xAxis: {
    name: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_480') : 'trục x'),
    ...axisThemeJson,
    grid: {
      ...axisThemeJson.grid,
      visible: false
    }
  },
  yAxis: {
    name: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_216') : 'trục y'),
    ...axisThemeJson,
    grid: {
      ...axisThemeJson.grid,
      style: {
        ...axisThemeJson.grid.style,
        lineDash: [3, 3]
      }
    }
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartAreaConfig.key
  public chartConfig = cloneDeep(VChartAreaConfig)
  // Biểu đồCác mục cấu hình
  public option = vChartOptionPrefixHandle(option, includes)
}
