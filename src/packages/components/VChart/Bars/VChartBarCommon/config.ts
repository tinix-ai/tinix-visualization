import { PublicConfigClass } from '@/packages/public'
import { VChartBarCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import axisThemeJson from '@/settings/vchartThemes/axis.theme.json'
import { ChatCategoryEnum, IBarOption } from '../../index.d'
import { merge, cloneDeep } from 'lodash'

export const includes = ['legends', 'tooltip', 'label', 'bar']
export const option: IBarOption & { dataset?: any } = {
  // Biểu cấu hình đồ thị
  type: 'bar',
  dataset: data,
  stack: true,
  xField: ['year', 'type'],
  yField: ['value'],
  seriesField: 'type',
  // Cấu hình doanh nghiệp (sẽ được chuyển đổi thànhBiểu đồspec)
  category: VChartBarCommonConfig.category as ChatCategoryEnum.BAR,
  xAxis: {
    name: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_480') : 'trục x'),
    ...(merge(cloneDeep(axisThemeJson), {
      unit: {
        style: {
          dx: 10,
          dy: 0
        }
      }
    }) as any),
    grid: {
      ...axisThemeJson.grid,
      visible: false
    }
  },
  yAxis: {
    name: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_216') : 'trục y'),
    ...(merge(cloneDeep(axisThemeJson), {
      unit: {
        style: {
          dx: 0,
          dy: -10
        }
      }
    }) as any),
    grid: {
      ...axisThemeJson.grid,
      style: {
        ...axisThemeJson.grid.style
      }
    }
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartBarCommonConfig.key
  public chartConfig = cloneDeep(VChartBarCommonConfig)
  // Biểu đồCác mục cấu hình
  public option = vChartOptionPrefixHandle(option, includes)
}
