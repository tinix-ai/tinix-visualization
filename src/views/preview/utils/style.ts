import { PickCreateComponentType } from '@/packages/index.d'
import { EditCanvasConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'

type AttrType = PickCreateComponentType<'attr'>
type StatusType = PickCreateComponentType<'status'>
type PreviewConfig = PickCreateComponentType<'preview'>

// Đặt vị trí
export const getComponentAttrStyle = (attr: AttrType, index: number) => {
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
  }
  return componentStyle
}

// Đặt kích thước
export const getSizeStyle = (attr: AttrType, scale?: number) => {
  return {
    width: `${scale ? scale * attr.w : attr.w}px`,
    height: `${scale ? scale * attr.h : attr.h}px`
  }
}

// Đặt kiểu trạng thái
export const getStatusStyle = (attr: StatusType) => {
  return {
    display: attr.hide ? 'none' : 'block'
  }
}

// Đặt kiểu cấu hình xem trước
export const getPreviewConfigStyle = (previewConfig: PreviewConfig) => {
  const previewStyle: Partial<CSSStyleDeclaration> = {}
  if (previewConfig) {
    if (previewConfig.overFlowHidden) {
      previewStyle.overflow = 'hidden'
    }
  }
  return previewStyle
}

// phong cách toàn cầu
export const getEditCanvasConfigStyle = (canvas: EditCanvasConfigType) => {
  // lý lịch
  const computedBackground = canvas.selectColor
    ? { background: canvas.background }
    : {
        background: `url(${canvas.backgroundImage}) center center / cover no-repeat !important`
      }
  return {
    position: 'relative' as const,
    width: canvas.width ? `${canvas.width || 100}px` : '100%',
    height: canvas.height ? `${canvas.height}px` : '100%',
    ...computedBackground
  }
}
