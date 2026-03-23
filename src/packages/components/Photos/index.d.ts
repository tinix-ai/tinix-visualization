export enum ChatCategoryEnum {
  PRIVATE = 'Private',
  SHARE = 'Share'
}

export enum ChatCategoryEnumName {
  PRIVATE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_295') : 'Chia sẻ hình ảnh'),
  SHARE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_68') : 'Biểu đồ riêng')
}
