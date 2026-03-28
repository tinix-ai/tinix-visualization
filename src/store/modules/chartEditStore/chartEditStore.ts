import { toRaw } from 'vue'
import { defineStore } from 'pinia'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { PublicGroupConfigClass } from '@/packages/public/publicConfig'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import { defaultTheme, globalThemeJson } from '@/settings/chartThemes/index'
import { requestInterval, previewScaleType, requestIntervalUnit } from '@/settings/designSetting'
// kỷ lục kỷ lục
import { useChartHistoryStore } from '@/store/modules/chartHistoryStore/chartHistoryStore'
// Cài đặt chung
import { useSettingStore } from '@/store/modules/settingStore/settingStore'
import {
  HistoryActionTypeEnum,
  HistoryItemType,
  HistoryTargetTypeEnum
} from '@/store/modules/chartHistoryStore/chartHistoryStore.d'
import { MenuEnum } from '@/enums/editPageEnum'
import { getUUID, loadingStart, loadingFinish, loadingError, isString, isArray } from '@/utils'
import {
  ChartEditStoreEnum,
  ChartEditStorage,
  ChartEditStoreType,
  EditCanvasType,
  MousePositionType,
  TargetChartType,
  RecordChartType,
  RequestGlobalConfigType,
  EditCanvasConfigType
} from './chartEditStore.d'

const chartHistoryStore = useChartHistoryStore()
const settingStore = useSettingStore()

