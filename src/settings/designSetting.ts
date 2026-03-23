import { LangEnum, PreviewScaleEnum } from '@/enums/styleEnum'
import { RequestHttpIntervalEnum } from '@/enums/httpEnum'
import designColor from './designColor.json'

// Ngôn ngữ mặc định
export const lang = LangEnum.VI

// văn bản hình mờ
export const watermarkText = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_267') : 'Nền tảng mã thấp GoView')

// Tên nhóm
export const groupTitle = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_142') : 'Nhóm')

// Cấu hình chủ đề
export const theme = {
  // Có bật chủ đề tối theo mặc định hay không
  darkTheme: true,
  //Màu chủ đề mặc định
  appTheme: '#51d6a9',
  appThemeDetail: null,
}

// Cấu hình ban đầu của biểu đồ(px)
export const chartInitConfig = {
  x: 50,
  y: 50,
  w: 500,
  h: 300,
  // Không nên di chuyển offset
  offsetX: 0,
  offsetY: 0,
}

// dialog kích thước biểu tượng
export const dialogIconSize = '20'

// chiều rộng thanh bên
export const asideWidth = '270'

// Chiều rộng của thanh bên sau khi gấp. Nếu tất cả các nếp gấp được hỗ trợ, nó sẽ được che phủ như 0
export const asideCollapsedWidth = 60

// Có thể đóng cửa sổ bật lên bằng cách nhấp vào mặt nạ hay không
export const maskClosable = false

// Làm tròn biên giới toàn cầu
export const borderRadius = '4px'

// khoảng thời gian băng chuyền
export const carouselInterval = 4000

// Giới hạn kích thước hình nền màn hình lớn của bàn làm việc (5M）
export const backgroundImageSize = 5

// Chế độ hiển thị xem trước
export const previewScaleType = PreviewScaleEnum.FIT

// Bàn làm việc chỉnh sửa được đồng bộ hóa với JSON Khoảng thời gian bỏ phiếu (5S）
export const editToJsonInterval = 5000

// Khoảng thời gian yêu cầu dữ liệu
export const requestInterval = 30

// Đơn vị khoảng thời gian yêu cầu dữ liệu
export const requestIntervalUnit = RequestHttpIntervalEnum.SECOND

// Số lượng bản ghi lịch sử khu vực làm việc tối đa được lưu trữ
export const editHistoryMax = 100

// Bị che khi kéo z-index, cần phải cao hơn tất cả các biểu đồ
export const canvasModelIndex = 9999

// Bị che trong quá trình chọn khung z-index, cần phải cao hơn tất cả các biểu đồ
export const selectBoxIndex = canvasModelIndex + 10
