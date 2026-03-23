import { SettingStoreEnums, ToolsStatusEnum } from '@/store/modules/settingStore/settingStore.d'

// * Mục cấu hình người dùng
export const systemSetting = {
  // Thanh bên có thu gọn để ẩn tất cả không
  [SettingStoreEnums.ASIDE_ALL_COLLAPSED]: true,
  // Có ẩn danh mục biểu mẫu ở bên trái trang kéo và thả khi chỉ có một mục hay không
  [SettingStoreEnums.HIDE_PACKAGE_ONE_CATEGORY]: true,
  // Chuyển đổi ngôn ngữ có làm mới tuyến đường hay không
  [SettingStoreEnums.CHANGE_LANG_RELOAD]: false,
  // Khoảng cách di chuyển bằng cách nhấn các phím định hướng khi di chuyển biểu đồ
  [SettingStoreEnums.CHART_MOVE_DISTANCE]: 5,
  // Khoảng cách hấp phụ khi kéo biểu đồ (px）
  [SettingStoreEnums.CHART_ALIGN_RANGE]: 10,
  // Trạng thái thanh công cụ biểu đồ (trạng thái công cụ bên)
  [SettingStoreEnums.CHART_TOOLS_STATUS]: ToolsStatusEnum.ASIDE,
  // Trạng thái thanh công cụ biểu đồ bị ẩn (ban đầu không bị ẩn)
  [SettingStoreEnums.CHART_TOOLS_STATUS_HIDE]: false,
}