// Loại sự kiện cơ bản(vueChưa được thêm on)
export enum BaseEvent {
  // nhấp chuột
  ON_CLICK = 'click',
  // nhấp đúp chuột
  ON_DBL_CLICK = 'dblclick',
  // chuyển đến
  ON_MOUSE_ENTER = 'mouseenter',
  // dọn ra ngoài
  ON_MOUSE_LEAVE = 'mouseleave'
}

// Sự kiện gọi lại tương tác thành phần
export enum InteractEvents {
  INTERACT_ON = 'interactOn',
  INTERACT_COMPONENT_ID = 'interactComponentId',
  INTERACT_FN = 'interactFn'
}

// Kiểu kích hoạt sự kiện gọi lại tương tác thành phần toàn cầu (tất nhiên tên có thể được tùy chỉnh)
export enum InteractEventOn {
  CLICK = 'click',
  CHANGE = 'change'
}

// Xác định loại trình kích hoạt thành phần tương tác keytên
export const COMPONENT_INTERACT_EVENT_KET = 'componentInteractEventKey'

// Cấu hình kích hoạt cho các thành phần tương tác
export type InteractActionsType = {
  interactType: InteractEventOn
  interactName: string
  componentEmitEvents: { [T: string]: { value: any; label: string }[] }
}

// vue3 sự kiện vòng đời
export enum EventLife {
  // Sau khi kết xuất
  VNODE_MOUNTED = 'vnodeMounted',
  // trước khi kết xuất
  VNODE_BEFORE_MOUNT = 'vnodeBeforeMount'
}

// Danh sách các đối tượng hàm chuỗi tích hợp
export const excludeParseEventKeyList = [
  EventLife.VNODE_BEFORE_MOUNT,
  EventLife.VNODE_MOUNTED,
  BaseEvent.ON_CLICK,
  BaseEvent.ON_DBL_CLICK,
  BaseEvent.ON_MOUSE_ENTER,
  BaseEvent.ON_MOUSE_LEAVE,
  //lọc
  'filter'
]
// Danh sách giá trị khóa chức năng chuỗi tích hợp
export const excludeParseEventValueList = [
  // Tuyên bố chức năng trong yêu cầu
  'javascript:'
]
