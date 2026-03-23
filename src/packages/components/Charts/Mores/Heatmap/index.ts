import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const HeatmapConfig: ConfigType = {
  key: 'Heatmap',
  chartKey: 'VHeatmap',
  conKey: 'VCHeatmap',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_3') : 'bản đồ nhiệt'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'heatmap.png'
}
