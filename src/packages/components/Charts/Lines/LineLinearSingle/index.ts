import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const LineLinearSingleConfig: ConfigType = {
  key: 'LineLinearSingle',
  chartKey: 'VLineLinearSingle',
  conKey: 'VCLineLinearSingle',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_94') : 'Biểu đồ gradient đa tuyến đơn'),
  category: ChatCategoryEnum.LINE,
  categoryName: ChatCategoryEnumName.LINE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'line_linear_single.png'
}
