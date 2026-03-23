import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border03Config: ConfigType = {
  key: 'Border03',
  chartKey: 'VBorder03',
  conKey: 'VCBorder03',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_211') : 'Biên giới-03'),
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border03.png'
}
