import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TextBarrageConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

export enum FontWeightEnum {
  NORMAL = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_178') : 'truyền thống'),
  BOLD = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_106') : 'nội bộ'),
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export const option = {
  dataset: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_230') : 'Hiển thị kỹ thuật số'),
  fontSize: 32,
  fontColor: '#ffffff',
  fontWeight: 'normal',
  // khoảng cách giữa các từ
  letterSpacing: 5,
  //bóng tối
  showShadow:  true,
  boxShadow: 'none',
  hShadow: 0,
  vShadow: 0,
  blurShadow: 8,
  colorShadow: '#0075ff',
  //hoạt hình
  animationTime: 0,
  animationSpeed: 50,
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TextBarrageConfig.key
  public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: -1 }
  public chartConfig = cloneDeep(TextBarrageConfig)
  public option = cloneDeep(option)
  public preview = { overFlowHidden: true } 
}
