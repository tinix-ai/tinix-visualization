import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

declare type Recordable<T = any> = Record<string, T>

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface Meta {
  // tên
  title: string
  // Có bỏ qua quyền hay không
  ignoreAuth?: boolean
  permissions?: string[]
  // Có nên lưu vào bộ nhớ đệm không
  noKeepAlive?: boolean
  // Nó đã được sửa chưatabthượng đẳng
  affix?: boolean
  // tabbiểu tượng trên
  icon?: string
  // Chuyển địa chỉ
  frameSrc?: string
  // Địa chỉ nhảy liên kết bên ngoài
  externalLink?: string
  //trốn
  hidden?: boolean
}
