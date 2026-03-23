import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { EditCanvasType } from '@/store/modules/chartEditStore/chartEditStore.d'

// Kiểu liệt kê hoạt động

export enum HistoryActionTypeEnum {
  // Mới
  ADD = 'add',
  // xóa bỏ
  DELETE = 'delete',
  // cập nhật (vị trí, tài sản)
  UPDATE = 'update',
  // di chuyển
  MOVE = 'move',
  // sao chép
  COPY = 'copy',
  // cắt
  CUT = 'cut',
  // Dán
  PASTE = 'paste',
  // ghim lên trên
  TOP = 'top',
  // đáy
  BOTTOM = 'bottom',
  // di chuyển lên
  UP = 'up',
  // di chuyển xuống
  DOWN = 'down',
  // theo nhóm
  GROUP = 'group',
  // không có nguyên soái
  UN_GROUP = 'unGroup',
  // khóa
  LOCK = 'lock',
  // Mở khóa
  UNLOCK = 'unLock',
  // trốn
  HIDE = 'hide',
  // trình diễn
  SHOW = 'show'
}

// Loại đối tượng
export enum HistoryTargetTypeEnum {
  CANVAS = 'canvas',
  CHART = 'chart'
}

// ngăn xếp lịch sử
export enum HistoryStackEnum {
  BACK_STACK = 'backStack',
  FORWARD_STACK = 'forwardStack'
}

// mục lịch sử
export enum HistoryStackItemEnum {
  ID = 'id',
  TARGET_TYPE = 'targetType',
  ACTION_TYPE = 'actionType',
  HISTORY_DATA = 'historyData'
}

// Loại mục lịch sử
export interface HistoryItemType {
  // Sẽ có trường hợp nhiều thành phần được vận hành cùng lúc
  [HistoryStackItemEnum.ID]: string
  [HistoryStackItemEnum.TARGET_TYPE]: HistoryTargetTypeEnum
  [HistoryStackItemEnum.ACTION_TYPE]: HistoryActionTypeEnum
  [HistoryStackItemEnum.HISTORY_DATA]: CreateComponentType[] | CreateComponentGroupType[] | EditCanvasType[]
}

// lịch sử Store kiểu
export interface ChartHistoryStoreType {
  // Ngăn xếp lùi
  [HistoryStackEnum.BACK_STACK]: Array<HistoryItemType>
  // ngăn xếp nâng cao
  [HistoryStackEnum.FORWARD_STACK]: Array<HistoryItemType>
}
