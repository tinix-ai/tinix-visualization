import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const DialConfig: ConfigType = {
  key: 'Dial',
  chartKey: 'VDial',
  conKey: 'VCDial',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_22') : 'quay số'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image:'dial.png'
}
