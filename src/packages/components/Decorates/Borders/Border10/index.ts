import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border10Config: ConfigType = {
  key: 'Border10',
  chartKey: 'VBorder10',
  conKey: 'VCBorder10',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_464') : 'Biên giới-10'),
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border10.png'
}
