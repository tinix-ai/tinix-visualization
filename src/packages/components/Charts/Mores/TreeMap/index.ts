import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const TreeMapConfig: ConfigType = {
  key: 'TreeMap',
  chartKey: 'VTreeMap',
  conKey: 'VCTreeMap',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_384') : 'phân bố cây'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'tree_map.png'
}
