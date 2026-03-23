export enum ChatCategoryEnum {
  ML = 'MaterialLine',
  COMMON = 'Common',
  WEATHER = 'Weather',
  DEFAULT = 'Default' // Điều này chỉ được sử dụng để đại diện cho các thành phầnPhútthư mục lớp, đừng đặt nó vào index.ts ở giữaNhập vào (Import)
}

export enum ChatCategoryEnumName {
  ML = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_431') : 'Tên dữ liệu'),
  COMMON = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_225') : 'Phổ quát'),
  WEATHER = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_47') : 'thời tiết'),
  DEFAULT = (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_411') : 'mũi tên lên')
}
