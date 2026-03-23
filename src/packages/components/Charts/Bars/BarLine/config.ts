import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarLineConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']
// đa tuyến cộtGrouphình ảnh PhútĐừng xác địnhseries
// Viết cho chếtnamecó thể được xác địnhlegendhiển thịDanh xưng
export const barSeriesItem = {
  type: 'bar',
  barWidth: 15,
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  itemStyle: {
    color: null,
    borderRadius: 2
  }
}

export const lineSeriesItem = {
  type: 'line',
  symbol: 'circle',
  label: {
    show: true,
    position: 'top',
    color: '#fff',
    fontSize: 12
  },
  symbolSize: 5, //cài đặtScale của điểm point
  itemStyle: {
    borderWidth: 1
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
      show: true,
      type: 'shadow'
    }
  },
  legend: {
    data: null
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
  series: [barSeriesItem, lineSeriesItem]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarLineConfig.key
  public chartConfig = cloneDeep(BarLineConfig)
  // Biểu đồCác mục cấu hình
  public option = echartOptionProfixHandle(option, includes)
}
