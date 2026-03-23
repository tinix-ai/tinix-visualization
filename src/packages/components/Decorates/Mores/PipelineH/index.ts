import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const PipelineHConfig: ConfigType = {
  key: 'PipelineH',
  chartKey: 'VPipelineH',
  conKey: 'VCPipelineH',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_386') : 'Ống - Bên'),
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.DECORATES,
  image: 'Pipeline_H.png'
}
