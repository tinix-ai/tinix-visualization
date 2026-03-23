import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VideoConfig: ConfigType = {
  key: 'Video',
  chartKey: 'VVideo',
  conKey: 'VCVideo',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_353') : 'nguồn'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'video.png'
}
