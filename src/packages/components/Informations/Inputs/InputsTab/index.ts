import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const InputsTabConfig: ConfigType = {
  key: 'InputsTab',
  chartKey: 'VInputsTab',
  conKey: 'VCInputsTab',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_33') : 'bộ chọn thẻ'),
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'inputs_tab.png'
}
