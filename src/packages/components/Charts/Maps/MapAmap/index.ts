import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MapAmapConfig: ConfigType = {
  key: 'MapAmap',
  chartKey: 'VMapAmap',
  conKey: 'VCMapAmap',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_409') : 'Bản đồ Gaode'),
  category: ChatCategoryEnum.MAP,
  categoryName: ChatCategoryEnumName.MAP,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'map_amap.png'
}
