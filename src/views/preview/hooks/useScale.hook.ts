import { ref, provide, onMounted, onUnmounted, computed, watch } from 'vue'
import { usePreviewFitScale, usePreviewScrollYScale, usePreviewScrollXScale, usePreviewFullScale } from '@/hooks/index'
import type { ChartEditStorageType } from '../index.d'
import { PreviewScaleEnum } from '@/enums/styleEnum'

export const SCALE_KEY = 'scale-value'

export const useScale = (localStorageInfo: ChartEditStorageType) => {
  const entityRef = ref()
  const previewRef = ref()
  
  // Reactive dimensions from store
  const width = computed(() => localStorageInfo.editCanvasConfig.width || 1920)
  const height = computed(() => localStorageInfo.editCanvasConfig.height || 1080)
  const previewScaleType = computed(() => localStorageInfo.editCanvasConfig.previewScaleType)
  
  const scaleRef = ref({ width: 1, height: 1 })
  let unWindowResizeFn: Function | null = null

  provide(SCALE_KEY, scaleRef)

  const updateScaleRef = (scale: { width: number; height: number }) => {
    scaleRef.value = { ...scale }
  }

  const initScale = () => {
    // Clean up previous listeners
    if (unWindowResizeFn) {
      unWindowResizeFn()
      unWindowResizeFn = null
    }

    if (!previewRef.value) return

    const type = previewScaleType.value
    const w = width.value
    const h = height.value

    let hooks: any
    if (type === PreviewScaleEnum.FIT) {
      hooks = usePreviewFitScale(w, h, previewRef.value, updateScaleRef)
    } else if (type === PreviewScaleEnum.SCROLL_Y) {
      hooks = usePreviewScrollYScale(w, h, previewRef.value, scale => {
        if (entityRef.value) {
          entityRef.value.style.width = `${w * scale.width}px`
          entityRef.value.style.height = `${h * scale.height}px`
        }
        updateScaleRef(scale)
      })
    } else if (type === PreviewScaleEnum.SCROLL_X) {
      hooks = usePreviewScrollXScale(w, h, previewRef.value, scale => {
        if (entityRef.value) {
          entityRef.value.style.width = `${w * scale.width}px`
          entityRef.value.style.height = `${h * scale.height}px`
        }
        updateScaleRef(scale)
      })
    } else {
      hooks = usePreviewFullScale(w, h, previewRef.value, updateScaleRef)
    }

    if (hooks) {
      // Set explicit dimensions for centering
      previewRef.value.style.width = `${w}px`
      previewRef.value.style.height = `${h}px`
      hooks.calcRate()
      hooks.windowResize()
      unWindowResizeFn = hooks.unWindowResize
    }
  }

  // Watch for data changes to re-calculate scale
  watch([width, height, previewScaleType], () => {
    initScale()
  })

  onMounted(() => {
    initScale()
  })

  onUnmounted(() => {
    if (unWindowResizeFn) unWindowResizeFn()
  })

  return {
    entityRef,
    previewRef,
    scaleRef
  }
}
