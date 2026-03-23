import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VChartPercentAreaConfig: ConfigType = {
  key: 'VChartPercentArea',
  chartKey: 'VVChartPercentArea',
  conKey: 'VCVChartPercentArea',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_364') : 'Biểu đồ phần trăm diện tích VChart'),
  category: ChatCategoryEnum.AREA,
  categoryName: ChatCategoryEnumName.AREA,
  package: PackagesCategoryEnum.VCHART,
  chartFrame: ChartFrameEnum.VCHART,
  image: 'vchart_percent_area.png'
}
