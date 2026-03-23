import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const SankeyConfig: ConfigType = {
  key: 'Sankey',
  chartKey: 'VSankey',
  conKey: 'VCSankey',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_342') : 'phương hướng'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'sankey.png'
}
