import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VChartLineConfig: ConfigType = {
  key: 'VChartLine',
  chartKey: 'VVChartLine',
  conKey: 'VCVChartLine',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_99') : 'Biểu đồ đường-VChart'),
  category: ChatCategoryEnum.LINE,
  categoryName: ChatCategoryEnumName.LINE,
  package: PackagesCategoryEnum.VCHART,
  chartFrame: ChartFrameEnum.VCHART,
  image: 'vchart_line.png'
}
