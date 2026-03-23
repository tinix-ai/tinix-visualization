import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const InputsDateConfig: ConfigType = {
  key: 'InputsDate',
  chartKey: 'VInputsDate',
  conKey: 'VCInputsDate',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_378') : 'bộ chọn thời gian'),
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: PackagesCategoryEnum.INFORMATIONS,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'inputs_date.png'
}
