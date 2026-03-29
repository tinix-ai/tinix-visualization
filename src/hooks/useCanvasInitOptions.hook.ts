import { inject, type Ref } from 'vue'
import { EchartsRenderer } from '@/settings/chartThemes'
import { SCALE_KEY } from '@/views/preview/hooks/useScale.hook'
import { use } from 'echarts/core'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

use([CanvasRenderer, SVGRenderer])

type InitOptions = {
  renderer: EchartsRenderer
  devicePixelRatio?: number
}

// Nhận những gì cần phải được trao cho hiện tạiechartsGiá trị ban đầu nào mà thành phần này đặt?
export function useCanvasInitOptions(option: any, themeSetting: any) {
  const renderer = option?.renderer || themeSetting?.renderer || 'canvas'
  const initOptions: InitOptions = { renderer }
  const scaleRef = inject<Ref<{ width: number; height: number }>>(SCALE_KEY) || { value: { width: 1, height: 1 } }

  if (renderer === 'canvas') {
    initOptions.devicePixelRatio = Math.ceil(
      Math.max(window.devicePixelRatio, scaleRef.value.width, scaleRef.value.height)
    )
  }
  return initOptions
}
