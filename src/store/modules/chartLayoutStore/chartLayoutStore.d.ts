export enum ChartModeEnum {
  SINGLE = 'single',
  DOUBLE = 'double'
}

export enum LayerModeEnum {
  THUMBNAIL = 'thumbnail',
  TEXT = 'text'
}

export enum ChartLayoutStoreEnum {
  LAYERS = 'layers',
  CHARTS = 'charts',
  DETAILS = 'details',
  Chart_TYPE = 'chartType',
  LAYER_TYPE = 'layerType',
  PERCENTAGE = 'percentage',
  RE_POSITION_CANVAS = 'rePositionCanvas'
}

export interface ChartLayoutType {
  // Điều khiển lớp
  [ChartLayoutStoreEnum.LAYERS]: boolean
  // thành phần biểu đồ
  [ChartLayoutStoreEnum.CHARTS]: boolean
  // Cài đặt chi tiết
  [ChartLayoutStoreEnum.DETAILS]: boolean
  // Phương pháp hiển thị thành phần
  [ChartLayoutStoreEnum.Chart_TYPE]: ChartModeEnum
  // Phương pháp hiển thị phân cấp
  [ChartLayoutStoreEnum.LAYER_TYPE]: LayerModeEnum
  // Số lượng hiện đang được tải
  [ChartLayoutStoreEnum.PERCENTAGE]: number
  // Có đặt lại vị trí canvas hiện tại hay không
  [ChartLayoutStoreEnum.RE_POSITION_CANVAS]: boolean
}
