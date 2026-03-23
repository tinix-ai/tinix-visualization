import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { WaterPoloConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const shapes = [
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_251') : 'hình vuông tròn'),
    value: 'circle'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_406') : 'giọt nước'),
    value: 'rect'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_441') : 'Hình vuông với các góc tròn'),
    value: 'roundRect'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_477') : 'tam giác đều'),
    value: 'triangle'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_153') : 'dấu gạch chéo từ trái sang phải'),
    value: 'diamond'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_66') : 'quảng trường'),
    value: 'pin'
  },
  {
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_264') : 'đường bay'),
    value: 'arrow'
  },
]

export const includes = []

export const option = {
  dataset: 0.5,
  series: [
    {
      type: 'liquidFill',
      shape: shapes[0].value,
      radius: '90%',
      data: [0],
      center: ['50%', '50%'],
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#446bf5',
            },
            {
              offset: 1,
              color: '#2ca3e2',
            },
          ],
          globalCoord: false,
        },
      ],
      backgroundStyle: {
        borderWidth: 1,
        color: 'rgba(51, 66, 127, 0.7)',
      },
      label: {
        normal: {
          textStyle: {
            fontSize: 50,
            color: '#fff',
          },
        },
      },
      outline: {
        show: false,
        borderDistance: 10,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#112165'
        }
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType
{
  public key = WaterPoloConfig.key
  public chartConfig = cloneDeep(WaterPoloConfig)
  public option = echartOptionProfixHandle(option, includes)
}
