import { defineStore } from 'pinia'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { EditCanvasType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { loadingStart, loadingFinish, loadingError } from '@/utils'
import { editHistoryMax } from '@/settings/designSetting'
import {
  HistoryStackItemEnum,
  HistoryActionTypeEnum,
  HistoryTargetTypeEnum,
  HistoryItemType,
  ChartHistoryStoreType
} from './chartHistoryStore.d'

export const useChartHistoryStore = defineStore({
  id: 'useChartHistoryStore',
  state: (): ChartHistoryStoreType => ({
    // Ngăn xếp lùi
    backStack: [],
    // ngăn xếp nâng cao
    forwardStack: []
  }),
  getters: {
    getBackStack(): Array<HistoryItemType> {
      return this.backStack
    },
    getForwardStack(): Array<HistoryItemType> {
      return this.forwardStack
    }
  },
  actions: {
    /**
     * * Thêm bản ghi mới và chèn vào ngăn xếp
     * @param item Ví dụ về biểu đồ
     * @param actionType kiểu hành động
     * @param targetType Loại đối tượng (biểu đồ mặc định)
     */
    createStackItem(
      item: CreateComponentType[] | CreateComponentGroupType[] | EditCanvasType[],
      actionType: HistoryActionTypeEnum,
      targetType: HistoryTargetTypeEnum = HistoryTargetTypeEnum.CHART
    ) {
      // Tối ưu hóa hiệu suất vào freeze
      this.pushBackStackItem(
        Object.freeze({
          [HistoryStackItemEnum.ID]: new Date().getTime().toString(),
          [HistoryStackItemEnum.HISTORY_DATA]: item,
          [HistoryStackItemEnum.ACTION_TYPE]: actionType,
          [HistoryStackItemEnum.TARGET_TYPE]: targetType
        } as const)
      )
    },
    // * Khởi tạo canvas
    canvasInit(canvas: EditCanvasType) {
      this.createStackItem([canvas], HistoryActionTypeEnum.ADD, HistoryTargetTypeEnum.CANVAS)
    },
    // * đẩy lùi ngăn xếp
    pushBackStackItem(item: HistoryItemType | Array<HistoryItemType>, notClear = false): void {
      if (item instanceof Array) this.backStack = [...this.backStack, ...item]
      else this.backStack.push(item)
      this.backStack.splice(0, this.backStack.length - editHistoryMax)
      // Các hành động mới cần xóa ngăn xếp chuyển tiếp
      if (notClear) return
      this.clearForwardStack()
    },
    // * đẩy ngăn xếp về phía trước
    pushForwardStack(item: HistoryItemType | Array<HistoryItemType>): void {
      if (item instanceof Array) this.forwardStack = [...this.forwardStack, ...item]
      else this.forwardStack.push(item)
    },
    // * Xóa khỏi ngăn xếp phía sau
    popBackStackItem(): HistoryItemType | undefined {
      if (this.backStack.length > 0) {
        return this.backStack.pop()
      }
    },
    // * Di chuyển ra khỏi ngăn xếp phía trước
    popForwardStack(): HistoryItemType | undefined {
      if (this.forwardStack.length > 0) {
        return this.forwardStack.pop()
      }
    },
    // * Xóa ngăn xếp chuyển tiếp
    clearForwardStack() {
      this.forwardStack = []
    },
    // * Xóa ngăn xếp phía sau(giữ lại khởi tạo)
    clearBackStack() {
      const canvasHistory = this.getBackStack[0]
      this.backStack = [canvasHistory]
    },
    // * rút
    backAction() {
      try {
        loadingStart()
        // Loại trừ việc khởi tạo canvas
        if (this.getBackStack.length > 1) {
          const targetData = this.popBackStackItem()
          if (!targetData) {
            loadingFinish()
            return
          }
          // Xóa bản ghi để chuyển tiếp heap
          this.pushForwardStack(targetData)
          loadingFinish()
          return targetData
        }
        loadingFinish()
      } catch (error) {
        loadingError()
      }
    },
    // * tiếp tục đi
    forwardAction() {
      try {
        loadingStart()
        if (this.getForwardStack.length) {
          const targetData = this.popForwardStack()
          if (!targetData) {
            loadingFinish()
            return
          }
          // đặt vào ngăn xếp phía sau
          this.pushBackStackItem(targetData, true)
          loadingFinish()
          return targetData
        }
        loadingFinish()
      } catch (error) {
        loadingError()
      }
    },
    // * Thêm bản ghi thành phần
    createAddHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.ADD, HistoryTargetTypeEnum.CHART)
    },
    // * Cập nhật bản ghi thuộc tính (kích thước, thuộc tính biểu đồ)
    createUpdateHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.UPDATE, HistoryTargetTypeEnum.CHART)
    },
    // * Xóa bản ghi thành phần
    createDeleteHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.DELETE, HistoryTargetTypeEnum.CHART)
    },
    // * Bản ghi thành phần di động
    createMoveHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.MOVE, HistoryTargetTypeEnum.CHART)
    },
    // * Thay đổi bản ghi thành phần phân cấp
    createLayerHistory(
      item: Array<CreateComponentType | CreateComponentGroupType>,
      type:
        | HistoryActionTypeEnum.TOP
        | HistoryActionTypeEnum.DOWN
        | HistoryActionTypeEnum.UP
        | HistoryActionTypeEnum.BOTTOM
    ) {
      this.createStackItem(item, type, HistoryTargetTypeEnum.CHART)
    },
    // * Cắt bản ghi thành phần
    createPasteHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.CUT, HistoryTargetTypeEnum.CHART)
    },
    // * Tạo nhóm
    createGroupHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.GROUP, HistoryTargetTypeEnum.CHART)
    },
    // * Tách nhóm
    createUnGroupHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.UN_GROUP, HistoryTargetTypeEnum.CHART)
    },
    // * Khóa bản ghi
    createLockHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.LOCK, HistoryTargetTypeEnum.CHART)
    },
    // * Mở khóa hồ sơ
    createUnLockHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.UNLOCK, HistoryTargetTypeEnum.CHART)
    },
    // * Ẩn bản ghi
    createHideHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.HIDE, HistoryTargetTypeEnum.CHART)
    },
    // * Hiển thị bản ghi
    createShowHistory(item: Array<CreateComponentType | CreateComponentGroupType>) {
      this.createStackItem(item, HistoryActionTypeEnum.SHOW, HistoryTargetTypeEnum.CHART)
    }
  }
})
