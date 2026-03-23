import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const CirclePointConfig: ConfigType = {
    key: 'CirclePoint',
    chartKey: 'VCirclePoint',
    conKey: 'VCCirclePoint',
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_60') : 'chấm hào quang'),
    category: ChatCategoryEnum.MORE,
    categoryName: ChatCategoryEnumName.MORE,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'flow-circle.png'
}
