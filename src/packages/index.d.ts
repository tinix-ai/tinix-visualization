import { BaseEvent, EventLife, InteractEvents, InteractEventOn, InteractActionsType } from '@/enums/eventEnum'
import type { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import type { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import type { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/VChart/index.d'

export enum ChartFrameEnum {
  // ủng hộ dataset của echarts khung
  ECHARTS = 'echarts',
  // VChart khung
  VCHART = 'VChart',
  // UI khung thành phần
  NAIVE_UI = 'naiveUI',
  // Các thành phần tùy chỉnh với dữ liệu
  COMMON = 'common',
  // Không có thay đổi dữ liệu
  STATIC = 'static'
}

// Cấu hình thành phần
export type ConfigType = {
  // ID duy nhất (cho đồng bộ server)
  id?: string
  // thành phần key
  key: string
  // thành phần vải key
  chartKey: string
  // Đặt các thành phần bảng điều khiển ở bên phải key
  conKey: string
  // tiêu đề
  title: string
  // Phân loại
  category: string
  // Tên danh mục
  categoryName: string
  // Sở hữu gói
  package: PackagesCategoryEnum
  // Phân loại
  chartFrame?: ChartFrameEnum
  // Xem trước
  image: string
  // Tạo thành phần từ đường dẫn đã chỉ định
  redirectComponent?: string
  // Thành phần mặc định dataset giá trị(hình ảnh/biểu tượng)
  dataset?: any
  // Vô hiệu hóa Kéo hoặc nhấp đúp để tạo thành phần
  disabled?: boolean
  // biểu tượng
  icon?: string
  // sự kiện
  configEvents?: { [T: string]: Function }
}

// yêu cầu dữ liệu
interface requestConfig {
  request: RequestConfigType
}

// Echarts kiểu dữ liệu
interface EchartsDataType {
  dimensions: string[]
  source: any[]
}

// Trạng thái thành phần
export interface StatusType {
  lock: boolean
  hide: boolean
}

// Bộ Lọc/Chuyển đổi enum
export enum FilterEnum {
  // Có bật hay không
  FILTERS_SHOW = 'filterShow',

  // minh bạch
  OPACITY = 'opacity',
  // bão hòa
  SATURATE = 'saturate',
  // Sự tương phản
  CONTRAST = 'contrast',
  // Huế
  HUE_ROTATE = 'hueRotate',
  // độ sáng
  BRIGHTNESS = 'brightness',

  // quay
  ROTATE_Z = 'rotateZ',
  ROTATE_X = 'rotateX',
  ROTATE_Y = 'rotateY',

  // nghiêng
  SKEW_X = 'skewX',
  SKEW_Y = 'skewY',

  // chế độ hòa trộn
  BLEND_MODE = 'blendMode'
}

export const BlendModeEnumList = [
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_365') : 'làm tối đi'), value: 'normal' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_186') : 'lọc màu'), value: 'multiply' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_143') : 'Màu sắc đậm hơn'), value: 'overlay' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_407') : 'thông tin'), value: 'screen' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_439') : 'loại trừ'), value: 'darken' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_492') : 'biểu đồ'), value: 'lighten' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_112') : 'ánh sáng chói'), value: 'color-dodge' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_309') : 'ánh sáng dịu nhẹ'), value: 'color-burn;' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_172') : 'Sự khác biệt'), value: 'hard-light' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_44') : 'độ sáng'), value: 'soft-light' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_260') : 'tiện ích'), value: 'difference' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_242') : 'hình ảnh'), value: 'exclusion' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_350') : 'nhân'), value: 'hue' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_156') : 'né tránh màu sắc'), value: 'saturation' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_236') : 'bão hòa'), value: 'color' },
  { label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_410') : 'màu sắc'), value: 'luminosity' }
]

// Lớp thực thể thành phần
export interface PublicConfigType {
  id: string
  isGroup: boolean
  attr: { x: number; y: number; w: number; h: number; zIndex: number; offsetX: number; offsetY: number }
  styles: {
    [FilterEnum.FILTERS_SHOW]: boolean
    [FilterEnum.OPACITY]: number
    [FilterEnum.SATURATE]: number
    [FilterEnum.CONTRAST]: number
    [FilterEnum.HUE_ROTATE]: number
    [FilterEnum.BRIGHTNESS]: number

    [FilterEnum.ROTATE_Z]: number
    [FilterEnum.ROTATE_X]: number
    [FilterEnum.ROTATE_Y]: number

    [FilterEnum.SKEW_X]: number
    [FilterEnum.SKEW_Y]: number
    [FilterEnum.BLEND_MODE]: string
    // hoạt hình
    animations: string[]
  }
  preview?: {
    // Xem trước ngoài việc ẩn
    overFlowHidden?: boolean
  }
  filter?: string
  status: StatusType
  interactActions?: InteractActionsType[]
  events: {
    baseEvent: {
      [K in BaseEvent]?: string
    }
    advancedEvents: {
      [K in EventLife]?: string
    }
    interactEvents: {
      [InteractEvents.INTERACT_ON]: InteractEventOn | undefined
      [InteractEvents.INTERACT_COMPONENT_ID]: string | undefined
      [InteractEvents.INTERACT_FN]: { [name: string]: string }
    }[]
  }
}

export interface CreateComponentType extends PublicConfigType, requestConfig {
  key: string
  chartConfig: ConfigType
  option: GlobalThemeJsonType
  groupList?: Array<CreateComponentType>
}

// Lớp cá thể nhóm thành phần
export interface CreateComponentGroupType extends CreateComponentType {
  groupList: Array<CreateComponentType>
}

// Nhận một lớp cá thể thành phầnkeytương ứngvaluephương pháp gõ
export type PickCreateComponentType<T extends keyof CreateComponentType> = Pick<CreateComponentType, T>[T]

// Bảng liệt kê phân loại gói
export enum PackagesCategoryEnum {
  CHARTS = 'Charts',
  VCHART = 'VChart',
  TABLES = 'Tables',
  INFORMATIONS = 'Informations',
  PHOTOS = 'Photos',
  ICONS = 'Icons',
  DECORATES = 'Decorates'
}

// Tên danh mục gói
export enum PackagesCategoryName {
  CHARTS = 'Biểu đồ',
  VCHART = 'VChart',
  TABLES = 'Bảng biểu',
  INFORMATIONS = 'Thông tin',
  PHOTOS = 'Hình ảnh',
  ICONS = 'Biểu tượng',
  DECORATES = 'Trang trí'
}

// Nhận thành phần
export enum FetchComFlagType {
  VIEW,
  CONFIG
}

// Biểu đồLoại gói
export type PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ConfigType[]
  [PackagesCategoryEnum.VCHART]: ConfigType[]
  [PackagesCategoryEnum.INFORMATIONS]: ConfigType[]
  [PackagesCategoryEnum.TABLES]: ConfigType[]
  [PackagesCategoryEnum.PHOTOS]: ConfigType[]
  [PackagesCategoryEnum.ICONS]: ConfigType[]
  [PackagesCategoryEnum.DECORATES]: ConfigType[]
}
