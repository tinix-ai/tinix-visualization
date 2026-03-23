import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { LineCommonConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
export const seriesItem = {
  type: 'line',
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  symbolSize: 5, //cài đặtScale của điểm point
  itemStyle: {
    color: null,
    borderRadius: 0
  },
  lineStyle: {
    type: 'solid',
    width: 3,
    color: null
  }
}

export const option = {
  tooltip: {
    show: true,
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  xAxis: {
    show: true,
    type: 'category'
  },
  yAxis: {
    show: true,
    type: 'value'
  },
  dataset: { ...dataJson },
  series: [seriesItem, seriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = LineCommonConfig.key
  public chartConfig = cloneDeep(LineCommonConfig)
  // Biểu đồCác mục cấu hình
  public option = echartOptionProfixHandle(option, includes)
}
