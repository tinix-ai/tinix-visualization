import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { ProcessConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'


export const types = [
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_159') : 'tuyến tính'),
    value: 'line'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_251') : 'hình vuông tròn'),
    value: 'circle'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_272') : 'Trang tổng quan'),
    value: 'dashboard'
  },
]

export const indicatorPlacements = [
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_239') : 'ngoài'),
    value: 'inside'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_330') : 'trong-ngoài'),
    value: 'outside'
  }
]

export const option = {
  dataset: 36,
  // Loại mặc định
  type: types[2].value,
  // hiệu ứng liên tục
  processing: true,
  // màu chủ đạo
  color: '#4992FFFF',
  // theo dõi màu sắc
  railColor: '#3e3e3f', 
  // chỉ mục
  unit: '%',
  // Kích thước chỉ báo
  indicatorTextSize: 34,
  // Vị trí con trỏ (có sẵn cho dòng)
  indicatorPlacement: 'outside',
  // Màu chỉ thị
  indicatorTextColor: '#FFFFFFFF',
  // góc bù đắp
  offsetDegree: 0
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = ProcessConfig.key
  public attr = { ...chartInitConfig, h: 500, zIndex: -1 }
  public chartConfig = cloneDeep(ProcessConfig)
  public option = cloneDeep(option)
}