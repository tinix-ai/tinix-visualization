import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Decorates06Config: ConfigType = {
  key: 'Decorates06',
  chartKey: 'VDecorates06',
  conKey: 'VCDecorates06',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_136') : 'Trang trí-06'),
  category: ChatCategoryEnum.DECORATE,
  categoryName: ChatCategoryEnumName.DECORATE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'decorates06.png'
}
