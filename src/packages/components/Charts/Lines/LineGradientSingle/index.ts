import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const LineGradientSingleConfig: ConfigType = {
  key: 'LineGradientSingle',
  chartKey: 'VLineGradientSingle',
  conKey: 'VCLineGradientSingle',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_426') : 'Biểu đồ vùng gradient đa tuyến đơn'),
  category: ChatCategoryEnum.LINE,
  categoryName: ChatCategoryEnumName.LINE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'line_gradient_single.png'
}
