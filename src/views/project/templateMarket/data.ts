import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'

// Import all configurations (12 base templates)
import tpl001Config from './templates/tpl-001/config.json'
import tpl002Config from './templates/tpl-002/config.json'
import tpl003Config from './templates/tpl-003/config.json'
import tpl004Config from './templates/tpl-004/config.json'
import tpl005Config from './templates/tpl-005/config.json'
import tpl006Config from './templates/tpl-006/config.json'
import tpl007Config from './templates/tpl-007/config.json'
import tpl008Config from './templates/tpl-008/config.json'
import tpl009Config from './templates/tpl-009/config.json'
import tpl010Config from './templates/tpl-010/config.json'
import tpl011Config from './templates/tpl-011/config.json'
import tpl012Config from './templates/tpl-012/config.json'

// Import all images (12 base images)
import tpl001Image from './templates/tpl-001/image.png'
import tpl002Image from './templates/tpl-002/image.png'
import tpl003Image from './templates/tpl-003/moke.png'
import tpl004Image from './templates/tpl-004/image.png'
import tpl005Image from './templates/tpl-005/image.png'
import tpl006Image from './templates/tpl-006/image.png'
import tpl007Image from './templates/tpl-007/image.png'
import tpl008Image from './templates/tpl-008/image.png'
import tpl009Image from './templates/tpl-009/image.png'
import tpl010Image from './templates/tpl-010/image.png'
import tpl011Image from './templates/tpl-011/image.png'
import tpl012Image from './templates/tpl-012/image.png'

export interface TemplateItem {
  id: string
  title: string
  category: number 
  image: any 
  isPublished: boolean
  config?: any
}

// Map danh mục (8 categories)
export const templateCategoryMap = {
  1: 'Tài chính & Đầu tư (Finance)',
  2: 'Quản trị Nhân sự (HRM)',
  3: 'Marketing & Bán hàng (Sales)',
  4: 'Vận tải & Kho bãi (Logistic)',
  5: 'Y tế & Môi trường (Health)',
  6: 'Sản xuất & Kỹ thuật (Manufacturing)',
  7: 'Giáo dục & Xã hội (Education)',
  8: 'Dịch vụ & Khác (Other Services)'
}

// Base configurations for mapping
const baseConfigs = [
  { config: tpl001Config, image: tpl001Image },
  { config: tpl002Config, image: tpl002Image },
  { config: tpl003Config, image: tpl003Image },
  { config: tpl004Config, image: tpl004Image },
  { config: tpl005Config, image: tpl005Image },
  { config: tpl006Config, image: tpl006Image },
  { config: tpl007Config, image: tpl007Image },
  { config: tpl008Config, image: tpl008Image },
  { config: tpl009Config, image: tpl009Image },
  { config: tpl010Config, image: tpl010Image },
  { config: tpl011Config, image: tpl011Image },
  { config: tpl012Config, image: tpl012Image }
]

