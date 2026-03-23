import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { FlowChartLineConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  endWidth: 15,
  lineWidth: 2, //độ dày đường
  lineNum: 2, //Giảm số lượng
  lineNumUp: 2, //Đối vớiTrênSố lượng
  backgroundCol: '#303a4c', //đường kẻBackground
  animateCol: '#3788ea' //chảyAnimationBackground
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = FlowChartLineConfig.key
  public chartConfig = cloneDeep(FlowChartLineConfig)
  public option = cloneDeep(option)
}
