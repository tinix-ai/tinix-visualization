import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const GraphConfig: ConfigType = {
  key: 'Graph',
  chartKey: 'VGraph',
  conKey: 'VCGraph',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_166') : 'huyền thoại'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'graph.png'
}
