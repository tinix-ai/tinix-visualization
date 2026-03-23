interface Window {
  $loading: any
  $message: any
  $dialog: any
  // ngôn ngữ
  $t: any
  $vue: any
  // ghi nhật ký bàn phím
  $KeyboardActive?: { [T: string]: boolean }
  onKeySpacePressHold?: Function

  // biên tập JSON đối tượng lưu trữ
  opener: any
}

declare type Recordable<T = any> = Record<string, T>
