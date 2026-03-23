import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieCommonConfig: ConfigType = {
  key: 'PieCommon',
  chartKey: 'VPieCommon',
  conKey: 'VCPieCommon',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_192') : 'biểu đồ thanh'),
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'pie.png'
}