// Raw data for 50 templates
const rawTemplateTitles: { title: string; category: number }[] = [
  // 1: Tài chính (8)
  { title: 'Báo cáo Phân tích Tài chính 2024', category: 1 },
  { title: 'Dashboard Theo dõi Ngân sách Quý', category: 1 },
  { title: 'Phân tích Dòng tiền Doanh nghiệp', category: 1 },
  { title: 'Báo cáo Kiểm toán Nội bộ', category: 1 },
  { title: 'Dashboard Đầu tư Chứng khoán', category: 1 },
  { title: 'Phân tích Hiệu quả Chi phí', category: 1 },
  { title: 'Báo cáo Tài chính Hợp nhất', category: 1 },
  { title: 'Dashboard Quản lý Nợ công', category: 1 },
  
  // 2: Nhân sự (6)
  { title: 'Dashboard Quản lý Nhân sự Tổng hợp', category: 2 },
  { title: 'Theo dõi Hiệu suất KPI Nhân viên', category: 2 },
  { title: 'Báo cáo Tuyển dụng & Đào tạo', category: 2 },
  { title: 'Dashboard Lương & Phúc lợi', category: 2 },
  { title: 'Phân tích Biến động Nhân sự', category: 2 },
  { title: 'Dashboard Quản lý Văn hóa Doanh nghiệp', category: 2 },

  // 3: Marketing (8)
  { title: 'Phân tích Chiến dịch Marketing', category: 3 },
  { title: 'Dashboard Facebook & Google Ads', category: 3 },
  { title: 'Báo cáo Bán lẻ Thương mại Điện tử', category: 3 },
  { title: 'Theo dõi Phễu Chuyển đổi Khách hàng', category: 3 },
  { title: 'Dashboard Social Media Engagement', category: 3 },
  { title: 'Báo cáo Xu hướng Thị trường 2024', category: 3 },
  { title: 'Phân tích Hành vi Người dùng Web', category: 3 },
  { title: 'Dashboard Quản lý Đại lý & Phân phối', category: 3 },

  // 4: Logistic (6)
  { title: 'Theo dõi Logistic & Vận tải Toàn quốc', category: 4 },
  { title: 'Dashboard Quản lý Kho bãi Thông minh', category: 4 },
  { title: 'Báo cáo Hiệu suất Đội xe', category: 4 },
  { title: 'Theo dõi Chuỗi Cung ứng Toàn cầu', category: 4 },
  { title: 'Dashboard Quản lý Đơn hàng (OMS)', category: 4 },
  { title: 'Phân tích Chi phí Vận hành Logistic', category: 4 },

  // 5: Health & Environment (6)
  { title: 'Dashboard Y tế & Sức khỏe Cộng đồng', category: 5 },
  { title: 'Giám sát Chất lượng Không khí & Nước', category: 5 },
  { title: 'Báo cáo Thống kê Dịch bệnh 2024', category: 5 },
  { title: 'Dashboard Quản lý Bệnh viện Thông minh', category: 5 },
  { title: 'Theo dõi Chỉ số Tài nguyên Thiên nhiên', category: 5 },
  { title: 'Dashboard Năng lượng Xanh & Tái tạo', category: 5 },

  // 6: Manufacturing (6)
  { title: 'Giám sát Dây chuyền Sản xuất Realtime', category: 6 },
  { title: 'Dashboard Quản lý Chất lượng Sản phẩm', category: 6 },
  { title: 'Báo cáo Hiệu suất Thiết bị (OEE)', category: 6 },
  { title: 'Theo dõi Định mức Nguyên vật liệu', category: 6 },
  { title: 'Dashboard Bảo trì Dự phòng Máy móc', category: 6 },
  { title: 'Phân tích Dữ liệu Năng lượng Nhà máy', category: 6 },

  // 7: Education (5)
  { title: 'Dashboard Quản lý Đào tạo Đại học', category: 7 },
  { title: 'Theo dõi Kết quả Học tập Học sinh', category: 7 },
  { title: 'Báo cáo Thống kê Giáo dục Vùng', category: 7 },
  { title: 'Dashboard E-Learning Engagement', category: 7 },
  { title: 'Phân tích Ngân sách Giáo dục Công', category: 7 },

  // 8: Other Services (5)
  { title: 'Dashboard Smarthome & IoT', category: 8 },
  { title: 'Báo cáo Dịch vụ Khách hàng (CRM)', category: 8 },
  { title: 'Dashboard Quản lý Bất động sản', category: 8 },
  { title: 'Theo dõi Dự án Xây dựng & Tiến độ', category: 8 },
  { title: 'Dashboard Du lịch & Khách sạn 2024', category: 8 }
]

// Generate the final list of 50
export const templateList: TemplateItem[] = rawTemplateTitles.map((item, index) => {
  // Rotate through our 12 base configurations
  const baseIndex = index % baseConfigs.length
  const base = baseConfigs[baseIndex]

  return {
    id: `tpl-ext-${(index + 1).toString().padStart(3, '0')}`,
    title: item.title,
    category: item.category,
    image: base.image,
    isPublished: index % 2 === 0, // Mix published/unpublished for visual variety
    config: base.config
  }
})
