import { toRaw } from 'vue'
import { DragKeyEnum, MouseEventButton } from '@/enums/editPageEnum'
import { createComponent } from '@/packages'
import { ConfigType } from '@/packages/index.d'
import { CreateComponentType, CreateComponentGroupType, PickCreateComponentType } from '@/packages/index.d'
import { useContextMenu } from '@/views/chart/hooks/useContextMenu.hook'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { loadingStart, loadingFinish, loadingError, setComponentPosition, JSONParse } from '@/utils'
import { throttle, cloneDeep } from 'lodash'

const chartEditStore = useChartEditStore()
const { onClickOutSide } = useContextMenu()

// * kéo đếnSửa (Edit)trong khu vực
export const dragHandle = async (e: DragEvent) => {
  e.preventDefault()

  try {
    loadingStart()

    // Nhận kéoDữ liệu
    const drayDataString = e!.dataTransfer!.getData(DragKeyEnum.DRAG_KEY)
    if (!drayDataString) {
      loadingFinish()
      return
    }

    // Sửa đổi trạng thái
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_CREATE, false)
    const dropData: Exclude<ConfigType, ['image']> = JSONParse(drayDataString)
    if (dropData.disabled) return

    // tạo mớiBiểu đồThành phần
    let newComponent: CreateComponentType = await createComponent(dropData)
    if (dropData.redirectComponent) {
      dropData.dataset && (newComponent.option.dataset = dropData.dataset)
      newComponent.chartConfig.title = dropData.title
      newComponent.chartConfig.chartFrame = dropData.chartFrame
    }

    setComponentPosition(newComponent, e.offsetX - newComponent.attr.w / 2, e.offsetY - newComponent.attr.h / 2)
    chartEditStore.addComponentList(newComponent, false, true)
    chartEditStore.setTargetSelectChart(newComponent.id)
    loadingFinish()
  } catch (error) {
    loadingError()
    window['$message'].warning(`Biểu đồ đang phát triển, chờ xíu nha...`)
  }
}

// * Nhập vùng kéo
export const dragoverHandle = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()

  if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
}

// * Không chặn các nhấp chuột hành vi mặc định
export const mousedownHandleUnStop = (e: MouseEvent, item?: CreateComponentType | CreateComponentGroupType) => {
  if (item) {
    chartEditStore.setTargetSelectChart(item.id)
    return
  }
  chartEditStore.setTargetSelectChart(undefined)
}

// * Lựa chọn khung
export const mousedownBoxSelect = (e: MouseEvent, item?: CreateComponentType | CreateComponentGroupType) => {
  if (e.which == 2) return
  if (window.$KeyboardActive?.space) return

  mousedownHandleUnStop(e)

  // Ghi lại lần nhấp đầu tiênVị trí
  const startOffsetX = e.offsetX
  const startOffsetY = e.offsetY
  const startScreenX = e.screenX
  const startScreenY = e.screenY

  // thu phóng kỷ lục
  const scale = chartEditStore.getEditCanvas.scale

  chartEditStore.setMousePosition(undefined, undefined, startOffsetX, startOffsetY)

  // Di chuyển lựa chọn khung
  const mousemove = throttle((moveEvent: MouseEvent) => {
    // Hủy lựa chọn hiện tại
    chartEditStore.setTargetSelectChart()
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_SELECT, true)

    // Ở đây, hãy tính giá trị tương đối trước, nếu không thì thành phần không thể lấy được giá trị đó. startScreenX Và startScreenY giá trị
    const currX = startOffsetX + moveEvent.screenX - startScreenX
    const currY = startOffsetY + moveEvent.screenY - startScreenY
    chartEditStore.setMousePosition(currX, currY)

    // Tính toán lựa chọn khungTráiTrêngóc và góc dưới bên phải
    const selectAttr = {
      // TráiTrênsừng
      x1: 0,
      y1: 0,
      // góc dưới bên phải
      x2: 0,
      y2: 0
    }
    if (currX > startOffsetX && currY > startOffsetY) {
      // Hướng dưới bên phải
      selectAttr.x1 = startOffsetX
      selectAttr.y1 = startOffsetY
      selectAttr.x2 = Math.round(startOffsetX + (moveEvent.screenX - startScreenX) / scale)
      selectAttr.y2 = Math.round(startOffsetY + (moveEvent.screenY - startScreenY) / scale)
    } else if (currX > startOffsetX && currY < startOffsetY) {
      // PhảiTrênphương hướng
      selectAttr.x1 = startOffsetX
      selectAttr.y1 = Math.round(startOffsetY - (startScreenY - moveEvent.screenY) / scale)
      selectAttr.x2 = Math.round(startOffsetX + (moveEvent.screenX - startScreenX) / scale)
      selectAttr.y2 = startOffsetY
    } else if (currX < startOffsetX && currY > startOffsetY) {
      selectAttr.x1 = Math.round(startOffsetX - (startScreenX - moveEvent.screenX) / scale)
      selectAttr.y1 = startOffsetY
      selectAttr.x2 = startOffsetX
      selectAttr.y2 = Math.round(startOffsetY + (moveEvent.screenY - startScreenY) / scale)
      // Tráihướng đi xuống
    } else {
      // TráiTrênphương hướng
      selectAttr.x1 = Math.round(startOffsetX - (startScreenX - moveEvent.screenX) / scale)
      selectAttr.y1 = Math.round(startOffsetY - (startScreenY - moveEvent.screenY) / scale)
      selectAttr.x2 = startOffsetX
      selectAttr.y2 = startOffsetY
    }

    // Vòng lặpthành phần
    chartEditStore.getComponentList.forEach(item => {
      if (!chartEditStore.getTargetChart.selectId.includes(item.id)) {
        // đối phó vớiTráiTrênsừng
        let isSelect = false
        const { x, y, w, h } = item.attr
        const targetAttr = {
          // TráiTrênsừng
          x1: x,
          y1: y,
          // góc dưới bên phải
          x2: x + w,
          y2: y + h
        }
        // Bao gồm tất cả được chọn
        if (
          targetAttr.x1 - selectAttr.x1 >= 0 &&
          targetAttr.y1 - selectAttr.y1 >= 0 &&
          targetAttr.x2 - selectAttr.x2 <= 0 &&
          targetAttr.y2 - selectAttr.y2 <= 0 &&
          !item.status.lock &&
          !item.status.hide
        ) {
          isSelect = true
          chartEditStore.setTargetSelectChart(item.id, true)
        }
      }
    })
  }, 30)

  // chuột nuôi
  const mouseup = () => {
    // chuột nuôiGiờ, kết thúcmousemoveChức năng điều tiết để tránh vấn đề hộp chọn không biến mất
    mousemove.cancel()
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_SELECT, false)
    chartEditStore.setMousePosition(0, 0, 0, 0)
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}

