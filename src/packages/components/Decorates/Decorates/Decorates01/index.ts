import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const Decorates01Config: ConfigType = {
  key: 'Decorates01',
  chartKey: 'VDecorates01',
  conKey: 'VCDecorates01',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_277') : 'Trang trí-01'),
  category: ChatCategoryEnum.DECORATE,
  categoryName: ChatCategoryEnumName.DECORATE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'decorates01.png'
}
