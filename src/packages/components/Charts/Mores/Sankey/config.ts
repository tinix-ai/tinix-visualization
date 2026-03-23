import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { SankeyConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

// Biểu hướng đồ thị
export const orientList = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_57') : 'mức độ'), value: 'horizontal' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_255') : 'hình dạng cây bút'), value: 'vertical' }
]

// Hiển thị nhãn
export const toolTipSwitch = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_354') : 'đóng cửa'), value: 1 },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_373') : 'nhẫn'), value: 0 }
]

export const option = {
  dataset: { ...dataJson },
  tooltip: {
    show: 1,
    trigger: 'item',
    triggerOn: 'mousemove'
  },
  series: {
    type: 'sankey',
    layout: 'none',
    orient:'horizontal',
    data: dataJson.label,
    links: dataJson.links,
    levels: dataJson.levels
  }
};

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = SankeyConfig.key
  public chartConfig = cloneDeep(SankeyConfig)
  // Biểu đồCác mục cấu hình
  public option = echartOptionProfixHandle(option, includes)
}
