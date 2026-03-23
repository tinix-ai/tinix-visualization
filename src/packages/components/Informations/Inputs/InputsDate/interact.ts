import { InteractEventOn, InteractActionsType } from '@/enums/eventEnum'

// Loại thành phần thời gian
export enum ComponentInteractEventEnum {
  DATE = 'date',
  DATE_TIME = 'datetime',
  DATE_RANGE = 'daterange',
  DATE_TIME_RANGE = 'datetimerange',
  MONTH = 'month',
  MONTH_RANGE = 'monthrange',
  YEAR = 'year',
  YEAR_RANGE = 'yearrange',
  QUARTER = 'quarter',
  QUARTER_RANGE = 'quarterrange'
}

// Thông số liên kết
export enum ComponentInteractParamsEnum {
  DATE = 'date',
  DATE_START = 'dateStart',
  DATE_END = 'dateEnd',
  DATE_RANGE = 'daterange'
}

export enum DefaultTypeEnum {
  NONE = "none",
  STATIC = "static",
  DYNAMIC = "dynamic"
}

export enum DifferUnitEnum {
  DAY = 'd',
  WEEK = 'w',
  MONTH = 'M',
  QUARTER = 'Q',
  YEAR = 'y',
  HOUR = 'h',
  MINUTE = 'm',
  SECOND = 's',
  MILLISECOND = 'ms',
}

export const DifferUnitObject = {
  // https://day.js.org/docs/en/manipulate/add
  [DifferUnitEnum.DAY]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_520') : 'giờ'),
  [DifferUnitEnum.WEEK]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_270') : 'Giờ'),
  [DifferUnitEnum.MONTH]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_476') : 'phút'),
  [DifferUnitEnum.QUARTER]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_51') : 'Đơn vị bù giá trị bắt đầu'),
  [DifferUnitEnum.YEAR]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_135') : 'mặt trăng'),
  [DifferUnitEnum.HOUR]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_488') : 'thời gian bắt đầu'),
  [DifferUnitEnum.MINUTE]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_479') : 'tuần'),
  [DifferUnitEnum.SECOND]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_18') : 'điểm'),
  [DifferUnitEnum.MILLISECOND]: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_103') : 'Năm'),
}

const time = [
  {
    value: ComponentInteractParamsEnum.DATE,
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_448') : 'Hiển thị thả xuống')
  }
]

const timeRange = [
  {
    value: ComponentInteractParamsEnum.DATE_START,
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_2') : 'Chọn Xong')
  },
  {
    value: ComponentInteractParamsEnum.DATE_END,
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_404') : 'thời gian kết thúc')
  },
  {
    value: ComponentInteractParamsEnum.DATE_RANGE,
    label: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_252') : 'phạm vi hàng quý')
  }
]

// Xác định các thành phần để kích hoạt sự kiện gọi lại
export const interactActions: InteractActionsType[] = [
  {
    interactType: InteractEventOn.CHANGE,
    interactName: (typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_280') : 'mili giây'),
    componentEmitEvents: {
      [ComponentInteractEventEnum.DATE]: time,
      [ComponentInteractEventEnum.DATE_TIME]: time,
      [ComponentInteractEventEnum.DATE_RANGE]: timeRange,
      [ComponentInteractEventEnum.MONTH]: time,
      [ComponentInteractEventEnum.MONTH_RANGE]: timeRange,
      [ComponentInteractEventEnum.QUARTER]: time,
      [ComponentInteractEventEnum.QUARTER_RANGE]: timeRange,
      [ComponentInteractEventEnum.YEAR]: time,
      [ComponentInteractEventEnum.YEAR_RANGE]: timeRange,
    }
  }
]
