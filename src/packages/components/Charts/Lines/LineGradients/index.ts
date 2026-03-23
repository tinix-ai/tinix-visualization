import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const LineGradientsConfig: ConfigType = {
  key: 'LineGradients',
  chartKey: 'VLineGradients',
  conKey: 'VCLineGradients',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_73') : 'Biểu đồ vùng gradient đường đôi'),
  category: ChatCategoryEnum.LINE,
  categoryName: ChatCategoryEnumName.LINE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'line_gradient.png'
}
