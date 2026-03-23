import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border04Config: ConfigType = {
  key: 'Border04',
  chartKey: 'VBorder04',
  conKey: 'VCBorder04',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_403') : 'Biên giới-04'),
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border04.png'
}
