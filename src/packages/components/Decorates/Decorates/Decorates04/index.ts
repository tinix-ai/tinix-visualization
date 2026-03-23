import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Decorates04Config: ConfigType = {
  key: 'Decorates04',
  chartKey: 'VDecorates04',
  conKey: 'VCDecorates04',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_346') : 'Trang trí-04'),
  category: ChatCategoryEnum.DECORATE,
  categoryName: ChatCategoryEnumName.DECORATE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'decorates04.png'
}
