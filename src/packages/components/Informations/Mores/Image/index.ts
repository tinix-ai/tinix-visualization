import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ImageConfig: ConfigType = {
  key: 'Image',
  chartKey: 'VImage',
  conKey: 'VCImage',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_508') : 'Huế'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'photo.png'
}
