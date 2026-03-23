import { RequestHttpEnum, RequestHttpIntervalEnum, RequestDataTypeEnum, SelectHttpTimeNameObj } from '@/enums/httpEnum'

// Kết quả trận đấu
export enum DataResultEnum {
  NULL = 0,
  SUCCESS = 1,
  FAILURE = 2,
}

export enum TimelineTitleEnum {
  FILTER = 'Bộ lọc / Transform',
  MAPPING = 'Ánh xạ dữ liệu',
  CONTENT = 'Dữ liệu',
}

export enum SelectCreateDataEnum {
  STATIC = 'Dữ liệu tĩnh',
  AJAX = 'Yêu cầu động',
  Pond = 'Nguồn dữ liệu',
}

export interface SelectCreateDataType {
  label: SelectCreateDataEnum
  value: RequestDataTypeEnum
  disabled?: boolean
}

// ajax Loại yêu cầu
export interface SelectHttpType {
  label: RequestHttpEnum
  value: RequestHttpEnum
  disabled?: boolean
  style?: object
}

// Tùy chọn loại
export const selectTypeOptions: SelectHttpType[] = [
  {
    label: RequestHttpEnum.GET,
    value: RequestHttpEnum.GET,
    style: {
      color: 'greenyellow',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.POST,
    value: RequestHttpEnum.POST,
    style: {
      color: 'skyblue',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.PUT,
    value: RequestHttpEnum.PUT,
    style: {
      color: 'goldenrod',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.PATCH,
    value: RequestHttpEnum.PATCH,
    style: {
      color: 'violet',
      fontWeight: 'bold'
    }
  },
  {
    label: RequestHttpEnum.DELETE,
    value: RequestHttpEnum.DELETE,
    disabled: true,
    style: {
      fontWeight: 'bold'
    }
  },
]

// ajax Khoảng thời gian yêu cầu
export interface SelectHttpTimeType {
  label: string
  value: RequestHttpIntervalEnum
  disabled?: boolean
}

// Tùy chọn thời gian
export const selectTimeOptions: SelectHttpTimeType[] = [
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.SECOND],
    value: RequestHttpIntervalEnum.SECOND
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.MINUTE],
    value: RequestHttpIntervalEnum.MINUTE
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.HOUR],
    value: RequestHttpIntervalEnum.HOUR
  },
  {
    label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.DAY],
    value: RequestHttpIntervalEnum.DAY
  },
]