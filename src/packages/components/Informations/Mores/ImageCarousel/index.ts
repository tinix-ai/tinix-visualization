import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ImageCarouselConfig: ConfigType = {
  key: 'ImageCarousel',
  chartKey: 'VImageCarousel',
  conKey: 'VCImageCarousel',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_377') : 'băng chuyền'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.NAIVE_UI,
  image: 'photo_carousel.png'
}
