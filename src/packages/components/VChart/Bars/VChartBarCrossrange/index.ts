import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VChartBarCrossrangeConfig: ConfigType = {
  key: 'VChartBarCrossrange',
  chartKey: 'VVChartBarCrossrange',
  conKey: 'VCVChartBarCrossrange',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_233') : 'Biểu đồ cột cạnh nhau-VChart'),
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.VCHART,
  chartFrame: ChartFrameEnum.VCHART,
  image: 'vchart_bar_y.png'
}
