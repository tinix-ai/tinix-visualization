import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { GraphConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = []

// Bố cục sơ đồ
export const GraphLayout = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_14') : 'bật lên'), value: 'none' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_163') : 'Lực lượng hướng dẫn'), value: 'circular' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_184') : 'không có'), value: 'force' }
]

// Chuyển đổi thẻ
export const LabelSwitch = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_354') : 'đóng cửa'), value: 1 },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_373') : 'nhẫn'), value: 0 }
]

// NhãnVị trí
export const LabelPosition = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_197') : 'bên trái'), value: 'left' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_249') : 'bên phải'), value: 'right' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_335') : 'đáy'), value: 'top' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_323') : 'đứng đầu'), value: 'bottom' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_239') : 'ngoài'), value: 'inside' }
]

// hình ảnh-lặp đi lặp lạiAnimation
export const LayoutAnimation = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_354') : 'đóng cửa'), value: 1 },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_373') : 'nhẫn'), value: 0 }
]

export const option = {
  dataset: { ...dataJson },
  tooltip: {},
  legend: {
    show: true,
    textStyle: {
      color: '#eee',
      fontSize: 14
    },
    data: dataJson.categories.map(function (a) {
      return a.name
    })
  },
  series: [
    {
      type: 'graph',
      layout: 'none', // none circularbố trí vòng
      data: dataJson.nodes,
      links: dataJson.links,
      categories: dataJson.categories,
      label: {
        show: 1,
        position: 'right',
        formatter: '{b}'
      },
      labelLayout: {
        hideOverlap: true
      },
      lineStyle: {
        color: 'source', // đường kẻMàu sắc
        curveness: 0.2 // Độ cong của đường
      },
      force: {
        repulsion: 100,
        gravity: 0.1,
        edgeLength: 30,
        layoutAnimation: 1,
        friction: 0.6
      }
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = GraphConfig.key
  public chartConfig = cloneDeep(GraphConfig)
  // Biểu đồCác mục cấu hình
  public option = echartOptionProfixHandle(option, includes)
}
