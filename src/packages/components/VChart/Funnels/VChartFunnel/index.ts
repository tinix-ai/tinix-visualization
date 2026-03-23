import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VChartFunnelConfig: ConfigType = {
  key: 'VChartFunnel',
  chartKey: 'VVChartFunnel',
  conKey: 'VCVChartFunnel',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_199') : 'Biểu đồ kênh-VChart'),
  category: ChatCategoryEnum.FUNNEL,
  categoryName: ChatCategoryEnumName.FUNNEL,
  package: PackagesCategoryEnum.VCHART,
  chartFrame: ChartFrameEnum.VCHART,
  image: 'vchart_funnel.png'
}
