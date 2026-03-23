// khai báo kiểu công khai
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
// hiện hành[mô-đun thông tin]Tuyên bố phân loại
import { ChatCategoryEnum,ChatCategoryEnumName } from '../../index.d'

export const ProcessConfig: ConfigType = {
  // chỉ mộtkey
  key: 'Process',
  // Biểu hiển thị thành phần bản đồ Components Định dạng: V + key
  chartKey: 'VProcess',
  // Định cấu hình kết xuất thành phần Components Định dạng: VC + key
  conKey: 'VCProcess',
  // tên
  title: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_496') : 'Tiến trình NaiveUI'),
  // Danh mục con
  category: ChatCategoryEnum.MORE,
  // Danh mục con
  categoryName: ChatCategoryEnumName.MORE,
  // Phân loại gói hàng
  package: PackagesCategoryEnum.CHARTS,
  // hình ảnh
  image: 'process.png'
}