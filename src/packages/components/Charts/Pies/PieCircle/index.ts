import image from '@/assets/images/chart/charts/pie-circle.png'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PieCircleConfig: ConfigType = {
  key: 'PieCircle',
  chartKey: 'VPieCircle',
  conKey: 'VCPieCircle',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_208') : 'Biểu đồ hình tròn-Bánh rán'),
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'pie-circle.png'
}
