import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TimeCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'

export enum FontWeightEnum {
  NORMAL = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_178') : 'truyền thống'),
  BOLD = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_106') : 'nội bộ')
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold'
}

export const option = {
  // Mô tả dữ liệu
  timeSize: 24,
  timeLineHeight: 50,
  timeTextIndent: 2,
  timeColor: '#E6F7FF',
  fontWeight: 'normal',

  //bóng tối
  showShadow:  true,
  hShadow: 0,
  vShadow: 0,
  blurShadow: 8,
  colorShadow: '#0075ff'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TimeCommonConfig.key
  public attr = { ...chartInitConfig, w: 300, h: 50, zIndex: -1 }
  public chartConfig = cloneDeep(TimeCommonConfig)
  public option = cloneDeep(option)
}
