import { PublicConfigClass } from '@/packages/public'
import { VChartPieConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import { vChartOptionPrefixHandle } from '@/packages/public/vChart'
import data from './data.json'
import cloneDeep from 'lodash/cloneDeep'
import type { ChatCategoryEnum, IPieOption } from '../../index.d'

const OUTER_RADIUS = 0.75

export const includes = ['legends', 'tooltip']
export const option: IPieOption & { dataset?: any } = {
  // Biểu cấu hình đồ thị
  type: 'pie',
  dataset: data,
  categoryField: 'year',
  valueField: 'value',
  seriesField: 'year',
  // trung tâm
  centerX: '50%',
  centerY: '50%',
  innerRadius: 0.68,
  outerRadius: OUTER_RADIUS,
  label: {
    visible: true,
    position: 'outside',
    style: {
      fontSize: 12,
      fill: '#B9B8CE',
      fontFamily: 'SimSun',
      fontWeight: 'normal',
      angle: 0
    },
    line: {
      visible: true
    }
  },
  pie: {
    style: {
      // góc tròn
      cornerRadius: 50,
      // Đột quỵChiều rộng
      outerBorder: {
        // minh bạch
        strokeOpacity: 1,
        // khoảng cách hành trình bên ngoài
        distance: 0,
        // Chiều rộng
        lineWidth: 0,
        // màu sắc
        stroke: '#ffffff'
      },
      // kết cấu
      texture: ''
    },
    state: {
      hover: {
        outerRadius: 0.85
      },
      selected: {
        outerRadius: 0.85
      }
    }
  },
  // Cấu hình doanh nghiệp (sẽ được chuyển đổi thànhBiểu đồspec)
  category: VChartPieConfig.category as ChatCategoryEnum.PIE,
  extensionMark: [],
  // hoạt hình
  animationNormal: {}
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = VChartPieConfig.key
  public chartConfig = cloneDeep(VChartPieConfig)
  // Biểu đồCác mục cấu hình
  public option = vChartOptionPrefixHandle(option, includes)
}
