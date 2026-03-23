export enum ChatCategoryEnum {
  TEXT = 'Texts',
  TITLE = 'Titles',
  INPUTS = 'Inputs',
  MORE = 'Mores'
}

export enum ChatCategoryEnumName {
  TEXT = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_484') : 'lề phải'),
  TITLE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_32') : 'theo dõi chiều rộng'),
  // điều khiển => nhập dữ liệu
  INPUTS = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_48') : 'điều khiển'),
  MORE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_219') : 'bản đồ')
}