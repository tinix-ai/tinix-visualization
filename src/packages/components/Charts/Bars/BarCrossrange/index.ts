import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const BarCrossrangeConfig: ConfigType = {
  key: 'BarCrossrange',
  chartKey: 'VBarCrossrange',
  conKey: 'VCBarCrossrange',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_104') : 'biểu đồ thanh ngang'),
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'bar_y.png'
}
