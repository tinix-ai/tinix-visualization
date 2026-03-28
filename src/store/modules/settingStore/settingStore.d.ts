export enum ToolsStatusEnum {
  DOCK = 'dock',
  ASIDE = 'aside',
}

export enum SettingStoreEnums {
  // Có ẩn danh mục biểu mẫu ở bên trái trang kéo và thả khi chỉ có một mục hay không
  HIDE_PACKAGE_ONE_CATEGORY = 'hidePackageOneCategory',
  // Chuyển đổi ngôn ngữ có làm mới tuyến đường hay không
  CHANGE_LANG_RELOAD = 'changeLangReload',
  // Thanh bên có thu gọn để ẩn tất cả không
  ASIDE_ALL_COLLAPSED = 'asideAllCollapsed',
  // Khoảng cách di chuyển bằng cách nhấn các phím định hướng khi di chuyển biểu đồ
  CHART_MOVE_DISTANCE = 'chartMoveDistance',
  // Khoảng cách hấp phụ khi kéo biểu đồ (px）
  CHART_ALIGN_RANGE = 'chartAlignRange',
  // Trạng thái thanh công cụ biểu đồ (trạng thái công cụ bên)
  CHART_TOOLS_STATUS = 'chartToolsStatus',
  // Trạng thái thanh công cụ biểu đồ bị ẩn
  CHART_TOOLS_STATUS_HIDE = 'chartToolsStatusHide',
  // Có thu gọn danh mục biểu mẫu ở bên trái trang kéo và thả hay không
  HIDE_PACKAGE_CATEGORY = 'hidePackageCategory'
}

export interface SettingStoreType {
  [SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY]: boolean
  [SettingStoreEnums.CHANGE_LANG_RELOAD]: boolean
  [SettingStoreEnums.ASIDE_ALL_COLLAPSED]: boolean
  [SettingStoreEnums.CHART_MOVE_DISTANCE]: number
  [SettingStoreEnums.CHART_ALIGN_RANGE]: number
  [SettingStoreEnums.CHART_TOOLS_STATUS]: ToolsStatusEnum
  [SettingStoreEnums.CHART_TOOLS_STATUS_HIDE]: boolean
  [SettingStoreEnums.HIDE_PACKAGE_CATEGORY]: boolean
}
