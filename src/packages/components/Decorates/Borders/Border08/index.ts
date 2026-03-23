import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border08Config: ConfigType = {
  key: 'Border08',
  chartKey: 'VBorder08',
  conKey: 'VCBorder08',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_38') : 'Biên giới-08'),
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border08.png'
}
