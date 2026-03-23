import { PublicConfigClass } from '@/packages/public'
import { VChartLineConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import axisThemeJson from '@/settings/vchartThemes/axis.theme.json'
import { ChatCategoryEnum, ILineOption } from '../../index.d'

export const includes = ['legends', 'tooltip', 'label', 'line', 'point']
export const option: ILineOption & { dataset?: any } = {
  // Biểu cấu hình đồ thị
  type: 'line',
  dataset: data,
  xField: 'type',
  yField: 'value',
  seriesField: 'country',
  stack: true,
  // Tỷ lệ phần trăm mở
  percent: false,
  // Cấu hình doanh nghiệp (sẽ được chuyển đổi thànhBiểu đồspec)
  category: VChartLineConfig.category as ChatCategoryEnum.LINE,
  xAxis: {
    name: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_480') : 'trục x'),
    ...axisThemeJson,
    grid: {
      ...axisThemeJson.grid,
      visible: false
    }
  } as any,
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
  } as any
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartLineConfig.key
  public chartConfig = cloneDeep(VChartLineConfig)
  // Biểu đồCác mục cấu hình
  public option = vChartOptionPrefixHandle(option, includes)
}
