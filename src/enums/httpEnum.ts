/**
 * @description: Yêu cầu tập kết quả
 */
export enum ResultEnum {
  DATA_SUCCESS = 0,
  SUCCESS = 200,
  SERVER_ERROR = 500,
  SERVER_FORBIDDEN = 403,
  NOT_FOUND = 404,
  TIMEOUT = 60000
}

// Dữ liệu liên quan
export enum RequestDataTypeEnum {
  // dữ liệu tĩnh
  STATIC = 0,
  // Yêu cầu dữ liệu
  AJAX = 1,
  // nhóm dữ liệu
  Pond = 2
}

// Yêu cầu loại cơ thể
export enum RequestContentTypeEnum {
  // Yêu cầu thông thường
  DEFAULT = 0,
  // SQLhỏi
  SQL = 1
}

/**
 * @description: Phương thức yêu cầu
 */
export enum RequestHttpEnum {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete'
}

/**
 * @description: Khoảng thời gian yêu cầu
 */
export enum RequestHttpIntervalEnum {
  // Thứ hai
  SECOND = 'second',
  // điểm
  MINUTE = 'minute',
  // giờ
  HOUR = 'hour',
  // bầu trời
  DAY = 'day'
}

/**
 * @description: Tên khoảng thời gian yêu cầu
 */
export const SelectHttpTimeNameObj = {
  [RequestHttpIntervalEnum.SECOND]: 'Second',
  [RequestHttpIntervalEnum.MINUTE]: 'Minute',
  [RequestHttpIntervalEnum.HOUR]: 'Hour',
  [RequestHttpIntervalEnum.DAY]: 'Day'
}

/**
 * @description: Loại tiêu đề yêu cầu
 */
export enum RequestBodyEnum {
  NONE = 'none',
  FORM_DATA = 'form-data',
  X_WWW_FORM_URLENCODED = 'x-www-form-urlencoded',
  JSON = 'json',
  XML = 'xml'
}

/**
 * @description: Mảng loại tiêu đề yêu cầu
 */
export const RequestBodyEnumList = [
  RequestBodyEnum.NONE,
  RequestBodyEnum.FORM_DATA,
  RequestBodyEnum.X_WWW_FORM_URLENCODED,
  RequestBodyEnum.JSON,
  RequestBodyEnum.XML
]

/**
 * @description: Loại tham số yêu cầu
 */
export enum RequestParamsTypeEnum {
  PARAMS = 'Params',
  BODY = 'Body',
  HEADER = 'Header',
}

/**
 * @description: Nội dung thông số yêu cầu
 */
export type RequestParamsObjType = {
  [T: string]: string
}
export type RequestParams = {
  [RequestParamsTypeEnum.PARAMS]: RequestParamsObjType
  [RequestParamsTypeEnum.HEADER]: RequestParamsObjType
  [RequestParamsTypeEnum.BODY]: {
    [RequestBodyEnum.FORM_DATA]: RequestParamsObjType
    [RequestBodyEnum.X_WWW_FORM_URLENCODED]: RequestParamsObjType
    [RequestBodyEnum.JSON]: string
    [RequestBodyEnum.XML]: string
  }
}

/**
 * @description:  Thường được sử dụngcontentTypkiểu
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // text
  TEXT = 'text/plain;charset=UTF-8',
  // xml
  XML = 'application/xml;charset=UTF-8',
  // application/x-www-form-urlencoded Hợp tác chungqs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  tải lên
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
