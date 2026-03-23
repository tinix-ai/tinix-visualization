import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ClockConfig: ConfigType = {
  key: 'Clock',
  chartKey: 'VClock',
  conKey: 'VCClock',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_150') : 'màu viền'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'clock.png'
}
