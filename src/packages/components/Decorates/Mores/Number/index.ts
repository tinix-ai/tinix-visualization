import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const NumberConfig: ConfigType = {
  key: 'Number',
  chartKey: 'VNumber',
  conKey: 'VCNumber',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_506') : 'Đếm số'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'number.png'
}
