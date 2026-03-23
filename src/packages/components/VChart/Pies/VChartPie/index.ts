import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VChartPieConfig: ConfigType = {
  key: 'VChartPie',
  chartKey: 'VVChartPie',
  conKey: 'VCVChartPie',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_300') : 'Biểu đồ hình tròn -VChart'),
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.VCHART,
  chartFrame: ChartFrameEnum.VCHART,
  image: 'vchart_pie.png'
}
