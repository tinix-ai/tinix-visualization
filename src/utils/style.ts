import Color from 'color'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { PickCreateComponentType } from '@/packages/index.d'
import { EditCanvasConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { chartColors, chartColorsSearch, CustomColorsType } from '@/settings/chartThemes/index'

type AttrType = PickCreateComponentType<'attr'>
type StylesType = PickCreateComponentType<'styles'>

// * hoạt hình
export const animationsClass = (animations: string[]) => {
  if (animations && animations.length) {
    return `animate__animated  animate__${animations[0]}`
  }
  return ''
}

// * lọc
export const getFilterStyle = (styles?: StylesType | EditCanvasConfigType) => {
  if (!styles || !styles.filterShow) return {}
  const { opacity, saturate, contrast, hueRotate, brightness } = styles
  return {
    opacity: opacity,
    filter: `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`
  }
}

// * biến đổi
export const getTransformStyle = (styles: StylesType) => {
  if (!styles) return {}
  const { rotateZ, rotateX, rotateY, skewX, skewY } = styles
  return {
    transform: `rotateZ(${rotateZ || 0}deg) rotateX(${rotateX || 0}deg) rotateY(${rotateY || 0}deg) skewX(${
      skewX || 0
    }deg) skewY(${skewY || 0}deg)`
  }
}

// * chế độ hòa trộn
export const getBlendModeStyle = (styles: StylesType) => {
  if (!styles || !styles.filterShow) return {}
  const { blendMode } = styles
  return {
    'mix-blend-mode': blendMode
  }
}

/**
 * * hsla Chuyển thành
 * @param color màu sắc
 * @param alpha mặc định1
 * @returns
 */
export function alpha(color: string, alpha = 1) {
  return Color(color).alpha(alpha).toString()
}

/**
 * * màu trong suốt
 * rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)
 * @param color màu sắc
 * @param concentration 0~1 sự tập trung
 * @returns
 */
export function fade(color: string, fade: number) {
  return Color(color).fade(fade).toString()
}

/**
 * * Màu sắc tươi sáng
 * hsl(100, 50%, 10%) -> hsl(100, 50%, 50%)
 * @param color màu sắc
 * @param concentration 0~1 sự tập trung
 * @returns
 */
export function lighten(color: string, concentration: number) {
  return Color(color).lighten(concentration).toString()
}

/**
 * * màu đậm
 * hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)
 * @param color màu sắc
 * @param concentration 0~1 sự tập trung
 * @returns
 */
export function darken(color: string, concentration: number) {
  return Color(color).darken(concentration).toString()
}

/**
 * * hsl Chuyển đổi thành16căn cứ
 * @param hsl
 * @returns
 */
export function hslToHexa(hslString: string): string {
  const color = Color(hslString)
  return color.hexa()
}

export function hslToHex(hslString: string): string {
  const color = Color(hslString)
  return color.hex()
}

/**
 * * Sửa đổi màu chủ đề
 * @param themeName Tên chủ đề
 * @returns
 */
export const setHtmlTheme = (themeName?: string) => {
  const e = window.document.documentElement
  if (themeName) {
    e.setAttribute('data-theme', themeName)
    return
  }
  const designStore = useDesignStore()
  e.setAttribute('data-theme', designStore.themeName)
}

/**
 * * Hợp nhất màu cơ bản và màu tùy chỉnh
 * @param chartDefaultColors
 * @param customColor
 * @returns
 */
export const colorCustomMerge = (customColor?: CustomColorsType[]) => {
  type FormateCustomColorType = {
    [T: string]: {
      color: string[]
      name: string
    }
  }
  const formateCustomColor: FormateCustomColorType = {}
  if (Array.isArray(customColor)) {
    customColor.forEach(item => {
      formateCustomColor[item.id] = {
        color: item.color,
        name: item.name
      }
    })
  }
  return { ...formateCustomColor, ...chartColors }
}

/**
 * * Hợp nhất màu gradient cơ bản và màu gradient tùy chỉnh
 * @param customColor
 */
export const colorGradientCustomMerge = (customColor?: CustomColorsType[]) => {
  type FormateGradientCustomColorType = {
    [T: string]: string[]
  }
  const formateGradientCustomColor: FormateGradientCustomColorType = {}
  if (Array.isArray(customColor)) {
    customColor.forEach(item => {
      formateGradientCustomColor[item.id] = [
        item.color[0],
        item.color[1],
        fade(item.color[0], 0.3),
        fade(item.color[0], 0.5),
        fade(item.color[1], 0.5)
      ]
    })
  }

  return { ...formateGradientCustomColor, ...chartColorsSearch }
}
