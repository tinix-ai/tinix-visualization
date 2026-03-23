import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border11Config: ConfigType = {
  key: 'Border11',
  chartKey: 'VBorder11',
  conKey: 'VCBorder11',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_146') : 'Biên giới-11'),
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border11.png'
}
