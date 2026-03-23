import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const FlowChartLineConfig: ConfigType = {
    key: 'FlowChartLine',
    chartKey: 'VFlowChartLine',
    conKey: 'VCFlowChartLine',
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_196') : 'Dòng quy trình'),
    category: ChatCategoryEnum.FlowChart,
    categoryName: ChatCategoryEnumName.FlowChart,
    package: PackagesCategoryEnum.DECORATES,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'flow-zhexian.png'
}
