import { CreateComponentType, CreateComponentGroupType, FilterEnum } from '@/packages/index.d'
import { HistoryActionTypeEnum } from '@/store/modules/chartHistoryStore/chartHistoryStore.d'
import {
  RequestHttpEnum,
  RequestContentTypeEnum,
  RequestDataTypeEnum,
  RequestHttpIntervalEnum,
  RequestParams,
  RequestBodyEnum,
  RequestParamsObjType
} from '@/enums/httpEnum'
import { PreviewScaleEnum } from '@/enums/styleEnum'
import type { ChartColorsNameType, CustomColorsType, GlobalThemeJsonType } from '@/settings/chartThemes/index'

// Chỉnh sửa thuộc tính canvas
export enum EditCanvasTypeEnum {
  EDIT_LAYOUT_DOM = 'editLayoutDom',
  EDIT_CONTENT_DOM = 'editContentDom',
  OFFSET = 'offset',
  SCALE = 'scale',
  USER_SCALE = 'userScale',
  LOCK_SCALE = 'lockScale',
  IS_CREATE = 'isCreate',
  IS_DRAG = 'isDrag',
  IS_SELECT = 'isSelect',
  IS_CODE_EDIT="isCodeEdit"
}

// Chỉnh sửa khu vực
export type EditCanvasType = {
  // Chỉnh sửa khu vực DOM
  [EditCanvasTypeEnum.EDIT_LAYOUT_DOM]: HTMLElement | null
  [EditCanvasTypeEnum.EDIT_CONTENT_DOM]: HTMLElement | null
  // kích thước bù đắp
  [EditCanvasTypeEnum.OFFSET]: number
  // Phóng
  [EditCanvasTypeEnum.SCALE]: number
  // Phóng
  [EditCanvasTypeEnum.USER_SCALE]: number
  // Khóa thu phóng
  [EditCanvasTypeEnum.LOCK_SCALE]: boolean
  // Tạo ban đầu
  [EditCanvasTypeEnum.IS_CREATE]: boolean
  // Kéo
  [EditCanvasTypeEnum.IS_DRAG]: boolean
  // hộp đã chọn
  [EditCanvasTypeEnum.IS_SELECT]: boolean
  // Chỉnh sửa mã
  [EditCanvasTypeEnum.IS_CODE_EDIT]: boolean
}

// lọc/màu nền/Chủ đề về chiều rộng và chiều cao, v.v.
export enum EditCanvasConfigEnum {
  PROJECT_NAME = 'projectName',
  WIDTH = 'width',
  HEIGHT = 'height',
  CHART_THEME_COLOR = 'chartThemeColor',
  CHART_CUSTOM_THEME_COLOR_INFO = 'chartCustomThemeColorInfo',
  CHART_THEME_SETTING = 'chartThemeSetting',
  VCHART_THEME_NAME = 'vChartThemeName',
  BACKGROUND = 'background',
  BACKGROUND_IMAGE = 'backgroundImage',
  SELECT_COLOR = 'selectColor',
  PREVIEW_SCALE_TYPE = 'previewScaleType'
}

export interface EditCanvasConfigType {
  // lọc-cho phép
  [FilterEnum.FILTERS_SHOW]: boolean
  // lọc-Huế
  [FilterEnum.HUE_ROTATE]: number
  // lọc-bão hòa
  [FilterEnum.SATURATE]: number
  // lọc-độ sáng
  [FilterEnum.BRIGHTNESS]: number
  // lọc-Sự tương phản
  [FilterEnum.CONTRAST]: number
  // lọc-độ mờ đục
  [FilterEnum.OPACITY]: number
  // Chuyển đổi (chưa được sử dụng)
  [FilterEnum.ROTATE_Z]: number
  [FilterEnum.ROTATE_X]: number
  [FilterEnum.ROTATE_Y]: number
  [FilterEnum.SKEW_X]: number
  [FilterEnum.SKEW_Y]: number
  [FilterEnum.BLEND_MODE]: string
  // Tên màn ảnh rộng
  [EditCanvasConfigEnum.PROJECT_NAME]?: string
  // Chiều rộng màn hình lớn
  [EditCanvasConfigEnum.WIDTH]: number
  // Chiều cao màn hình lớn
  [EditCanvasConfigEnum.HEIGHT]: number
  // màu nền
  [EditCanvasConfigEnum.BACKGROUND]?: string
  // hình nền
  [EditCanvasConfigEnum.BACKGROUND_IMAGE]?: string | null
  // Màu chủ đề biểu đồ
  [EditCanvasConfigEnum.CHART_THEME_COLOR]: ChartColorsNameType
  // Tùy chỉnh màu chủ đề biểu đồ
  [EditCanvasConfigEnum.CHART_CUSTOM_THEME_COLOR_INFO]?: CustomColorsType[] 
  // Biểu đồ cấu hình toàn cầu
  [EditCanvasConfigEnum.CHART_THEME_SETTING]: GlobalThemeJsonType
  // Màu chủ đề biểu đồ
  [EditCanvasConfigEnum.SELECT_COLOR]: boolean,
  // vChart chủ đề
  [EditCanvasConfigEnum.VCHART_THEME_NAME]: string
  // Chế độ hiển thị xem trước
  [EditCanvasConfigEnum.PREVIEW_SCALE_TYPE]: PreviewScaleEnum
}

