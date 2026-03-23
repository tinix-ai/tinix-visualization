import { PickCreateComponentType } from '@/packages/index.d'

type AttrType = PickCreateComponentType<'attr'>

export const useComponentStyle = (attr: AttrType, index: number) => {
  if(!attr) return {}
  const componentStyle = {
    zIndex: index + 1,
    left: `${attr.x}px`,
    top: `${attr.y}px`
  }
  return componentStyle
}

export const useSizeStyle = (attr: AttrType, scale?: number) => {
  if(!attr) return {}
  return {
    width: `${scale ? scale * attr.w : attr.w}px`,
    height: `${scale ? scale * attr.h : attr.h}px`
  }
}

// vị trí neo
export const usePointStyle = (
  point: string,
  index: number,
  attr: PickCreateComponentType<'attr'>,
  cursorResize: string[]
) => {
  const { w: width, h: height } = attr

  const isTop = /t/.test(point)
  const isBottom = /b/.test(point)
  const isLeft = /l/.test(point)
  const isRight = /r/.test(point)

  let newLeft = 0
  let newTop = 0

  // bốn điểm góc
  if (point.length === 2) {
    newLeft = isLeft ? 0 : width
    newTop = isTop ? 0 : height
  } else {
    // Điểm trên và điểm dưới, chiều rộng được căn giữa
    if (isTop || isBottom) {
      newLeft = width / 2
      newTop = isTop ? 0 : height
    }

    // Các điểm ở bên trái và bên phải, lấy chiều cao làm trung tâm
    if (isLeft || isRight) {
      newLeft = isLeft ? 0 : width
      newTop = Math.floor(height / 2)
    }
  }

  const style = {
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursorResize[index] + '-resize'
  }

  return style
}
