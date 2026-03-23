import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const VChartWordCloudConfig: ConfigType = {
  key: 'VChartWordCloud',
  chartKey: 'VVChartWordCloud',
  conKey: 'VCVChartWordCloud',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_244') : 'Biểu đồ đám mây Word-VChart'),
  category: ChatCategoryEnum.WORDCLOUD,
  categoryName: ChatCategoryEnumName.WORDCLOUD,
  package: PackagesCategoryEnum.VCHART,
  chartFrame: ChartFrameEnum.VCHART,
  image: 'vchart_word_cloud.png'
}