// Thông tin trục
// eslint-disable-next-line no-redeclare
export enum EditCanvasTypeEnum {
  START_X = 'startX',
  START_Y = 'startY',
  X = 'x',
  Y = 'y'
}

// vị trí chuột
export type MousePositionType = {
  // bắt đầu X
  [EditCanvasTypeEnum.START_X]: number
  // bắt đầu Y
  [EditCanvasTypeEnum.START_Y]: number
  // X
  [EditCanvasTypeEnum.X]: number
  // y
  [EditCanvasTypeEnum.Y]: number
}

// Mục tiêu hoạt động
export type TargetChartType = {
  hoverId?: string
  selectId: string[]
}

// ghi dữ liệu
export type RecordChartType = {
  charts: CreateComponentType | CreateComponentGroupType | Array<CreateComponentType | CreateComponentGroupType>
  type: HistoryActionTypeEnum.CUT | HistoryActionTypeEnum.COPY
}

// Store liệt kê
export enum ChartEditStoreEnum {
  EDIT_RANGE = 'editRange',
  EDIT_CANVAS = 'editCanvas',
  RIGHT_MENU_SHOW = 'rightMenuShow',
  MOUSE_POSITION = 'mousePosition',
  TARGET_CHART = 'targetChart',
  RECORD_CHART = 'recordChart',
  // Những thứ sau đây cần được lưu trữ
  EDIT_CANVAS_CONFIG = 'editCanvasConfig',
  REQUEST_GLOBAL_CONFIG = 'requestGlobalConfig',
  COMPONENT_LIST = 'componentList'
}

// Yêu cầu loại công khai
type RequestPublicConfigType = {
  // Đơn vị thời gian (giờ phút giây)
  requestIntervalUnit: RequestHttpIntervalEnum
  // Yêu cầu nội dung
  requestParams: RequestParams
}

// Loại mục dữ liệu
export type RequestDataPondItemType = {
  dataPondId: string,
  dataPondName: string,
  dataPondRequestConfig: RequestConfigType
}

// Cấu hình yêu cầu biểu đồ toàn cầu
export interface RequestGlobalConfigType extends RequestPublicConfigType {
  // Thời gian bỏ phiếu tùy chỉnh thành phần
  requestInterval: number
  // Yêu cầu địa chỉ nguồn
  requestOriginUrl?: string
  // nhóm dữ liệu công cộng
  requestDataPond: RequestDataPondItemType[]
}

// Cấu hình yêu cầu biểu đồ đơn
export interface RequestConfigType extends RequestPublicConfigType {
  // Sự tương ứng với nhóm dữ liệu toàn cầu đã chọn id
  requestDataPondId?: string
  // Thời gian bỏ phiếu tùy chỉnh thành phần
  requestInterval?: number
  // Cách lấy dữ liệu
  requestDataType: RequestDataTypeEnum
  // Phương thức yêu cầu get/post/del/put/patch
  requestHttpType: RequestHttpEnum
  // nguồn tiếp theo url
  requestUrl?: string
  // Yêu cầu phương thức nội dung bình thường/sql
  requestContentType: RequestContentTypeEnum
  // Yêu cầu loại cơ thể
  requestParamsBodyType: RequestBodyEnum
  // SQL đối tượng yêu cầu
  requestSQLContent: {
    sql: string
  }
}

// Store kiểu
export interface ChartEditStoreType {
  [ChartEditStoreEnum.EDIT_CANVAS]: EditCanvasType
  [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvasConfigType
  [ChartEditStoreEnum.RIGHT_MENU_SHOW]: boolean
  [ChartEditStoreEnum.MOUSE_POSITION]: MousePositionType
  [ChartEditStoreEnum.TARGET_CHART]: TargetChartType
  [ChartEditStoreEnum.RECORD_CHART]?: RecordChartType
  [ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG]: RequestGlobalConfigType
  [ChartEditStoreEnum.COMPONENT_LIST]: Array<CreateComponentType | CreateComponentGroupType>
}

// Kiểu dữ liệu lưu trữ
export interface ChartEditStorage {
  [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: EditCanvasConfigType
  [ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG]: RequestGlobalConfigType
  [ChartEditStoreEnum.COMPONENT_LIST]: Array<CreateComponentType | CreateComponentGroupType>
}
