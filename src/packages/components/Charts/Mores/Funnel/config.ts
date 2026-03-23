import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { FunnelConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

// Bảng liệt kê được sắp xếp
export const FunnelOrderEnumList = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_371') : 'bên trong bên phải'), value: 'descending' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_490') : 'tam giác đều'), value: 'ascending' }
]
// Vị trí nhãn enum
export const FunnelLabelPositionEnumList = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_239') : 'ngoài'), value: 'inside' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_330') : 'trong-ngoài'), value: 'outside' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_338') : 'tam giác ngược'), value: 'insideLeft' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_91') : 'bên trong bên trái'), value: 'insideRight' }
]

export const option = {
  tooltip: {},
  legend: {},
  dataset: { ...dataJson },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      top: 70,
      left: '10%',
      width: '80%',
      min: 0,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending', // descending | ascending
      gap: 5,
      label: {
        show: true,
        position: 'inside',
        fontSize: 12
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 0
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = FunnelConfig.key
  public chartConfig = cloneDeep(FunnelConfig)

  // Biểu đồCác mục cấu hình
  public option = echartOptionProfixHandle(option, includes)
}