// Chỉnh sửa nội dung khu vực
export const useChartEditStore = defineStore({
  id: 'useChartEditStore',
  state: (): ChartEditStoreType => ({
    // Thuộc tính canvas
    editCanvas: {
      // Chỉnh sửa khu vực Dom
      editLayoutDom: null,
      editContentDom: null,
      // bù lại
      offset: 20,
      // Điều khiển hệ thống mở rộng quy mô
      scale: 1,
      // Thu phóng do người dùng kiểm soát
      userScale: 1,
      // Khóa thu phóng
      lockScale: false,
      // khởi tạo
      isCreate: false,
      // Kéo
      isDrag: false,
      // hộp đã chọn
      isSelect: false,
      // Chỉnh sửa mã
      isCodeEdit: false
    },
    // menu chuột phải
    rightMenuShow: false,
    // Định vị chuột
    mousePosition: {
      startX: 0,
      startY: 0,
      x: 0,
      y: 0
    },
    // biểu đồ mục tiêu
    targetChart: {
      hoverId: undefined,
      selectId: []
    },
    // Ghi lại dữ liệu tạm thời (bản sao, v.v.)
    recordChart: undefined,
    // -----------------------
    // Thuộc tính canvas (cần được lưu trữ trong phần phụ trợ)
    editCanvasConfig: {
      // Tên dự án
      projectName: undefined,
      // chiều rộng mặc định
      width: 1920,
      // Chiều cao mặc định
      height: 1080,
      // Bật bộ lọc
      filterShow: false,
      // Huế
      hueRotate: 0,
      // bão hòa
      saturate: 1,
      // Sự tương phản
      contrast: 1,
      // độ sáng
      brightness: 1,
      // minh bạch
      opacity: 1,
      // Chuyển đổi (chưa thay đổi)
      rotateZ: 0,
      rotateX: 0,
      rotateY: 0,
      skewX: 0,
      skewY: 0,
      // chế độ hòa trộn
      blendMode: 'normal',
      // Màu nền mặc định
      background: undefined,
      backgroundImage: undefined,
      // Có nên sử dụng màu tinh khiết
      selectColor: true,
      // chart màu chủ đề
      chartThemeColor: defaultTheme || 'dark',
      // Danh sách màu tùy chỉnh
      chartCustomThemeColorInfo: undefined,
      // Cấu hình toàn cầu
      chartThemeSetting: globalThemeJson,
      // vChart chủ đề
      vChartThemeName: 'vScreenVolcanoBlue',
      // Phương pháp thích ứng
      previewScaleType: previewScaleType
    },
    // Xử lý yêu cầu dữ liệu (cần được lưu trữ trong phần phụ trợ)
    requestGlobalConfig: {
      requestDataPond: [],
      requestOriginUrl: '',
      requestInterval: requestInterval,
      requestIntervalUnit: requestIntervalUnit,
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
    },
    // Mảng biểu đồ (cần được lưu trữ trong phần phụ trợ)
    componentList: []
  }),
  getters: {
    getMousePosition(): MousePositionType {
      return this.mousePosition
    },
    getRightMenuShow(): boolean {
      return this.rightMenuShow
    },
    getEditCanvas(): EditCanvasType {
      return this.editCanvas
    },
    getEditCanvasConfig(): EditCanvasConfigType {
      return this.editCanvasConfig
    },
    getTargetChart(): TargetChartType {
      return this.targetChart
    },
    getRecordChart(): RecordChartType | undefined {
      return this.recordChart
    },
    getRequestGlobalConfig(): RequestGlobalConfigType {
      return this.requestGlobalConfig
    },
    getComponentList(): Array<CreateComponentType | CreateComponentGroupType> {
      return this.componentList
    }
  },
  actions: {
    // * Lấy các mục dữ liệu cần lưu trữ
    getStorageInfo(): ChartEditStorage {
      return {
        [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: this.getEditCanvasConfig,
        [ChartEditStoreEnum.COMPONENT_LIST]: this.getComponentList,
        [ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG]: this.getRequestGlobalConfig
      }
    },
    // * Nhận mục tiêu componentList sắp xếp selectId
    getSelectIdSortList(ids?: string[]): string[] {
      if (!this.getTargetChart.selectId.length && !ids) return []
      const sortArr: string[] = []
      this.getComponentList.forEach((item: CreateComponentType | CreateComponentGroupType) => {
        if (ids) {
          ids.forEach((id: string) => {
            if (item.id === id) {
              sortArr.push(id)
            }
          })
        } else {
          this.getTargetChart.selectId.forEach((id: string) => {
            if (item.id === id) {
              sortArr.push(id)
            }
          })
        }
      })
      return sortArr
    },
    // * cài đặt editCanvas mục dữ liệu
    setEditCanvas<T extends keyof EditCanvasType, K extends EditCanvasType[T]>(key: T, value: K) {
      this.editCanvas[key] = value
    },
    // * cài đặt editCanvasConfig(cần lưu phụ trợ) mục dữ liệu
    setEditCanvasConfig<T extends keyof EditCanvasConfigType, K extends EditCanvasConfigType[T]>(key: T, value: K) {
      this.editCanvasConfig[key] = value
    },
    // * Đặt menu chuột phải
    setRightMenuShow(value: boolean) {
      this.rightMenuShow = value
    },
    // * Đặt dữ liệu mục tiêu hover
    setTargetHoverChart(hoverId?: TargetChartType['hoverId']) {
      this.targetChart.hoverId = hoverId
    },
    // * Đặt dữ liệu mục tiêu select
    setTargetSelectChart(selectId?: string | string[], push: boolean = false) {
      // Lựa chọn lặp lại
      if (this.targetChart.selectId.find((e: string) => e === selectId)) return

      // không có id Thông thoáng
      if (!selectId) {
        this.targetChart.selectId = []
        return
      }
      // Nhiều lựa chọn
      if (push) {
        // sợi dây
        if (isString(selectId)) {
          this.targetChart.selectId.push(selectId)
          return
        }
        // mảng
        if (isArray(selectId)) {
          this.targetChart.selectId.push(...selectId)
          return
        }
      } else {
        // sợi dây
        if (isString(selectId)) {
          this.targetChart.selectId = [selectId]
          return
        }
        // mảng
        if (isArray(selectId)) {
          this.targetChart.selectId = selectId
          return
        }
      }
    },
    // * Thiết lập dữ liệu ghi nhật ký
    setRecordChart(item: RecordChartType | undefined) {
      this.recordChart = cloneDeep(item)
    },
    // * Đặt vị trí chuột
    setMousePosition(x?: number, y?: number, startX?: number, startY?: number): void {
      if (x) this.mousePosition.x = x
      if (y) this.mousePosition.y = y
      if (startX) this.mousePosition.startX = startX
      if (startY) this.mousePosition.startY = startY
    },
    // * tìm mục tiêu id Vị trí chỉ số dưới của dữ liệu,idCó thể là mảng cha hoặc mảng tập hợp con (trả về nếu không có-1）
    fetchTargetIndex(id?: string): number {
      const targetId = id || (this.getTargetChart.selectId.length && this.getTargetChart.selectId[0]) || undefined
      if (!targetId) {
        loadingFinish()
        return -1
      }
      const targetIndex = this.componentList.findIndex(e => e.id === targetId)

      // hiện hành
      if (targetIndex !== -1) {
        return targetIndex
      } else {
        const length = this.getComponentList.length
        for (let i = 0; i < length; i++) {
          if (this.getComponentList[i].isGroup) {
            for (const cItem of (this.getComponentList[i] as CreateComponentGroupType).groupList) {
              if (cItem.id === targetId) {
                return i
              }
            }
          }
        }
      }
      return -1
    },
    // * Xử lý định dạng thống nhất của các tham số đầu vào id
    idPreFormat(id?: string | string[]) {
      const idArr = []
      if (!id) {
        idArr.push(...this.getTargetChart.selectId)
        return idArr
      }
      if (isString(id)) idArr.push(id)
      if (isArray(id)) idArr.push(...id)
      return idArr
    },
    /**
     * * Thêm danh sách thành phần mới
     * @param componentInstance Ví dụ biểu đồ mới
     * @param isHead Cho dù đầu được đưa vào
     * @param isHistory Có nên ghi lại không
     * @returns
     */
    addComponentList(
      componentInstance:
        | CreateComponentType
        | CreateComponentGroupType
        | Array<CreateComponentType | CreateComponentGroupType>,
      isHead = false,
      isHistory = false
    ): void {
      if (componentInstance instanceof Array) {
        componentInstance.forEach(item => {
          this.addComponentList(item, isHead, isHistory)
        })
        return
      }
      if (isHistory) {
        chartHistoryStore.createAddHistory([componentInstance])
      }
      if (isHead) {
        this.componentList.unshift(componentInstance)
      } else {
        this.componentList.push(componentInstance)
      }
    },
    // * Xóa thành phần
    removeComponentList(id?: string | string[], isHistory = true): void {
      try {
        const idArr = this.idPreFormat(id)
        const history: Array<CreateComponentType | CreateComponentGroupType> = []
        // Lặp lại qua tất cả các đối tượng
        if (!idArr.length) return

        loadingStart()
        idArr.forEach(ids => {
          const index = this.fetchTargetIndex(ids)
          if (index !== -1) {
            history.push(this.getComponentList[index])
            this.componentList.splice(index, 1)
          }
        })
        isHistory && chartHistoryStore.createDeleteHistory(history)
        loadingFinish()
        return
      } catch (value) {
        loadingError()
      }
    },
    // * Đặt lại vị trí thành phần
    resetComponentPosition(item: CreateComponentType | CreateComponentGroupType, isForward: boolean): void {
      const index = this.fetchTargetIndex(item.id)
      if (index > -1) {
        const componentInstance = this.getComponentList[index]
        if (isForward) {
          componentInstance.attr = Object.assign(componentInstance.attr, {
            x: item.attr.x + item.attr.offsetX,
            y: item.attr.y + item.attr.offsetY
          })
        } else {
          componentInstance.attr = Object.assign(componentInstance.attr, {
            x: item.attr.x,
            y: item.attr.y
          })
        }
      }
    },
    // * Linh kiện di động
    moveComponentList(item: Array<CreateComponentType | CreateComponentGroupType>) {
      chartHistoryStore.createMoveHistory(item)
    },
    // * Cập nhật giá trị của một mục trong danh sách thành phần
    updateComponentList(index: number, newData: CreateComponentType | CreateComponentGroupType) {
      if (index < 1 && index > this.getComponentList.length) return
      this.componentList[index] = newData
    },
    // * Đặt thuộc tính kiểu trang
    setPageStyle<T extends keyof CSSStyleDeclaration>(key: T, value: any): void {
      const dom = this.getEditCanvas.editContentDom
      if (dom) {
        dom.style[key] = value
      }
    },
    // * Di chuyển vị trí phân cấp của danh sách thành phần sang cả hai đầu
    setBothEnds(isEnd = false, isHistory = true): void {
      try {
        // Nhiều lựa chọn chưa được hỗ trợ
        if (this.getTargetChart.selectId.length > 1) return

        loadingStart()
        const length = this.getComponentList.length
        if (length < 2) {
          loadingFinish()
          return
        }

        const index = this.fetchTargetIndex()
        const targetData = this.getComponentList[index]
        if (index !== -1) {
          // Đặt đáy để loại trừ lớp dưới cùng, Ghim lên trên cùng loại trừ trên cùng
          if ((isEnd && index === 0) || (!isEnd && index === length - 1)) {
            loadingFinish()
            return
          }

          // Ghi lại vị trí ban đầu
          const setIndex = (componentInstance: CreateComponentType | CreateComponentGroupType, i: number) => {
            const temp = cloneDeep(componentInstance)
            temp.attr.zIndex = i
            return temp
          }

          // Lịch sử
          if (isHistory) {
            chartHistoryStore.createLayerHistory(
              [setIndex(targetData, index)],
              isEnd ? HistoryActionTypeEnum.BOTTOM : HistoryActionTypeEnum.TOP
            )
          }

          // Chèn cả hai đầu
          this.addComponentList(targetData, isEnd)
          this.getComponentList.splice(isEnd ? index + 1 : index, 1)
          loadingFinish()
          return
        }
      } catch (value) {
        loadingError()
      }
    },
    // * ghim lên trên
    setTop(isHistory = true): void {
      this.setBothEnds(false, isHistory)
    },
    // * đáy
    setBottom(isHistory = true): void {
      this.setBothEnds(true, isHistory)
    },
    // * di chuyển lên/Di chuyển vị trí biểu đồ hoán đổi xuống
    wrap(isDown = false, isHistory = true) {
      try {
        // Nhiều lựa chọn chưa được hỗ trợ
        if (this.getTargetChart.selectId.length > 1) return

        loadingStart()
        const length = this.getComponentList.length
        if (length < 2) {
          loadingFinish()
          return
        }

        const index: number = this.fetchTargetIndex()
        if (index !== -1) {
          // Di chuyển xuống để loại trừ lớp dưới cùng, Di chuyển lên để loại trừ lớp trên cùng
          if ((isDown && index === 0) || (!isDown && index === length - 1)) {
            loadingFinish()
            return
          }
          // Trao đổi địa điểm
          const swapIndex = isDown ? index - 1 : index + 1
          const targetItem = this.getComponentList[index]
          const swapItem = this.getComponentList[swapIndex]

          // Lịch sử
          if (isHistory) {
            chartHistoryStore.createLayerHistory(
              [targetItem],
              isDown ? HistoryActionTypeEnum.DOWN : HistoryActionTypeEnum.UP
            )
          }
          this.updateComponentList(index, swapItem)
          this.updateComponentList(swapIndex, targetItem)
          loadingFinish()
          return
        }
      } catch (value) {
        loadingError()
      }
    },
    // * Di chuyển lớp lên
    setUp(isHistory = true) {
      this.wrap(false, isHistory)
    },
    // * Di chuyển lớp xuống
    setDown(isHistory = true) {
      this.wrap(true, isHistory)
    },
    // * sao chép
    setCopy(isCut = false) {
      try {
        // Nhiều lựa chọn chưa được hỗ trợ
        if (this.getTargetChart.selectId.length > 1) return
        // Xử lý tình huống sao chép thông thường các cửa sổ bật lên
        if (document.getElementsByClassName('n-modal-body-wrapper').length) return

        loadingStart()
        const index: number = this.fetchTargetIndex()
        if (index !== -1) {
          const copyData: RecordChartType = {
            charts: this.getComponentList[index],
            type: isCut ? HistoryActionTypeEnum.CUT : HistoryActionTypeEnum.COPY
          }
          this.setRecordChart(copyData)
          window['$message'].success(isCut ? window['$t']('global.auto_3') : window['$t']('global.auto_1'))
          loadingFinish()
        }
      } catch (value) {
        loadingError()
      }
    },
    // * cắt
    setCut() {
      this.setCopy(true)
    },
    // * Dán
    setParse() {
      try {
        loadingStart()
        const recordCharts = this.getRecordChart
        if (recordCharts === undefined) {
          loadingFinish()
          return
        }
        const parseHandle = (e: CreateComponentType | CreateComponentGroupType) => {
          e = cloneDeep(e)
          e.attr.x = this.getMousePosition.startX
          e.attr.y = this.getMousePosition.startY
          // Lớp bên ngoài tạo ra mới id
          e.id = getUUID()
          // Danh sách nhóm tạo mới id
          if (e.isGroup) {
            (e as CreateComponentGroupType).groupList.forEach((item: CreateComponentType) => {
              item.id = getUUID()
            })
          }

          return e
        }
        const isCut = recordCharts.type === HistoryActionTypeEnum.CUT
        const targetList = Array.isArray(recordCharts.charts) ? recordCharts.charts : [recordCharts.charts]
        // Nhiều
        targetList.forEach((e: CreateComponentType | CreateComponentGroupType) => {
          this.addComponentList(parseHandle(e), undefined, true)
          // Cắt yêu cầu xóa dữ liệu gốc
          if (isCut) {
            this.setTargetSelectChart(e.id)
            this.removeComponentList(undefined, true)
          }
        })
        if (isCut) this.setRecordChart(undefined)
        loadingFinish()
      } catch (value) {
        loadingError()
      }
    },
    // * rút/tiếp tục đi xử lý mục tiêu
    setBackAndSetForwardHandle(HistoryItem: HistoryItemType, isForward = false) {
      // Làm việc với canvas
      if (HistoryItem.targetType === HistoryTargetTypeEnum.CANVAS) {
        this.editCanvas = HistoryItem.historyData[0] as EditCanvasType
        return
      }

      // Bỏ chọn
      this.setTargetSelectChart()

      // Chọn lại
      let historyData = HistoryItem.historyData as Array<CreateComponentType | CreateComponentGroupType>
      if (isArray(historyData)) {
        // Chọn phần tử đích, nhiều
        historyData.forEach((item: CreateComponentType | CreateComponentGroupType) => {
          this.setTargetSelectChart(item.id, true)
        })
      }

      // Xử lý các loại mới
      const isAdd = HistoryItem.actionType === HistoryActionTypeEnum.ADD
      const isDel = HistoryItem.actionType === HistoryActionTypeEnum.DELETE
      if (isAdd || isDel) {
        if ((isAdd && isForward) || (isDel && !isForward)) {
          historyData.forEach(item => {
            this.addComponentList(item)
          })
          return
        }
        historyData.forEach(item => {
          this.removeComponentList(item.id, false)
        })
        return
      }

      // Xử lý di chuyển
      const isMove = HistoryItem.actionType === HistoryActionTypeEnum.MOVE
      if (isMove) {
        historyData.forEach(item => {
          this.resetComponentPosition(item, isForward)
        })
        return
      }

      // Mức độ xử lý
      const isTop = HistoryItem.actionType === HistoryActionTypeEnum.TOP
      const isBottom = HistoryItem.actionType === HistoryActionTypeEnum.BOTTOM
      if (isTop || isBottom) {
        if (!isForward) {
          // Chèn vào vị trí ban đầu
          if (isTop) this.getComponentList.pop()
          if (isBottom) this.getComponentList.shift()
          this.getComponentList.splice(historyData[0].attr.zIndex, 0, historyData[0])
          return
        }
        if (isTop) this.setTop(false)
        if (isBottom) this.setBottom(false)
      }

      const isUp = HistoryItem.actionType === HistoryActionTypeEnum.UP
      const isDown = HistoryItem.actionType === HistoryActionTypeEnum.DOWN
      if (isUp || isDown) {
        if ((isUp && isForward) || (isDown && !isForward)) {
          this.setUp(false)
          return
        }
        this.setDown(false)
        return
      }

      // Xử lý nhóm
      const isGroup = HistoryItem.actionType === HistoryActionTypeEnum.GROUP
      const isUnGroup = HistoryItem.actionType === HistoryActionTypeEnum.UN_GROUP
      if (isGroup || isUnGroup) {
        if ((isGroup && isForward) || (isUnGroup && !isForward)) {
          const ids: string[] = []
          if (historyData.length > 1) {
            historyData.forEach(item => {
              ids.push(item.id)
            })
          } else {
            const group = historyData[0] as CreateComponentGroupType
            group.groupList.forEach(item => {
              ids.unshift(item.id)
            })
          }
          this.setGroup(ids, false)
          return
        }
        // Tất cả đều yêu cầu sử dụng các thành phần phụidđể tách nhóm
        if (historyData.length > 1) {
          this.setUnGroup([(historyData[0] as CreateComponentType).id], undefined, false)
        } else {
          this.setUnGroup([(historyData[0] as CreateComponentGroupType).groupList[0].id], undefined, false)
        }
        return
      }

      // Xử lý ổ khóa
      const isLock = HistoryItem.actionType === HistoryActionTypeEnum.LOCK
      const isUnLock = HistoryItem.actionType === HistoryActionTypeEnum.UNLOCK
      if (isLock || isUnLock) {
        if ((isLock && isForward) || (isUnLock && !isForward)) {
          historyData.forEach(item => {
            this.setLock(!item.status.lock, false)
          })
          return
        }
        historyData.forEach(item => {
          this.setUnLock(false)
        })
        return
      }

      // xử lý ẩn
      const isHide = HistoryItem.actionType === HistoryActionTypeEnum.HIDE
      const isShow = HistoryItem.actionType === HistoryActionTypeEnum.SHOW
      if (isHide || isShow) {
        if ((isHide && isForward) || (isShow && !isForward)) {
          historyData.forEach(item => {
            this.setHide(!item.status.hide, false)
          })
          return
        }
        historyData.forEach(item => {
          this.setShow(false)
        })
        return
      }
    },
    // * rút
    setBack() {
      try {
        loadingStart()
        const targetData = chartHistoryStore.backAction()
        if (!targetData) {
          loadingFinish()
          return
        }
        this.setBackAndSetForwardHandle(targetData)
        loadingFinish()
      } catch (value) {
        loadingError()
      }
    },
    // * tiếp tục đi
    setForward() {
      try {
        loadingStart()
        const targetData = chartHistoryStore.forwardAction()
        if (!targetData) {
          loadingFinish()
          return
        }
        this.setBackAndSetForwardHandle(targetData, true)
        loadingFinish()
      } catch (value) {
        loadingError()
      }
    },
    // * Di chuyển vị trí
    setMove(keyboardValue: MenuEnum) {
      const index = this.fetchTargetIndex()
      if (index === -1) return
      const attr = this.getComponentList[index].attr
      const distance = settingStore.getChartMoveDistance
      switch (keyboardValue) {
        case MenuEnum.ARROW_UP:
          attr.y -= distance
          break
        case MenuEnum.ARROW_RIGHT:
          attr.x += distance
          break
        case MenuEnum.ARROW_DOWN:
          attr.y += distance
          break
        case MenuEnum.ARROW_LEFT:
          attr.x -= distance
          break
      }
    },
    // * Tạo nhóm
    setGroup(id?: string | string[], isHistory = true) {
      try {
        let selectIds = this.idPreFormat(id) || this.getTargetChart.selectId
        selectIds = this.getSelectIdSortList(selectIds)
        if (selectIds.length < 2) return

        loadingStart()
        const groupClass = new PublicGroupConfigClass()
        const targetList: CreateComponentType[] = []
        const historyList: CreateComponentType[] = []

        // Nếu có một mảng trong mục tiêu, trước tiên hãy sắp xếp nó theo thứ tự
        const newSelectIds: string[] = []
        selectIds.forEach((id: string) => {
          const targetIndex = this.fetchTargetIndex(id)
          if (targetIndex !== -1 && this.getComponentList[targetIndex].isGroup) {
            this.setUnGroup(
              [id],
              (e: CreateComponentType[]) => {
                e.forEach(e => {
                  this.addComponentList(e)
                  newSelectIds.push(e.id)
                })
              },
              false
            )
          } else if (targetIndex !== -1) {
            newSelectIds.push(id)
          }
        })
        // Ghi lại tọa độ toàn cầu
        const groupAttr = {
          l: 0,
          t: 0,
          r: 0,
          b: 0
        }
        newSelectIds.forEach((id: string, index: number) => {
          // Lấy dữ liệu mục tiêu và từ list bị xóa khỏi (Một khi một nhóm được thành lập, nó không thể được thành lập lại., Xử lý xác nhận)
          const item = this.componentList.splice(this.fetchTargetIndex(id), 1)[0] as CreateComponentType
          const { x, y, w, h } = item.attr
          if (index === 0) {
            groupAttr.l = x
            groupAttr.t = y
            groupAttr.r = x + w
            groupAttr.b = y + h
          } else {
            const { l, t, r, b } = groupAttr
            // Bên trái
            groupAttr.l = l > x ? x : l
            // thượng đẳng
            groupAttr.t = t > y ? y : t
            // Chiều rộng
            groupAttr.r = r < x + w ? x + w : r
            // cao
            groupAttr.b = b < y + h ? y + h : b
          }

          targetList.push(item)
          historyList.push(toRaw(item))
        })

        // Trước khi sửa đổi dữ liệu gốc, hãy ghi lại dữ liệu đó trước
        if (isHistory) chartHistoryStore.createGroupHistory(historyList)

        // Thiết lập vị trí của các thành phần con
        targetList.forEach((item: CreateComponentType) => {
          item.attr.x = item.attr.x - groupAttr.l
          item.attr.y = item.attr.y - groupAttr.t
          groupClass.groupList.push(item)
        })

        // cài đặt group tài sản
        groupClass.attr.x = groupAttr.l
        groupClass.attr.y = groupAttr.t
        groupClass.attr.w = groupAttr.r - groupAttr.l
        groupClass.attr.h = groupAttr.b - groupAttr.t

        this.addComponentList(groupClass as unknown as CreateComponentGroupType)
        this.setTargetSelectChart(groupClass.id)

        loadingFinish()
      } catch (error) {
        console.log(error)
        window['$message'].error(window['$t']('global.auto_2'))
        loadingFinish()
      }
    },
    // * Tách nhóm
    setUnGroup(ids?: string[], callBack?: (e: CreateComponentType[]) => void, isHistory = true) {
      try {
        const selectGroupIdArr = ids || this.getTargetChart.selectId
        if (selectGroupIdArr.length !== 1) return
        loadingStart()

        // không có nguyên soái
        const unGroup = (targetIndex: number) => {
          const targetGroup = this.getComponentList[targetIndex] as CreateComponentGroupType
          if (!targetGroup.isGroup) return

          // Ghi dữ liệu
          if (isHistory) chartHistoryStore.createUnGroupHistory(cloneDeep([targetGroup]))

          // Tách các thành phần và khôi phục thuộc tính vị trí
          targetGroup.groupList.forEach(item => {
            item.attr.x = item.attr.x + targetGroup.attr.x
            item.attr.y = item.attr.y + targetGroup.attr.y
            if (!callBack) {
              this.addComponentList(item)
            }
          })
          this.setTargetSelectChart(targetGroup.id)
          // Xóa nhóm
          this.removeComponentList(targetGroup.id, false)

          if (callBack) {
            callBack(targetGroup.groupList)
          }
        }

        const targetIndex = this.fetchTargetIndex(selectGroupIdArr[0])
        // Xác định xem mục tiêu có phải là nhóm mẹ hay không
        if (targetIndex !== -1) {
          unGroup(targetIndex)
        }

        loadingFinish()
      } catch (error) {
        console.log(error)
        window['$message'].error(window['$t']('global.auto_5'))
        loadingFinish()
      }
    },
    // * khóa
    setLock(status: boolean = true, isHistory: boolean = true) {
      try {
        // Nhiều lựa chọn chưa được hỗ trợ
        if (this.getTargetChart.selectId.length > 1) return

        loadingStart()
        const index: number = this.fetchTargetIndex()
        if (index !== -1) {
          // cập nhật trạng thái
          const targetItem = this.getComponentList[index]
          targetItem.status.lock = status

          // Lịch sử
          if (isHistory) {
            status
              ? chartHistoryStore.createLockHistory([targetItem])
              : chartHistoryStore.createUnLockHistory([targetItem])
          }
          this.updateComponentList(index, targetItem)
          // Khóa để thêm hiệu ứng mất nét
          if (status) this.setTargetSelectChart(undefined)
          loadingFinish()
          return
        }
      } catch (value) {
        loadingError()
      }
    },
    // * Mở khóa
    setUnLock(isHistory: boolean = true) {
      this.setLock(false, isHistory)
    },
    // * trốn
    setHide(status: boolean = true, isHistory: boolean = true) {
      try {
        // Nhiều lựa chọn chưa được hỗ trợ
        if (this.getTargetChart.selectId.length > 1) return

        loadingStart()
        const index: number = this.fetchTargetIndex()
        if (index !== -1) {
          // cập nhật trạng thái
          const targetItem = this.getComponentList[index]
          targetItem.status.hide = status

          // Lịch sử
          if (isHistory) {
            status
              ? chartHistoryStore.createHideHistory([targetItem])
              : chartHistoryStore.createShowHistory([targetItem])
          }
          this.updateComponentList(index, targetItem)
          loadingFinish()

          // Ẩn Thêm hiệu ứng mất nét
          if (status) this.setTargetSelectChart(undefined)
        }
      } catch (value) {
        loadingError()
      }
    },
    // * trình diễn
    setShow(isHistory: boolean = true) {
      this.setHide(false, isHistory)
    },
    // ----------------
    // * Đặt kích thước trang
    setPageSize(scale: number): void {
      this.setPageStyle('height', `${this.editCanvasConfig.height * scale}px`)
      this.setPageStyle('width', `${this.editCanvasConfig.width * scale}px`)
    },
    // * Tính toán chia tỷ lệ
    computedScale() {
      if (this.getEditCanvas.editLayoutDom) {
        // Khu vực trưng bày hiện có
        const width = this.getEditCanvas.editLayoutDom.clientWidth - this.getEditCanvas.offset * 2 - 5
        const height = this.getEditCanvas.editLayoutDom.clientHeight - this.getEditCanvas.offset * 4

        // Kích thước do người dùng đặt
        const editCanvasWidth = this.editCanvasConfig.width
        const editCanvasHeight = this.editCanvasConfig.height

        // Tỷ lệ được duy trì
        const baseProportion = parseFloat((editCanvasWidth / editCanvasHeight).toFixed(5))
        const currentRate = parseFloat((width / height).toFixed(5))

        if (currentRate > baseProportion) {
          // có nghĩa là rộng hơn
          const scaleWidth = parseFloat(((height * baseProportion) / editCanvasWidth).toFixed(5))
          this.setScale(scaleWidth > 1 ? 1 : scaleWidth)
        } else {
          // có nghĩa là cao hơn
          const scaleHeight = parseFloat((width / baseProportion / editCanvasHeight).toFixed(5))
          this.setScale(scaleHeight > 1 ? 1 : scaleHeight)
        }
      } else {
        window['$message'].warning(window['$t']('global.auto_4'))
      }
    },
    // * Nghe để thu phóng
    listenerScale(): Function {
      const resize = debounce(this.computedScale, 200)
      // Thực hiện một lần theo mặc định
      resize()
      // Bắt đầu nghe
      window.addEventListener('resize', resize)
      // chức năng hủy diệt
      const remove = () => {
        window.removeEventListener('resize', resize)
      }
      return remove
    },
    /**
     * * Đặt thu phóng
     * @param scale 0~1 number Tỷ lệ thu phóng;
     * @param force boolean lực lượng
     */
    setScale(scale: number, force = false): void {
      if (!this.getEditCanvas.lockScale || force) {
        this.setPageSize(scale)
        this.getEditCanvas.userScale = scale
        this.getEditCanvas.scale = scale
      }
    }
  }
})
