import { PublicConfigClass } from '@/packages/public'
import { VChartWordCloudConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import { IWordCloudOption } from '../../index.d'

export const includes = ['legends', 'tooltip']
export const option: IWordCloudOption & { dataset?: any } = {
  // Biểu cấu hình đồ thị
  type: 'wordCloud',
  dataset: data,
  nameField: 'name',
  valueField: 'value',
  seriesField: 'name',
  // Cấu hình doanh nghiệp (sẽ được chuyển đổi thànhBiểu đồspec)
  category: VChartWordCloudConfig.category,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartWordCloudConfig.key
  public chartConfig = cloneDeep(VChartWordCloudConfig)
  // Biểu đồCác mục cấu hình
  public option = vChartOptionPrefixHandle(option, includes)
}
