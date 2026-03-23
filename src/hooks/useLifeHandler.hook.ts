import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { EventLife } from '@/enums/eventEnum'
import * as echarts from 'echarts'

// Tất cả các đối tượng thu thập thành phần biểu đồ
const components: { [K in string]?: any } = {}

// do dự án cung cấpnpm biến gói
export const npmPkgs = { echarts }

// Xử lý sự kiện thành phần hook
export const useLifeHandler = (chartConfig: CreateComponentType | CreateComponentGroupType) => {
  if (!chartConfig.events) return {}

  // Xử lý các sự kiện cơ bản
  const baseEvent: { [key: string]: any } = {}
  for (const key in chartConfig.events.baseEvent) {
    const fnStr: string | undefined = (chartConfig.events.baseEvent as any)[key]
    // Liên kết động các sự kiện cơ bản
    if (fnStr) {
      baseEvent[key] = generateBaseFunc(fnStr)
    }
  }

  // Tạo các sự kiện vòng đời
  const events = chartConfig.events.advancedEvents || {}
  const lifeEvents = {
    [EventLife.VNODE_BEFORE_MOUNT](e: any) {
      // thành phần lưu trữ
      components[chartConfig.id] = e.component
      const fnStr = (events[EventLife.VNODE_BEFORE_MOUNT] || '').trim()
      generateFunc(fnStr, e)
    },
    [EventLife.VNODE_MOUNTED](e: any) {
      const fnStr = (events[EventLife.VNODE_MOUNTED] || '').trim()
      generateFunc(fnStr, e)
    }
  }
  return { ...baseEvent, ...lifeEvents }
}

/**
 * Tạo các chức năng cơ bản
 * @param fnStr Mã nội dung phương thức người dùng
 * @param event sự kiện chuột
 */
 export function generateBaseFunc(fnStr: string) {
  try {
    return new Function(`
      return (
        async function(components,mouseEvent){
          ${fnStr}
        }
      )`)().bind(undefined,components)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Tạo các chức năng nâng cao
 * @param fnStr Mã nội dung phương thức người dùng
 * @param e Phiên bản thành phần động thực thi vòng đời
 */
function generateFunc(fnStr: string, e: any) {
  try {
    // npmPkgs Dễ dàng sao chép echarts Cài đặt ví dụoption củaformattervà các nội dung liên quan khác
    Function(`
      "use strict";
      return (
        async function(e, components, node_modules){
          const {${Object.keys(npmPkgs).join()}} = node_modules;
          ${fnStr}
        }
      )`)().bind(e?.component)(e, components, npmPkgs)
  } catch (error) {
    console.error(error)
  }
}
