<template>
  <div class="go-sketch-rule">
    <sketch-rule
      v-if="sketchRuleReDraw"
      :thick="thick"
      :scale="scale"
      :width="canvasBox().width"
      :height="canvasBox().height"
      :startX="startX"
      :startY="startY"
      :lines="lines"
      :palette="paletteStyle"
    >
    </sketch-rule>
    <div ref="$app" class="edit-screens" @scroll="handleScroll">
      <div ref="$container" class="edit-screen-container" :style="{ width: containerWidth }">
        <div
          ref="refSketchRuleBox"
          class="canvas"
          @mousedown="dragCanvas"
          :style="{ marginLeft: '-' + (canvasBox().width / 2 - 25) + 'px' }"
        >
          <div :style="{ pointerEvents: isPressSpace ? 'none' : 'auto' }">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
    <!-- Patch fix cho lỗi điểm trắng góc phải dưới -->
    <!-- <div v-if="designStore.getDarkTheme" class="fix-edit-screens-block"></div> -->
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, toRefs, watch, onUnmounted, computed } from 'vue'
import { listen } from 'dom-helpers'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'
import throttle from 'lodash/throttle'

const chartEditStore = useChartEditStore()
const chartLayoutStore = useChartLayoutStore()
const designStore = useDesignStore()

const thick = 20
let prevMoveXValue = [0, 0]
let prevMoveYValue = [0, 0]

const $app = ref()
const sketchRuleReDraw = ref(true)
const refSketchRuleBox = ref()
const $container = ref()
const isPressSpace = ref(false)
const cursorStyle = ref('auto')
const { width, height } = toRefs(chartEditStore.getEditCanvasConfig)
const startX = ref(0)
const startY = ref(0)
const lines = reactive({ h: [], v: [] })

const scale = computed(() => {
  return chartEditStore.getEditCanvas.scale
})

// thanh cuộnKéo vứt thMộtChiều rộng Width
const containerWidth = computed(() => {
  return `${window.innerWidth * 2}px`
})

// thanh cuộnKéo vứt thMộtChiều cao Height
const containerHeight = computed(() => {
  return `${height.value * 2}px`
})

// chủ đề
const paletteStyle = computed(() => {
  const isDarkTheme = designStore.getDarkTheme
  return isDarkTheme
    ? {
        bgColor: '#18181c',
        longfgColor: '#4d4d4d',
        shortfgColor: '#4d4d4d',
        fontColor: '#4d4d4d',
        shadowColor: '#18181c',
        borderColor: '#18181c',
        cornerActiveColor: '#18181c'
      }
    : {}
})

// Màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// Xử lý chuộtKéo vứt thả
const handleWheel = (e: any) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    let resScale = scale.value
    // phóng to(200%)
    if (e.wheelDelta >= 0 && scale.value < 2) {
      resScale = scale.value + 0.05
      chartEditStore.setScale(resScale)
      return
    }
    // thu nhỏ(10%)
    if (e.wheelDelta < 0 && scale.value > 0.1) {
      resScale = scale.value - 0.05
      chartEditStore.setScale(resScale)
    }
  }
}

// Xử lý thanh cuộn
const handleScroll = () => {
  if (!$app.value) return
  const screensRect = $app.value.getBoundingClientRect()
  const canvasRect = refSketchRuleBox.value.getBoundingClientRect()
  // Người cai trị bắt đầu{{ $t('phase7.auto_430') }}
  startX.value = (screensRect.left + thick - canvasRect.left) / scale.value
  startY.value = (screensRect.top + thick - canvasRect.top) / scale.value
}

// Xử lý kéo và thả
const dragCanvas = (e: any) => {
  e.preventDefault()
  e.stopPropagation()

  if (e.which == 2) isPressSpace.value = true
  else if (!window.$KeyboardActive?.space) return
  // @ts-ignore
  document.activeElement?.blur()

  const startX = e.pageX
  const startY = e.pageY

  const listenMousemove = listen(window, 'mousemove', (e: any) => {
    const nx = e.pageX - startX
    const ny = e.pageY - startY

    const [prevMoveX1, prevMoveX2] = prevMoveXValue
    const [prevMoveY1, prevMoveY2] = prevMoveYValue

    prevMoveXValue = [prevMoveX2, nx]
    prevMoveYValue = [prevMoveY2, ny]

    $app.value.scrollLeft -=
      prevMoveX2 > prevMoveX1 ? Math.abs(prevMoveX2 - prevMoveX1) : -Math.abs(prevMoveX2 - prevMoveX1)
    $app.value.scrollTop -=
      prevMoveY2 > prevMoveY1 ? Math.abs(prevMoveY2 - prevMoveY1) : -Math.abs(prevMoveY2 - prevMoveY1)
  })

  const listenMouseup = listen(window, 'mouseup', () => {
    listenMousemove()
    listenMouseup()
    prevMoveXValue = [0, 0]
    prevMoveYValue = [0, 0]
    isPressSpace.value = false
  })
}

