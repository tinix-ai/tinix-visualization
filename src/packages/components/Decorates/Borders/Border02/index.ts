import { ConfigType, PackagesCategoryEnum, ChartFrameEnum} from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border02Config: ConfigType = {
  key: 'Border02',
  chartKey: 'VBorder02',
  conKey: 'VCBorder02',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_299') : 'Biên giới-02'),
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border02.png'
}
