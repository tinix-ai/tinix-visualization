import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { NumberConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  // Mô tả dữ liệu
  dataset: 100000,
  from: 0,
  dur: 3,
  precision: 0,
  showSeparator: true,
  numberSize: 34,
  numberColor: '#4a9ef8',
  prefixText: '￥',
  prefixColor: '#4a9ef8',
  suffixText: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_435') : 'Nhân dân tệ'),
  suffixColor: '#4a9ef8',
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = NumberConfig.key
  public chartConfig = cloneDeep(NumberConfig)
  public option = cloneDeep(option)
}
