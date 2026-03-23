import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const InputsInputConfig: ConfigType = {
    key: 'InputsInput',
    chartKey: 'VInputsInput',
    conKey: 'VCInputsInput',
    title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_222') : 'Hộp nhập liệu'),
    category: ChatCategoryEnum.INPUTS,
    categoryName: ChatCategoryEnumName.INPUTS,
    package: PackagesCategoryEnum.INFORMATIONS,
    chartFrame: ChartFrameEnum.STATIC,
    image: 'inputs_input.png'
}