import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PipelineVConfig: ConfigType = {
  key: 'PipelineV',
  chartKey: 'VPipelineV',
  conKey: 'VCPipelineV',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_74') : 'Ống - Dọc'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  image: 'Pipeline_V.png'
}