// * chuộtSự kiện
export const useMouseHandle = () => {
  // *  Click Sự kiện, Nhả chuột để kích hoạt
  const mouseClickHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (item.status.lock) return
    // Nếu vậyGiờép CTRL, Cho biết nhiều lựa chọn
    if (window.$KeyboardActive?.ctrl) {
      // Nếu được chọn thì loại bỏ
      if (chartEditStore.targetChart.selectId.includes(item.id)) {
        const exList = chartEditStore.targetChart.selectId.filter(e => e !== item.id)
        chartEditStore.setTargetSelectChart(exList)
      } else {
        chartEditStore.setTargetSelectChart(item.id, true)
      }
    }
  }

  // * nhấnSự kiện(bao gồm di độngSự kiện）
  const mousedownHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (item.status.lock) return
    onClickOutSide()
    // nhấnTráichìa khóa + CTRL
    if (e.buttons === MouseEventButton.LEFT && window.$KeyboardActive?.ctrl) return

    // Nhấp chuột phải + Chọn nhiều + Phần tử đích là phần tử con có nhiều lựa chọn
    const selectId = chartEditStore.getTargetChart.selectId
    if (e.buttons === MouseEventButton.RIGHT && selectId.length > 1 && selectId.includes(item.id)) return

    // Chọn thành phần mục tiêu hiện tại
    chartEditStore.setTargetSelectChart(item.id)

    // Nhấp chuột phải
    if (e.buttons === MouseEventButton.RIGHT) return

    const scale = chartEditStore.getEditCanvas.scale
    const canvasWidth = chartEditStore.getEditCanvasConfig.width
    const canvasHeight = chartEditStore.getEditCanvasConfig.height

    // GhiBiểu đồban đầuVị trí và kích thước
    const targetMap = new Map()
    chartEditStore.getTargetChart.selectId.forEach(id => {
      const index = chartEditStore.fetchTargetIndex(id)
      if (index !== -1) {
        const { x, y, w, h } = toRaw(chartEditStore.getComponentList[index]).attr
        targetMap.set(id, { x, y, w, h })
      }
    })

    // Ghi lại lần nhấp đầu tiênVị trí
    const startX = e.screenX
    const startY = e.screenY

    // ghi lại lịch sửVị trí
    let prevComponentInstance: Array<CreateComponentType | CreateComponentGroupType> = []
    chartEditStore.getTargetChart.selectId.forEach(id => {
      if (!targetMap.has(id)) return

      const index = chartEditStore.fetchTargetIndex(id)
      // Nhận ban đầuVị tríDữ liệu
      prevComponentInstance.push(cloneDeep(chartEditStore.getComponentList[index]))
    })

    // Ghi ban đầuVị trí
    chartEditStore.setMousePosition(undefined, undefined, startX, startY)

    // di chuyển-Tính toán bù đắp
    const mousemove = throttle((moveEvent: MouseEvent) => {
      chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, true)
      chartEditStore.setMousePosition(moveEvent.screenX, moveEvent.screenY)

      // Bù đắp hiện tại, xử lý scale Vấn đề về tỷ lệ
      let offsetX = (moveEvent.screenX - startX) / scale
      let offsetY = (moveEvent.screenY - startY) / scale

      chartEditStore.getTargetChart.selectId.forEach(id => {
        if (!targetMap.has(id)) return

        const index = chartEditStore.fetchTargetIndex(id)
        // Nhận ban đầuVị tríDữ liệu
        const { x, y, w, h } = targetMap.get(id)
        const componentInstance = chartEditStore.getComponentList[index]

        let currX = Math.round(x + offsetX)
        let currY = Math.round(y + offsetY)

        // khoảng cách cho phép
        const distance = 50

        // dựa trênTráiTrênsừngVị trí phát hiện
        currX = currX < -w + distance ? -w + distance : currX
        currY = currY < -h + distance ? -h + distance : currY

        // Dựa vào góc dưới bên phảiVị trí phát hiện
        currX = currX > canvasWidth - distance ? canvasWidth - distance : currX
        currY = currY > canvasHeight - distance ? canvasHeight - distance : currY
        if (componentInstance) {
          componentInstance.attr = Object.assign(componentInstance.attr, {
            x: currX,
            y: currY
          })
        }
      })
      return
    }, 20)

    const mouseup = () => {
      try {
        chartEditStore.setMousePosition(0, 0, 0, 0)
        chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
        // Thêm vào ngăn xếp lịch sử
        if (prevComponentInstance.length) {
          chartEditStore.getTargetChart.selectId.forEach(id => {
            if (!targetMap.has(id)) return
            const index = chartEditStore.fetchTargetIndex(id)
            const curComponentInstance = chartEditStore.getComponentList[index]
            // Tìm thành phần đã chọn của bản ghi
            prevComponentInstance.forEach(preItem => {
              if (preItem.id === id) {
                preItem.attr = Object.assign(preItem.attr, {
                  offsetX: curComponentInstance.attr.x - preItem.attr.x,
                  offsetY: curComponentInstance.attr.y - preItem.attr.y
                })
              }
            })
          })

          const moveComponentInstance = prevComponentInstance.filter(
            item => item.attr.offsetX !== 0 && item.attr.offsetY !== 0
          )
          moveComponentInstance.length && chartEditStore.moveComponentList(moveComponentInstance)
        }
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      } catch (err) {
        console.log(err)
      }
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }

  // * Đi vàoSự kiện
  const mouseenterHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    if (!chartEditStore.getEditCanvas.isSelect) {
      chartEditStore.setTargetHoverChart(item.id)
    }
  }

  // * dọn ra ngoàiSự kiện
  const mouseleaveHandle = (e: MouseEvent, item: CreateComponentType | CreateComponentGroupType) => {
    e.preventDefault()
    e.stopPropagation()
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
    chartEditStore.setTargetHoverChart(undefined)
  }

  return { mouseClickHandle, mousedownHandle, mouseenterHandle, mouseleaveHandle }
}

