import { ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'

// Dynamically import all 100 configurations
const configModules = import.meta.glob('./templates/*/config.json', { eager: true }) as Record<string, { default: any } | any>
// Dynamically import all 100 images
const imageModules = import.meta.glob('./templates/*/image.svg', { eager: true, as: 'url' }) as Record<string, string | { default: string }>

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

// Raw data for 100 templates
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
  { title: 'Dashboard Du lịch & Khách sạn 2024', category: 8 },

  // --- Bổ sung thêm 50 templates mới ---
  // 1: Tài chính (6)
  { title: 'Báo cáo Quản trị Rủi ro Tài chính', category: 1 },
  { title: 'Dashboard Lợi nhuận gộp theo Ngành', category: 1 },
  { title: 'Theo dõi Biến động Tỷ giá Điện tử', category: 1 },
  { title: 'Báo cáo Phân tích Điểm hoà vốn', category: 1 },
  { title: 'Dashboard Nguồn vốn và Nợ vay', category: 1 },
  { title: 'Phân bổ Ngân sách Marketing 2025', category: 1 },

  // 2: Nhân sự (6)
  { title: 'Dashboard Đánh giá Năng lực Nhân sự', category: 2 },
  { title: 'Báo cáo Tỷ lệ Giữ chân Nhân viên', category: 2 },
  { title: 'Theo dõi Chi phí Đào tạo Nội bộ', category: 2 },
  { title: 'Dashboard Thống kê Thời giờ làm việc', category: 2 },
  { title: 'Phân tích Mức độ Hài lòng Nhân viên', category: 2 },
  { title: 'Báo cáo Tuổi nghề và Thâm niên', category: 2 },

  // 3: Marketing (7)
  { title: 'Dashboard Phân tích Từ khóa SEO', category: 3 },
  { title: 'Theo dõi Chi phí Quảng cáo Đa kênh', category: 3 },
  { title: 'Báo cáo Chuyển đổi Khách hàng Tiềm năng', category: 3 },
  { title: 'Dashboard Email Marketing Khối', category: 3 },
  { title: 'Phân tích Lượt truy cập App/Web', category: 3 },
  { title: 'Theo dõi Nhận diện Thương hiệu', category: 3 },
  { title: 'Báo cáo Doanh số Bán chéo (Cross-sell)', category: 3 },

  // 4: Logistic (7)
  { title: 'Dashboard Vận đơn và Trạng thái Giao hàng', category: 4 },
  { title: 'Báo cáo Độ trễ Giao hàng (Lead Time)', category: 4 },
  { title: 'Phân tích Chi phí Lưu kho Nâng cao', category: 4 },
  { title: 'Dashboard Lộ trình Vận tải Biển', category: 4 },
  { title: 'Theo dõi Khối lượng Hàng hóa Xuất nhập', category: 4 },
  { title: 'Báo cáo Năng lực Đơn vị Vận chuyển', category: 4 },
  { title: 'Dashboard Quản lý Trả hàng (Returns)', category: 4 },

  // 5: Health & Environment (6)
  { title: 'Báo cáo Tỷ lệ Lấp đầy Giường bệnh', category: 5 },
  { title: 'Dashboard Quản lý Vật tư Y tế Tiêu hao', category: 5 },
  { title: 'Theo dõi Rác thải Môi trường Công nghiệp', category: 5 },
  { title: 'Phân tích Chi phí Khám chữa bệnh BHYT', category: 5 },
  { title: 'Dashboard Mức độ Ô nhiễm Không khí PM2.5', category: 5 },
  { title: 'Báo cáo Biến đổi Khí hậu Khu vực', category: 5 },

  // 6: Manufacturing (6)
  { title: 'Dashboard Sản lượng Bán thành phẩm', category: 6 },
  { title: 'Báo cáo Tỷ lệ Phế phẩm (Scrap Rate)', category: 6 },
  { title: 'Theo dõi Năng suất Dây chuyền Lắp ráp', category: 6 },
  { title: 'Dashboard Chu kỳ Sản xuất (Cycle Time)', category: 6 },
  { title: 'Phân tích Chi phí Tiêu hao Điện năng', category: 6 },
  { title: 'Báo cáo Tồn kho Cụm chi tiết Máy', category: 6 },

  // 7: Education (6)
  { title: 'Dashboard Đánh giá Kết quả Luyện thi', category: 7 },
  { title: 'Theo dõi Mức độ Tham gia Hoạt động Ngoại khóa', category: 7 },
  { title: 'Báo cáo Tỷ lệ Tốt nghiệp Đại học', category: 7 },
  { title: 'Phân tích Số lượng Tuyển sinh Đầu vào', category: 7 },
  { title: 'Dashboard Đánh giá Chất lượng Giảng viên', category: 7 },
  { title: 'Báo cáo Quản lý Ký túc xá Sinh viên', category: 7 },

  // 8: Other Services (6)
  { title: 'Dashboard Tỷ lệ Đặt phòng Khách sạn', category: 8 },
  { title: 'Báo cáo Xử lý Khiếu nại Khách hàng', category: 8 },
  { title: 'Phân tích Doanh thu Cửa hàng Tiện lợi', category: 8 },
  { title: 'Theo dõi Bảo hành & Sửa chữa Thiết bị', category: 8 },
  { title: 'Dashboard Quản lý Bãi đỗ xe Thông minh', category: 8 },
  { title: 'Báo cáo Đánh giá Dịch vụ Giao đồ ăn', category: 8 }
]

// Generate the final list of 100
export const templateList: TemplateItem[] = rawTemplateTitles.map((item, index) => {
  const tplId = `tpl-${String(index + 1).padStart(3, '0')}`
  const configKey = `./templates/${tplId}/config.json`
  const imageKey = `./templates/${tplId}/image.svg`

  // Safely extract the default export depending on Vite's module resolution
  const config = configModules[configKey]?.default || configModules[configKey]
  // Because 'as url' might give us default string or direct mapping
  const image = (imageModules[imageKey] as any)?.default || imageModules[imageKey]

  return {
    id: `tpl-ext-${String(index + 1).padStart(3, '0')}`,
    title: item.title,
    category: item.category,
    image: image,
    isPublished: index % 2 === 0, // Mix published/unpublished for visual variety
    config: config
  }
})
