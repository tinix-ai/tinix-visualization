<template>
  <div class="go-edit-bottom">
    <n-space>
      <!-- Lịch Sử Undo -->
      <edit-history></edit-history>
      <!-- CTRLNút kích hoạtXem / Hát -->
      <n-text id="keyboard-dress-show" depth="3"></n-text>
    </n-space>

    <n-space class="bottom-ri">
      <!-- Phím tắt nhanhMẹo -->
      <edit-shortcut-key />

      <!-- Zoom Ratio (%) -->
      <n-select
        ref="selectInstRef"
        class="scale-btn"
        v-model:value="filterValue"
        size="mini"
        :disabled="lockScale"
        :options="filterOptions"
        @update:value="selectHandle"
      ></n-select>

      <!-- Lock Zoom -->
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button @click="lockHandle" text>
            <n-icon class="lock-icon" :class="{ color: lockScale }" size="18" :depth="2">
              <lock-closed-outline-icon v-if="lockScale"></lock-closed-outline-icon>
              <lock-open-outline-icon v-else></lock-open-outline-icon>
            </n-icon>
          </n-button>
        </template>
        <span>{{ $t('phase7.auto_317') }}</span>
      </n-tooltip>

      <!-- Kéo vứt thả -->
      <n-slider
        class="scale-slider"
        v-model:value="sliderValue"
        :default-value="50"
        :min="10"
        :max="200"
        :step="5"
        :format-tooltip="sliderFormatTooltip"
        :disabled="lockScale"
        :marks="sliderMaks"
        @update:value="sliderHandle"
      ></n-slider>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { SelectInst } from 'naive-ui'
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { icon } from '@/plugins'
import { EditHistory } from '../EditHistory/index'
import EditShortcutKey from '../EditShortcutKey/index.vue'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore'
import { ChartLayoutStoreEnum } from '@/store/modules/chartLayoutStore/chartLayoutStore.d'

const { LockClosedOutlineIcon, LockOpenOutlineIcon } = icon.ionicons5

// tình hình chungMàu sắc
const designStore = useDesignStore()
const themeColor = ref(designStore.getAppTheme)
const chartLayoutStore = useChartLayoutStore()
const chartEditStore = useChartEditStore()
const { lockScale, scale } = toRefs(chartEditStore.getEditCanvas)
const selectInstRef = ref<SelectInst | null>(null)

// Tùy chọn thu phóng
let filterOptions = [
  {
    label: '200%',
    value: 200
  },
  {
    label: '150%',
    value: 150
  },
  {
    label: '100%',
    value: 100
  },
  {
    label: '50%',
    value: 50
  },
  {
    label: window['$t']('views_components.auto_30'),
    value: 0
  }
]

// Chọn giá trị
const filterValue = ref('')

// Lựa chọn của người dùng
const selectHandle = (v: number) => {
  selectInstRef.value?.blur()
  if (v === 0) {
    chartLayoutStore.setItemUnHandle(ChartLayoutStoreEnum.RE_POSITION_CANVAS, true)
    chartEditStore.computedScale()
    return
  }
  chartEditStore.setScale(v / 100)
}

// Bấm vào xử lý khóa
const lockHandle = () => {
  chartEditStore.setEditCanvas(EditCanvasTypeEnum.LOCK_SCALE, !lockScale.value)
}

// Kéo vứt thả
const sliderValue = ref(100)

// Kéo vứt thhình ảnhĐịnh dạng
const sliderFormatTooltip = (v: string) => `${v}%`

// Kéo vứt thhình ảnhĐang xử lý
const sliderHandle = (v: number) => {
  chartEditStore.setScale(v / 100)
}

const sliderMaks = reactive({
  100: ''
})

// màn hình scale thay đổi
watchEffect(() => {
  const value = (scale.value * 100).toFixed(0)
  filterValue.value = `${value}%`
  sliderValue.value = parseInt(value)
})
</script>

<style lang="scss" scoped>
$min-width: 500px;
$max-width: 670px;
@include go('edit-bottom') {
  width: 100%;
  min-width: $min-width;
  min-width: $max-width;
  padding: 0 10px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bottom-ri {
    position: relative;
    top: 15px;
    .lock-icon {
      padding-top: 4px;
      &.color {
        color: v-bind('themeColor');
      }
    }
    .scale-btn {
      width: 90px;
      font-size: 12px;
      @include deep() {
        .n-base-selection-label {
          padding: 3px;
        }
      }
    }
    .scale-slider {
      position: relative;
      top: -4px;
      width: 100px;
    }
  }
}
</style>
