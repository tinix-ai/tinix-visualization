// Click chuột trái và phải
export enum MouseEventButton {
  LEFT = 1,
  RIGHT = 2
}

// Tên phím kéo trang
export enum DragKeyEnum {
  DRAG_KEY = 'ChartData'
}

// Lưu hoạt động trên các trang khác nhau
export enum SavePageEnum {
  CHART = 'SaveChart',
  CHART_TO_PREVIEW = 'ChartToPreview',
  JSON = 'SaveJSON',
  CLOSE = 'close'
}

// Liệt kê hoạt động
export enum MenuEnum {
  // di chuyển
  ARROW_UP = 'up',
  ARROW_RIGHT = 'right',
  ARROW_DOWN = 'down',
  ARROW_LEFT = 'left',
  // xóa bỏ
  DELETE = 'delete',
  // sao chép
  COPY = 'copy',
  // cắt
  CUT = 'cut',
  // Dán
  PARSE = 'parse',
  // ghim lên trên
  TOP = 'top',
  // đáy
  BOTTOM = 'bottom',
  // di chuyển lên
  UP = 'up',
  // di chuyển xuống
  DOWN = 'down',
  // Xóa bảng nhớ tạm
  CLEAR = 'clear',
  // theo nhóm
  GROUP = 'group',
  // không có nguyên soái
  UN_GROUP = 'unGroup',
  // Mặt sau
  BACK = 'back',
  // tiếp tục đi
  FORWORD = 'forward',
  // cứu
  SAVE = 'save',
  // khóa
  LOCK = 'lock',
  // Mở khóa
  UNLOCK = 'unLock',
  // trốn
  HIDE = 'hide',
  // trình diễn
  SHOW = 'show'
}

// Win Bảng liệt kê bàn ​​phím
export enum WinKeyboard {
  CTRL = 'ctrl',
  SHIFT = 'shift',
  ALT = ' alt',
  CTRL_SOURCE_KEY = 'control',
  SHIFT_SOURCE_KEY = 'shift',
  ALT_SOURCE_KEY = 'alt',
  SPACE = 'Space'
}

// Mac Bảng liệt kê bàn ​​phím
export enum MacKeyboard {
  // Vẫn sử dụng Command Thanh
  CTRL = '⌘',
  SHIFT = '⇧',
  ALT = '⌥',
  CTRL_SOURCE_KEY = '⌘',
  SHIFT_SOURCE_KEY = '⇧',
  ALT_SOURCE_KEY = '⌥',
  SPACE = 'Space'
}
