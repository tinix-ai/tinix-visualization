import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const CapsuleChartConfig: ConfigType = {
  key: 'CapsuleChart',
  chartKey: 'VCapsuleChart',
  conKey: 'VCCapsuleChart',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_308') : 'Tất cả các kích thước văn bản'),
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'capsule.png'
}
