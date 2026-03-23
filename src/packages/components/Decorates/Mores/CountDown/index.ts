import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const CountDownConfig: ConfigType = {
  key: 'CountDown',
  chartKey: 'VCountDown',
  conKey: 'VCCountDown',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_201') : 'Màu chữ'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'countdown.png'
}
