import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const InputsPaginationConfig: ConfigType = {
    key: 'InputsPagination',
    chartKey: 'VInputsPagination',
    conKey: 'VCInputsPagination',
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_413') : 'Cấu hình phân trang'),
    category: ChatCategoryEnum.INPUTS,
    categoryName: ChatCategoryEnumName.INPUTS,
    package: PackagesCategoryEnum.INFORMATIONS,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'inputs_pagination.png'
}