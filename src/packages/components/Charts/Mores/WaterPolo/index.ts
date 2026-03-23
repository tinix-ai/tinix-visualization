import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const WaterPoloConfig: ConfigType = {
  key: 'WaterPolo',
  chartKey: 'VWaterPolo',
  conKey: 'VCWaterPolo',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_188') : 'minh họa bóng nước'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'water_WaterPolo.png'
}
