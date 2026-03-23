import { getUUID } from '@/utils'
import { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { groupTitle } from '@/settings/designSetting'
import { BaseEvent, EventLife } from '@/enums/eventEnum'
import {
  RequestHttpEnum,
  RequestDataTypeEnum,
  RequestHttpIntervalEnum,
  RequestContentTypeEnum,
  RequestBodyEnum
} from '@/enums/httpEnum'
import {
  ChartFrameEnum,
  PublicConfigType,
  CreateComponentType,
  CreateComponentGroupType
} from '@/packages/index.d'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'

// Yêu cầu thuộc tính cơ bản
export const requestConfig: RequestConfigType = {
  requestDataType: RequestDataTypeEnum.STATIC,
  requestHttpType: RequestHttpEnum.GET,
  requestUrl: '',
  requestInterval: undefined,
  requestIntervalUnit: RequestHttpIntervalEnum.SECOND,
  requestContentType: RequestContentTypeEnum.DEFAULT,
  requestParamsBodyType: RequestBodyEnum.NONE,
  requestSQLContent: {
    sql: 'select * from  where'
  },
  requestParams: {
    Body: {
      'form-data': {},
      'x-www-form-urlencoded': {},
      json: '',
      xml: ''
    },
    Header: {},
    Params: {}
  }
}

// lớp cá thể đơn
export class PublicConfigClass implements PublicConfigType {
  public id = getUUID()
  public isGroup = false
  // Thông tin cơ bản
  public attr = { ...chartInitConfig, zIndex: -1 }
  // phong cách cơ bản
  public styles = {
    // sử dụngBộ Lọc
    filterShow: false,
    // Huế
    hueRotate: 0,
    // bão hòa
    saturate: 1,
    // Sự tương phản
    contrast: 1,
    // độ sáng
    brightness: 1,
    // trong suốt
    opacity: 1,

    // quay
    rotateZ: 0,
    rotateX: 0,
    rotateY: 0,

    // nghiêng
    skewX: 0,
    skewY: 0,

    // chế độ hòa trộn
    blendMode: 'normal',

    // hoạt hình
    animations: []
  }
  // Xem trước
  public preview = {
    overFlowHidden: false
  }
  // tình trạng
  public status = {
    lock: false,
    hide: false
  }
  // hỏi
  public request = cloneDeep(requestConfig)
  // Lọc dữ liệu
  public filter = undefined
  // sự kiện
  public events = {
    baseEvent: {
      [BaseEvent.ON_CLICK]: undefined,
      [BaseEvent.ON_DBL_CLICK]: undefined,
      [BaseEvent.ON_MOUSE_ENTER]: undefined,
      [BaseEvent.ON_MOUSE_LEAVE]: undefined
    },
    advancedEvents: {
      [EventLife.VNODE_MOUNTED]: undefined,
      [EventLife.VNODE_BEFORE_MOUNT]: undefined
    },
    interactEvents: []
  }
}

// Lớp nhóm nhiều lựa chọn
export class PublicGroupConfigClass extends PublicConfigClass implements CreateComponentGroupType {
  // theo nhóm
  public isGroup = true
  // tên
  public chartConfig = {
    key: 'group',
    chartKey: 'group',
    conKey: 'group',
    category: 'group',
    categoryName: 'group',
    package: 'group',
    chartFrame: ChartFrameEnum.COMMON,
    title: groupTitle,
    image: ''
  }
  // Danh sách thành viên nhóm
  public groupList: Array<CreateComponentType> = []
  // ---- nguyên bản ---
  // key
  public key = 'group'
  // Cấu hình
  public option = {}
  // biểu tượng
  public id = getUUID()
  // Thông tin cơ bản
  public attr = { w: 0, h: 0, x: 0, y: 0, offsetX: 0, offsetY: 0, zIndex: -1 }
}