// Tính kích thước canvas
const canvasBox = () => {
  const layoutDom = document.getElementById('go-chart-edit-layout')
  if (layoutDom) {
    // trừ thanh cuộn ở đây{{ $t('phase7.auto_83') }}Và{{ $t('phase7.auto_126') }} 
    const scrollW = 20
    return {
      height: layoutDom.clientHeight - scrollW,
      width: layoutDom.clientWidth - scrollW
    }
  }
  return {
    width: width.value,
    height: height.value
  }
}

// Vẽ lại thước kẻ
const reDraw = throttle(() => {
  sketchRuleReDraw.value = false
  setTimeout(() => {
    sketchRuleReDraw.value = true
  }, 10)
},20)

// trung tâm cuộn
const canvasPosCenter = () => {
  const { width: containerWidth, height: containerHeight } = $container.value.getBoundingClientRect()
  const { width, height } = canvasBox()

  $app.value.scrollLeft = containerWidth / 2 - width / 2
  $app.value.scrollTop = containerHeight / 2 - height / 2
}

// Xử lý các thay đổi chủ đề
watch(
  () => designStore.getDarkTheme,
  () => {
    reDraw()
  }
)

// // Xử lý thay đổi kích thước thước
watch(
  () => scale.value,
  (newValue, oldValue) => {
    if (oldValue !== newValue && chartLayoutStore.getRePositionCanvas) {
      chartLayoutStore.setItemUnHandle(ChartLayoutStoreEnum.RE_POSITION_CANVAS, false)
    }
    handleScroll()
    setTimeout(() => {
        canvasPosCenter()
        reDraw()
    }, 400)
  }
)

// Xử lý các kiểu chuột
watch(
  () => isPressSpace.value,
  newValue => {
    cursorStyle.value = newValue ? 'grab' : 'auto'
  }
)

onMounted(() => {
  if ($app.value) {
    $app.value.addEventListener('wheel', handleWheel, { passive: false })
    canvasPosCenter()
  }
})

onUnmounted(() => {
  if ($app.value) {
    $app.value.removeEventListener('wheel', handleWheel)
  }
})

window.onKeySpacePressHold = (isHold: boolean) => {
  isPressSpace.value = isHold
}
</script>

<style>
/* sử dụng SCSS Sẽ báo lỗi, cứ dùng cái cơ bản nhất là được CSS thực hiện sửa đổi,
Thư viện này có kế hoạch Vue3 phiên bản nhưng được phát triển{{ $t('phase7.auto_10') }}Chưa được phát hành */
#mb-ruler {
  top: 0;
  left: 0;
}

/* đường ngang */
#mb-ruler .v-container .lines .line {
  /* Thu phóng tối đa 200% */
  width: 200vw !important;
  border-top: 1px dashed v-bind('themeColor') !important;
}

#mb-ruler .v-container .indicator {
  border-bottom: 1px dashed v-bind('themeColor') !important;
}

/* đường thẳng đứng */
#mb-ruler .h-container .lines .line {
  /* Thu phóng tối đa 200% */
  height: 200vh !important;
  border-left: 1px dashed v-bind('themeColor') !important;
}

#mb-ruler .h-container .indicator {
  border-left: 1px dashed v-bind('themeColor') !important;
}

/* Giá trị tọa độ{{ $t('phase7.auto_325') }} */
#mb-ruler .indicator .value {
  background-color: rgba(0, 0, 0, 0);
}

/* {{ $t('phase7.auto_87') }}cái nút */
#mb-ruler .line .del {
  padding: 0;
  color: v-bind('themeColor');
  font-size: 26px;
  font-weight: bolder;
}

#mb-ruler .corner {
  border-width: 0 !important;
}
</style>

<style lang="scss" scoped>
@include go('sketch-rule') {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .edit-screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    user-select: none;
    padding-bottom: 0px;

    /* firefox */
    scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
    scrollbar-width: thin;

    /* chrome */
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(144, 146, 152, 0.3);
    }
    // Patch fix cho lỗi điểm trắng góc phải dưới
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }

  .fix-edit-screens-block {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: $--color-dark-bg-1;
  }

  .edit-screen-container {
    position: absolute;
    height: v-bind('containerHeight');
    top: 0;
    left: 0;
  }

  .canvas {
    position: absolute;
    top:50%;
    left: 50%;
    transform-origin: 50% 0;
    transform: translateY(-50%);

    &:hover {
      cursor: v-bind('cursorStyle');
    }

    &:active {
      cursor: crosshair;
    }
  }
}
</style>
