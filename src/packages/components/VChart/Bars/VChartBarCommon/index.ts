import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VChartBarCommonConfig: ConfigType = {
  key: 'VChartBarCommon',
  chartKey: 'VVChartBarCommon',
  conKey: 'VCVChartBarCommon',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_233') : 'Biểu đồ cột cạnh nhau-VChart'),
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.VCHART,
  chartFrame: ChartFrameEnum.VCHART,
  image: 'vchart_bar_x.png'
}
