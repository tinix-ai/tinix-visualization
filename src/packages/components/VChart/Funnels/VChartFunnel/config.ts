import { PublicConfigClass } from '@/packages/public'
import { VChartFunnelConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import { IFunnelOption } from '../../index.d'

export const includes = ['legends', 'tooltip']
export const option: IFunnelOption & { dataset?: any } = {
  // Biểu cấu hình đồ thị
  type: 'funnel',
  dataset: data,
  categoryField: 'name',
  valueField: 'value',
  // Cấu hình doanh nghiệp (sẽ được chuyển đổi thànhBiểu đồspec)
  category: VChartFunnelConfig.category,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartFunnelConfig.key
  public chartConfig = cloneDeep(VChartFunnelConfig)
  // Biểu đồCác mục cấu hình
  public option = vChartOptionPrefixHandle(option, includes)
}
