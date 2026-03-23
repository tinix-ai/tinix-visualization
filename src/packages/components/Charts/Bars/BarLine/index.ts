// khai báo kiểu công khai
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
// hiện hành[mô-đun thông tin]Tuyên bố phân loại
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const BarLineConfig: ConfigType = {
  key: 'BarLine',
  chartKey: 'VBarLine',
  conKey: 'VCBarLine',
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_429') : 'Biểu đồ thanh & Biểu đồ đường'),
  category: ChatCategoryEnum.BAR,
  categoryName: ChatCategoryEnumName.BAR,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'bar_line.png'
}