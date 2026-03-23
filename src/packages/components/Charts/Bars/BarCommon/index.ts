import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BarCommonConfig: ConfigType = {
  key: 'BarCommon',
  chartKey: 'VBarCommon',
  conKey: 'VCBarCommon',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_128') : 'Hơn'),
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'bar_x.png'
}
