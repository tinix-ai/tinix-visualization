import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const MapBaseConfig: ConfigType = {
    key: 'MapBase',
    chartKey: 'VMapBase',
    conKey: 'VCMapBase',
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_326') : 'Bản đồ (tỉnh tùy chọn)'),
    category: ChatCategoryEnum.MAP,
    categoryName: ChatCategoryEnumName.MAP,
    package: PackagesCategoryEnum.CHARTS,
    chartFrame: ChartFrameEnum.COMMON,
    image: 'map.png'
}