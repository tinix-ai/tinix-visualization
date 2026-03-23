import axiosInstance from './axios'
import {
  RequestHttpEnum,
  ContentTypeEnum,
  RequestBodyEnum,
  RequestDataTypeEnum,
  RequestContentTypeEnum,
  RequestParamsObjType
} from '@/enums/httpEnum'
import type { RequestGlobalConfigType, RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'

export const get = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.GET,
    params: params
  })
}

export const post = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.POST,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const patch = (url: string, data?: object, headersType?: string) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.PATCH,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const put = (url: string, data?: object, headersType?: ContentTypeEnum) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.PUT,
    data: data,
    headers: {
      'Content-Type': headersType || ContentTypeEnum.JSON
    }
  })
}

export const del = (url: string, params?: object) => {
  return axiosInstance({
    url: url,
    method: RequestHttpEnum.DELETE,
    params
  })
}

// Nhận chức năng yêu cầu, mặc địnhget
export const http = (type?: RequestHttpEnum) => {
  switch (type) {
    case RequestHttpEnum.GET:
      return get

    case RequestHttpEnum.POST:
      return post

    case RequestHttpEnum.PATCH:
      return patch

    case RequestHttpEnum.PUT:
      return put

    case RequestHttpEnum.DELETE:
      return del

    default:
      return get
  }
}
const prefix = 'javascript:'
// Thoát ký tự đầu vào
export const translateStr = (target: string | object) => {
  if (typeof target === 'string') {
    if (target.startsWith(prefix)) {
      const funcStr = target.split(prefix)[1]
      let result;
      try {
        result = new Function(`${funcStr}`)()
      } catch (error) {
        console.log(error)
        window['$message'].error((typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_297') : 'lỗi phân tích nội dung js!'))
      }
      return result
    } else {
      return target
    }
  }
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const subTarget = (target as any)[key];
      (target as any)[key] = translateStr(subTarget)
    }
  }
  return target
}

/**
 * * Yêu cầu tùy chỉnh
 * @param targetParams Thông số thành phần hiện tại
 * @param globalParams thông số toàn cầu
 */
export const customizeHttp = (targetParams: RequestConfigType, globalParams: RequestGlobalConfigType) => {
  if (!targetParams || !globalParams) {
    return
  }
  // tình hình chung
  const {
    // Địa chỉ nguồn yêu cầu toàn cầu
    requestOriginUrl,
    // Nội dung yêu cầu chung
    requestParams: globalRequestParams
  } = globalParams

  // thành phần mục tiêu (ưu tiên > thành phần toàn cầu)
  const {
    // Địa chỉ yêu cầu
    requestUrl,
    // bình thường / sql
    requestContentType,
    // Cách lấy dữ liệu
    requestDataType,
    // Phương thức yêu cầu get/post/del/put/patch
    requestHttpType,
    // Yêu cầu loại cơ thể none / form-data / x-www-form-urlencoded / json /xml
    requestParamsBodyType,
    // SQL đối tượng yêu cầu
    requestSQLContent,
    // Yêu cầu nội dung params / cookie / header / body: như nhau requestParamsBodyType
    requestParams: targetRequestParams
  } = targetParams

  // loại trừ tĩnh
  if (requestDataType === RequestDataTypeEnum.STATIC) return

  if (!requestUrl) {
    return
  }

  // tiêu đề xử lý
  let headers: RequestParamsObjType = {
    ...globalRequestParams.Header,
    ...targetRequestParams.Header
  }
  headers = translateStr(headers)

  // data tham số
  let data: RequestParamsObjType | FormData | string = {}
  // params tham số
  let params: RequestParamsObjType = { ...targetRequestParams.Params }
  params = translateStr(params)
  // form Xử lý kiểu
  let formData: FormData = new FormData()
  // Xử lý kiểu

  switch (requestParamsBodyType) {
    case RequestBodyEnum.NONE:
      break

    case RequestBodyEnum.JSON:
      headers['Content-Type'] = ContentTypeEnum.JSON
      //jsonCác đối tượng cũng có thể được sử dụng'javasctipt:'để ghép các thông số một cách linh hoạt
      data = translateStr(targetRequestParams.Body['json'])
      if(typeof data === 'string')  data = JSON.parse(data)
      // json được giao cho data
      break

    case RequestBodyEnum.XML:
      headers['Content-Type'] = ContentTypeEnum.XML
      // xml Chuỗi được gán cho data
      data = translateStr(targetRequestParams.Body['xml'])
      break

    case RequestBodyEnum.X_WWW_FORM_URLENCODED: {
      headers['Content-Type'] = ContentTypeEnum.FORM_URLENCODED
      const bodyFormData = targetRequestParams.Body['x-www-form-urlencoded']
      for (const i in bodyFormData) formData.set(i, translateStr(bodyFormData[i]))
      // FormData được giao cho data
      data = formData
      break
    }

    case RequestBodyEnum.FORM_DATA: {
      headers['Content-Type'] = ContentTypeEnum.FORM_DATA
      const bodyFormUrlencoded = targetRequestParams.Body['form-data']
      for (const i in bodyFormUrlencoded) {
        formData.set(i, translateStr(bodyFormUrlencoded[i]))
      }
      // FormData được giao cho data
      data = formData
      break
    }
  }

  // sql đối phó với
  if (requestContentType === RequestContentTypeEnum.SQL) {
    headers['Content-Type'] = ContentTypeEnum.JSON
    data = requestSQLContent
  }

  try {
    const url =  (new Function("return `" + `${requestOriginUrl}${requestUrl}`.trim() + "`"))();
    return axiosInstance({
        url,
        method: requestHttpType,
        data,
        params,
        headers
    })
  } catch (error) {
    console.log(error)
    window['$message'].error((typeof window !== 'undefined' && window['$t'] ? window['$t']('phase7.auto_21') : 'Định dạng địa chỉ URL không chính xác!'))
  }
}
