import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const ThreeEarth01Config: ConfigType = {
  key: 'ThreeEarth01',
  chartKey: 'VThreeEarth01',
  conKey: 'VCThreeEarth01',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_497') : 'Trái đất 3D'),
  category: ChatCategoryEnum.THREE,
  categoryName: ChatCategoryEnumName.THREE,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'threeEarth01.png'
}
