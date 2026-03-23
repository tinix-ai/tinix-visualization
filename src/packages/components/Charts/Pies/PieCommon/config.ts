import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { PieCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

export enum PieTypeEnum {
  NORMAL = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_382') : 'sơ đồ hoa hồng'),
  RING = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_27') : 'biểu đồ bánh rán'),
  ROSE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_417') : 'Đồ thị thông thường')
}

export const PieTypeObject = {
  [PieTypeEnum.NORMAL]: 'nomal',
  [PieTypeEnum.RING]: 'ring',
  [PieTypeEnum.ROSE]: 'rose'
}

// Các cấu hình khác
const otherConfig = {
  // hoạt hình băng chuyền
  isCarousel: false,
}

const option = {
  ...otherConfig,
  type: 'ring',
  tooltip: {
    show: true,
    trigger: 'item'
  },
  legend: {
    show: true
  },
  dataset: { ...dataJson },
  series: [
    {
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['50%', '60%'],
      roseType: false,
      avoidLabelOverlap: false,
      itemStyle: {
        show: true,
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center',
        formatter: '{b}',
        fontWeight: 'normal',
        fontSize: 14,
        color: '#454E54',
        textBorderColor: '#ffffff',
        textBorderWidth: 1
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = PieCommonConfig.key

  public chartConfig = cloneDeep(PieCommonConfig)

  // Biểu đồCác mục cấu hình
  public option = echartOptionProfixHandle(option, includes)
}