// * Di chuyển điểm neo
export const useMousePointHandle = (e: MouseEvent, point: string, attr: PickCreateComponentType<'attr'>) => {
  e.stopPropagation()
  e.preventDefault()

  // Đặt trạng thái kéo
  chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, true)
  const scale = chartEditStore.getEditCanvas.scale

  const itemAttrX = attr.x
  const itemAttrY = attr.y
  const itemAttrW = attr.w
  const itemAttrH = attr.h

  // Ghi lại lần nhấp đầu tiênVị trí
  const startX = e.screenX
  const startY = e.screenY

  // Ghi ban đầuVị trí
  chartEditStore.setMousePosition(startX, startY)

  const mousemove = throttle((moveEvent: MouseEvent) => {
    chartEditStore.setMousePosition(moveEvent.screenX, moveEvent.screenY)

    let currX = Math.round((moveEvent.screenX - startX) / scale)
    let currY = Math.round((moveEvent.screenY - startY) / scale)

    const isTop = /t/.test(point)
    const isBottom = /b/.test(point)
    const isLeft = /l/.test(point)
    const isRight = /r/.test(point)

    const newHeight = itemAttrH + (isTop ? -currY : isBottom ? currY : 0)
    const newWidth = itemAttrW + (isLeft ? -currX : isRight ? currX : 0)

    attr.h = newHeight > 0 ? newHeight : 0
    attr.w = newWidth > 0 ? newWidth : 0
    attr.x = itemAttrX + (isLeft ? currX : 0)
    attr.y = itemAttrY + (isTop ? currY : 0)
  }, 50)

  const mouseup = () => {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.IS_DRAG, false)
    chartEditStore.setMousePosition(0, 0, 0, 0)
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }

  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}
