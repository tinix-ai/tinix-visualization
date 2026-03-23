/* eslint-disable no-unused-vars */
export enum ChatCategoryEnum {
  BAR = 'Bars',
  PIE = 'Pies',
  LINE = 'Lines',
  SCATTER = 'Scatters',
  MAP = 'Maps',
  MORE = 'Mores'
}

export enum ChatCategoryEnumName {
  BAR = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_128') : 'Hơn'),
  PIE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_192') : 'biểu đồ thanh'),
  LINE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_224') : 'Biểu đồ đường'),
  SCATTER = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_137') : 'biểu đồ kết hợp'),
  MAP = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_502') : 'biểu đồ hình tròn'),
  COMBINATION = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_34') : 'Biểu đồ phân tán'),
  MORE = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_219') : 'bản đồ')
}
