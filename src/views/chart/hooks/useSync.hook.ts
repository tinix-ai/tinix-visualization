import { getUUID } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { ChartEditStoreEnum, ChartEditStorage } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import { fetchChartComponent, fetchConfigComponent, createComponent } from '@/packages/index'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { BaseEvent, EventLife } from '@/enums/eventEnum'
import { PublicGroupConfigClass } from '@/packages/public/publicConfig'
import merge from 'lodash/merge'

/**
 * * vải vẽ-Nâng cấp phiên bản không tương thích với các bản vá dữ liệu cũ
 * @param object
 */
const canvasVersionUpdatePolyfill = (object: any) => {
  return object
}

/**
 * * thành phần-Nâng cấp phiên bản không tương thích với các bản vá dữ liệu cũ
 * @param newObject
 * @param sources
 */
const componentVersionUpdatePolyfill = (newObject: any, sources: any) => {
  try {
    // Xác định xem nó có phải là một thành phần
    if (sources.id) {
      // Xử lý các bản vá sự kiện
      const hasVnodeBeforeMount = 'vnodeBeforeMount' in sources.events
      const hasVnodeMounted = 'vnodeMounted' in sources.events

      if (hasVnodeBeforeMount) {
        newObject.events.advancedEvents.vnodeBeforeMount = sources?.events.vnodeBeforeMount
      }
      if (hasVnodeMounted) {
        newObject.events.advancedEvents.vnodeMounted = sources?.events.vnodeMounted
      }
      if (hasVnodeBeforeMount || hasVnodeMounted) {
        sources.events = {
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
      return newObject
    }
  } catch (error) {
    return newObject
  }
}

/**
 * * Hợp nhất xử lý
 * @param newObject dữ liệu mẫu mới
 * @param sources Dữ liệu mới thu được
 * @returns object
 */
const componentMerge = (newObject: any, sources: any, notComponent = false) => {
  // Xử lý các bản vá thành phần
  componentVersionUpdatePolyfill(newObject, sources)

  // Các thành phần không được xử lý
  if (notComponent) return merge(newObject, sources)
  // Loại trừ thành phần newObject
  const option = sources.option
  if (!option) return merge(newObject, sources)

  // Merge options to preserve defaults, but replace dataset entirely
  const { dataset, ...restOption } = option
  merge(newObject.option, restOption)
  if (dataset !== undefined) {
    newObject.option.dataset = dataset
  }
  
  // Clear option from sources to avoid double merging or overwriting in the final merge
  sources.option = undefined
  
  return merge(newObject, sources)
}

// Yêu cầu xử lý
export const useSync = () => {
  const chartEditStore = useChartEditStore()
  const chartHistoryStore = useChartHistoryStore()
  const chartLayoutStore = useChartLayoutStore()
  /**
   * * Đăng ký động thành phần
   * @param projectData dữ liệu dự án
   * @param isReplace Có nên thay thế dữ liệu
   * @returns
   */
  const updateComponent = async (projectData: ChartEditStorage, isReplace = false, changeId = false) => {
    try {
      if (isReplace) {
      // danh sách rõ ràng
      chartEditStore.componentList = []
      // xóa lịch sử
      chartHistoryStore.clearBackStack()
      chartHistoryStore.clearForwardStack()
    }
    // Xử lý bản vá canvas
    projectData.editCanvasConfig = canvasVersionUpdatePolyfill(projectData.editCanvasConfig)

    // Danh sách đăng ký thành phần
    const componentList = projectData.componentList || []
    for (const e of componentList) {
      const intComponent = (target: CreateComponentType) => {
        if (!window['$vue'].component(target.chartConfig.chartKey)) {
          window['$vue'].component(target.chartConfig.chartKey, fetchChartComponent(target.chartConfig))
          window['$vue'].component(target.chartConfig.conKey, fetchConfigComponent(target.chartConfig))
        }
      }

      if (e.isGroup) {
        (e as CreateComponentGroupType).groupList.forEach(groupItem => {
          intComponent(groupItem)
        })
      } else {
        intComponent(e as CreateComponentType)
      }
    }

    // Tạo chức năng-Giải trí là để giải quyết vấn đề các phương thức lớp biến mất
    const create = async (
      _componentInstance: CreateComponentType,
      callBack?: (componentInstance: CreateComponentType) => void
    ) => {
      // Bổ sung class phương pháp trên
      let newComponent: CreateComponentType = await createComponent(_componentInstance.chartConfig)
      if (_componentInstance.chartConfig.redirectComponent) {
        _componentInstance.chartConfig.dataset && (newComponent.option.dataset = _componentInstance.chartConfig.dataset)
        newComponent.chartConfig.title = _componentInstance.chartConfig.title
        newComponent.chartConfig.chartFrame = _componentInstance.chartConfig.chartFrame
      }
      if (callBack) {
        if (changeId) {
          callBack(componentMerge(newComponent, { ..._componentInstance, id: getUUID() }))
        } else {
          callBack(componentMerge(newComponent, _componentInstance))
        }
      } else {
        if (changeId) {
          chartEditStore.addComponentList(
            componentMerge(newComponent, { ..._componentInstance, id: getUUID() }),
            false,
            true
          )
        } else {
          chartEditStore.addComponentList(componentMerge(newComponent, _componentInstance), false, true)
        }
      }
    }

    // gán dữ liệu
    for (const key in projectData) {
      // thành phần
      if (key === ChartEditStoreEnum.COMPONENT_LIST) {
        let loadIndex = 0
        const listLength = projectData[key].length
        for (const comItem of projectData[key]) {
          // Đặt số lượng tải
          let percentage = parseInt((parseFloat(`${++loadIndex / listLength}`) * 100).toString())
          chartLayoutStore.setItemUnHandle(ChartLayoutStoreEnum.PERCENTAGE, percentage)
          // Loại phán quyết
          if (comItem.isGroup) {
            // Tạo nhóm
            let groupClass = new PublicGroupConfigClass()
            if (changeId) {
              groupClass = componentMerge(groupClass, { ...comItem, id: getUUID() })
            } else {
              groupClass = componentMerge(groupClass, comItem)
            }

            // Đăng ký không đồng bộ các ứng dụng phụ
            const targetList: CreateComponentType[] = []
            for (const groupItem of (comItem as CreateComponentGroupType).groupList) {
              await create(groupItem, e => {
                targetList.push(e)
              })
            }
            groupClass.groupList = targetList

            // Chèn nhóm vào danh sách
            chartEditStore.addComponentList(groupClass as unknown as CreateComponentGroupType, false, true)
          } else {
            await create(comItem as CreateComponentType)
          }
          if (percentage === 100) {
            // xóa lịch sử
            chartHistoryStore.clearBackStack()
            chartHistoryStore.clearForwardStack()
          }
        }
      } else if (key === ChartEditStoreEnum.EDIT_CANVAS_CONFIG || key === ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG) {
        componentMerge(chartEditStore[key], projectData[key], true)
      }
    }

    // Số lượng rõ ràng (Clear percentage to hide loading)
    chartLayoutStore.setItemUnHandle(ChartLayoutStoreEnum.PERCENTAGE, 0)
    } catch (error) {
      console.error('TiniX Error: updateComponent failed:', error)
    }
  }

  return {
    updateComponent
  }
}
