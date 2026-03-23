import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Decorates05Config: ConfigType = {
  key: 'Decorates05',
  chartKey: 'VDecorates05',
  conKey: 'VCDecorates05',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_368') : 'Trang trí-05'),
  category: ChatCategoryEnum.DECORATE,
  categoryName: ChatCategoryEnumName.DECORATE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'decorates05.png'
}
