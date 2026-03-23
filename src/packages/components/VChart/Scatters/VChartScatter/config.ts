import { PublicConfigClass } from '@/packages/public'
import { VChartScatterConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import axisThemeJson from '@/settings/vchartThemes/axis.theme.json'
import { IAreaOption } from '../../index.d'

export const includes = ['legends', 'tooltip']
export const option: IAreaOption & { dataset?: any } = {
  // Biểu cấu hình đồ thị
  type: 'scatter',
  dataset: data,
  stack: true,
  xField: 'x',
  yField: 'horsepower',
  seriesField: 'cylinders',
  // Cấu hình doanh nghiệp (sẽ được chuyển đổi thànhBiểu đồspec)
  category: VChartScatterConfig.category,
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
  public key = VChartScatterConfig.key
  public chartConfig = cloneDeep(VChartScatterConfig)
  // Biểu đồCác mục cấu hình
  public option = vChartOptionPrefixHandle(option, includes)
}
