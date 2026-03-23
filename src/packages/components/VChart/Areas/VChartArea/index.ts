import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VChartAreaConfig: ConfigType = {
  key: 'VChartArea',
  chartKey: 'VVChartArea',
  conKey: 'VCVChartArea',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_322') : 'Biểu đồ khu vực VChart'),
  category: ChatCategoryEnum.AREA,
  categoryName: ChatCategoryEnumName.AREA,
  package: PackagesCategoryEnum.VCHART,
  chartFrame: ChartFrameEnum.VCHART,
  image: 'vchart_area.png'
}
