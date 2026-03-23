import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const TextGradientConfig: ConfigType = {
  key: 'TextGradient',
  chartKey: 'VTextGradient',
  conKey: 'VCTextGradient',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_388') : 'văn bản gradient'),
  category: ChatCategoryEnum.TEXT,
  categoryName: ChatCategoryEnumName.TEXT,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.NAIVE_UI,
  image: 'text_gradient.png'
}
