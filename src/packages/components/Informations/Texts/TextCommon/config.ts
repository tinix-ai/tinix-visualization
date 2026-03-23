import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { TextCommonConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export enum WritingModeEnum {
  HORIZONTAL = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_57') : 'mức độ'),
  VERTICAL = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_255') : 'hình dạng cây bút')
}

export const WritingModeObject = {
  [WritingModeEnum.HORIZONTAL]: 'horizontal-tb',
  [WritingModeEnum.VERTICAL]: 'vertical-rl'
}

export enum FontWeightEnum {
  NORMAL = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_178') : 'truyền thống'),
  BOLD = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_106') : 'nội bộ'),
}

export const FontWeightObject = {
  [FontWeightEnum.NORMAL]: 'normal',
  [FontWeightEnum.BOLD]: 'bold',
}

export const option = {
  link: '',
  linkHead: 'http://',
  dataset: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_62') : 'tôi đang nhắn tin'),
  fontSize: 20,
  fontColor: '#ffffff',
  paddingX: 10,
  paddingY: 10,
  textAlign: 'center', // mức độDóng hàng Align
  fontWeight: 'normal',

  // khung
  borderWidth: 0,
  borderColor: '#ffffff',
  borderRadius: 5,

  // khoảng cách giữa các từ
  letterSpacing: 5,
  writingMode: 'horizontal-tb',
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = TextCommonConfig.key
  public chartConfig = cloneDeep(TextCommonConfig)
  public option = cloneDeep(option)
}
