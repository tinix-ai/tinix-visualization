<template>
  <n-modal class="go-chart-create-color" v-model:show="modelShowRef" :mask-closable="false" :closeOnEsc="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 900px; height: 720px">
      <template #header></template>
      <template #header-extra> </template>
      <div class="create-content">
        <div class="create-color-setting-box">
          <create-color-render
            v-if="selectColorId"
            :selectColor="selectColor.selectInfo"
            @updateColor="updateColorHandle"
          ></create-color-render>
          <!-- Báo cáo No-data -->
          <div v-else class="no-data go-flex-center">
            <img :src="noData" :alt="$t('views_components.auto_50')"
 />
            <n-text :depth="3">{{ $t('phase7.auto_458') }}</n-text>
          </div>
        </div>
        <div class="color-list-box">
          <n-timeline class="pond-item-timeline" style="width: 20px">
            <n-timeline-item type="info"> </n-timeline-item>
            <n-timeline-item type="success"></n-timeline-item>
          </n-timeline>
          <div class="color-list">
            <n-space>
              <!-- Thêm+ -->
              <n-button
                class="create-btn"
                :class="{ 'is-full': !!!selectColorId }"
                type="primary"
                :ghost="!!!selectColorId"
                :secondary="!!selectColorId"
                @click="createColor"
              >
                <span> {{ $t('phase7.auto_494') }} </span>
                <template #icon>
                  <n-icon>
                    <duplicate-outline-icon></duplicate-outline-icon>
                  </n-icon>
                </template>
              </n-button>
              <n-badge v-if="selectColorId" :show="updateColor !== undefined" dot>
                <n-button class="create-btn" type="info" secondary @click="saveHandle">
                  <span> {{ $t('phase7.auto_16') }} </span>
                  <template #icon>
                    <n-icon>
                      <arrow-down-icon></arrow-down-icon>
                    </n-icon>
                  </template>
                </n-button>
              </n-badge>
            </n-space>
            <n-divider style="margin: 10px 0"></n-divider>
            <n-text v-if="!selectColorId" class="not-data-text" :depth="3">
              {{ $t('phase7.auto_465') }}，
              <n-a @click="createColor">{{ $t('phase7.auto_466') }}</n-a>
            </n-text>
            <!-- Danh sách -->
            <div class="color-card-box" v-for="(item, index) in colorList" :key="index">
              <n-card
                class="color-card"
                :class="{ selected: item.id === selectColorId }"
                size="small"
                hoverable
                embedded
                @click="selectHandle(item)"
              >
                <div class="go-flex-items-center">
                  <n-ellipsis style="text-align: left; width: 70px">{{ item.name }} </n-ellipsis>
                  <span
                    class="theme-color-item"
                    v-for="(colorItem, index) in item.color"
                    :key="index"
                    :style="{ backgroundColor: colorItem }"
                  ></span>
                </div>
                <div class="theme-bottom" :style="{ backgroundImage: colorBackgroundImage(item) }"></div>
              </n-card>
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button text :disabled="item.id === selectThemeColor" @click="deleteHandle(index)">
                    <n-icon class="go-ml-1 go-cursor-pointer" size="16" :depth="3">
                      <trash-icon></trash-icon>
                    </n-icon>
                  </n-button>
                </template>
                {{ $t('phase7.auto_250') }}
              </n-tooltip>
            </div>
          </div>
        </div>
      </div>
      <!-- Dưới cùng -->
      <template #action>
        <n-space justify="end">
          <n-button @click="closeHandle">{{ $t('phase7.auto_261') }}</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch, computed, reactive, nextTick, onMounted } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import noData from '@/assets/images/canvas/noData.png'
import { getUUID, goDialog } from '@/utils'
import { icon } from '@/plugins'
import { UvIndex } from '@vicons/carbon'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { CreateColorRender } from '../CreateColorRender/index'

const props = defineProps({
  modelShow: Boolean
})
const emit = defineEmits(['update:modelShow', 'editSaveHandle'])
const { DuplicateOutlineIcon, TrashIcon, ArrowDownIcon } = icon.ionicons5

type ColorType = {
  id: string
  name: string
  color: string[]
}

// mặc địnhMàu sắcNhóm
const defaultColor: ColorType = {
  id: getUUID(),
  name: window['$t']('views_components.auto_49'),
  color: ['#6ae5bb', '#69e3de', '#5ac5ee', '#5ac4ee', '#4498ec', '#3c7ddf']
}
const chartEditStore = useChartEditStore()
const modelShowRef = ref(false)
// Màu sắcDanh sách
let colorList = reactive<Array<ColorType>>(chartEditStore.getEditCanvasConfig.chartCustomThemeColorInfo || [])
// thành phần phụ đã được cập nhậtDữ liệu
const updateColor = ref<ColorType | undefined>(undefined)
// đã chọnMàu sắc
const selectColor = reactive<{
  selectInfo: ColorType | undefined
}>({
  selectInfo: colorList[0]
})

watch(
  () => props.modelShow,
  newValue => {
    modelShowRef.value = newValue
    if (newValue) {
      // Được chọn theo mặc định
      if (colorList.length) selectColor.selectInfo = colorList[0]
    }
  }
)

// {{ $t('phase7.auto_80') }}đã chọn ID
const selectColorId = computed(() => selectColor?.selectInfo?.id)

// {{ $t('phase7.auto_218') }}Chủ đề đã chọn
const selectThemeColor = computed(() => chartEditStore.getEditCanvasConfig.chartThemeColor)

// chọn
const selectHandle = (item: ColorType) => {
  if (item.id === selectColorId.value) return
  if (updateColor.value !== undefined) {
    goDialog({
      message: window['$t']('views_components.auto_51'),
      onPositiveCallback: () => {
        updateColor.value = undefined
        selectColor.selectInfo = item
      }
    })
  } else {
    selectColor.selectInfo = item
  }
}

// {{ $t('phase7.auto_494') }}
const createColor = () => {
  const positiveHandle = () => {
    const newData = { ...cloneDeep(defaultColor), id: getUUID() }
    selectColor.selectInfo = newData
    colorList.push(newData)
    selectHandle(newData)
    updateColor.value = newData
    saveHandle(false)
  }
  if (updateColor.value !== undefined) {
    goDialog({
      message: window['$t']('views_components.auto_51'),
      onPositiveCallback: () => {
        updateColor.value = undefined
        positiveHandle()
      }
    })
  } else {
    positiveHandle()
  }
}

// {{ $t('phase7.auto_87') }}
const deleteHandle = (index: number) => {
  const positiveHandle = () => {
    colorList.splice(index, 1)
    chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.CHART_CUSTOM_THEME_COLOR_INFO, cloneDeep(colorList))
    nextTick(() => {
      if (colorList.length) {
        selectHandle(colorList[index - 1 > -1 ? index - 1 : index])
      } else {
        // Đã xóa
        selectColor.selectInfo = undefined
      }
    })
  }
  if (updateColor.value !== undefined) {
    goDialog({
      message: window['$t']('views_components.auto_51'),
      onPositiveCallback: () => {
        updateColor.value = undefined
        positiveHandle()
      }
    })
  } else {
    goDialog({
      message: window['$t']('phase7.auto_393'),
      onPositiveCallback: () => {
        positiveHandle()
      }
    })
  }
}

// Cập nhật cửa hàngDữ liệugiá trị
const updateColorHandle = (newColor: ColorType) => {
  updateColor.value = newColor
}

// {{ $t('phase7.auto_447') }}Dữ liệu
const saveHandle = (onMessage = true) => {
  if (!updateColor.value) return
  const index = colorList.findIndex(item => item.id === updateColor.value?.id)
  if (index !== -1) {
    onMessage && window.$message.success(window['$t']('views_components.auto_46'))
    const updateColorPrefix = cloneDeep({ ...updateColor.value, name: updateColor.value.name || window['$t']('views_components.auto_47') })
    colorList.splice(index, 1, updateColorPrefix)
    updateColor.value = undefined
    const selectTheme = chartEditStore.getEditCanvasConfig.chartThemeColor
    // Chuyển đổiChủ đề cập nhật màu gradient bắt buộc
    chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.CHART_THEME_COLOR, 'dark')
    // Lưu trữ trên toàn cầuDữ liệuở giữa
    nextTick(() => {
      chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.CHART_CUSTOM_THEME_COLOR_INFO, cloneDeep(colorList))
      chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.CHART_THEME_COLOR, selectTheme)
    })
  } else {
    window.$message.error(window['$t']('views_components.auto_48'))
  }
}

// đóng cửa
const closeHandle = () => {
  const positiveHandle = () => {
    updateColor.value = undefined
    selectColor.selectInfo = undefined
    emit('update:modelShow', false)
  }

  if (updateColor.value !== undefined) {
    goDialog({
      message: window['$t']('views_components.auto_51'),
      onPositiveCallback: () => {
        positiveHandle()
      }
    })
  } else {
    positiveHandle()
  }
}

// màu nền
const colorBackgroundImage = (item: ColorType) => {
  return `linear-gradient(to right, ${item.color[0]} 0%, ${item.color[5]} 100%)`
}
</script>

<style scoped lang="scss">
$height: 600px;
$listWidth: 280px;
$color-radius: 8px;
$color-item-radius: 4px;

@include go('chart-create-color') {
  .create-content {
    display: flex;
    /* {{ $t('phase7.auto_334') }}bên */
    .create-color-setting-box {
      flex: 1;
      .no-data {
        flex-direction: column;
        width: 100%;
        height: 100%;
        img {
          width: 200px;
        }
      }
    }
    /* Danh sách */
    .color-list-box {
      display: flex;
      padding-top: 10px;
      margin-right: 5px;
      .pond-item-timeline > .n-timeline-item {
        &:first-child {
          height: $height;
        }
      }
      .color-list {
        width: $listWidth;
        position: relative;
        padding-right: 8px;
        .create-btn {
          width: 133px;
          &.is-full {
            width: 280px;
          }
        }
        .not-data-text {
          display: block;
          text-align: center;
        }
        .color-card-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 15px;
          &:first-child {
            margin-top: 0;
          }
          .color-card {
            overflow: hidden;
            cursor: pointer;
            border-radius: $color-radius;
            border: 2px solid rgba(0, 0, 0, 0);
            border-bottom: 1px solid rgba(0, 0, 0, 0);
            @include fetch-bg-color('background-color4-shallow');

            @include deep() {
              & > .n-card__content {
                padding: 7px;
                padding-top: 10px;
                padding-bottom: 10px;
              }
            }
            &.selected {
              border: 2px solid var(--n-color-target);
              border-bottom: 1px solid rgba(0, 0, 0, 0);
            }
            .go-flex-items-center {
              justify-content: space-between;
              margin-top: -4px;
            }
            .theme-color-item {
              display: inline-block;
              width: 16px;
              height: 16px;
              border-radius: $color-item-radius;
            }
            .theme-bottom {
              position: absolute;
              left: 0;
              bottom: 0px;
              width: 100%;
              height: 3px;
            }
          }
        }
      }
    }
  }
  &.n-card.n-modal,
  .n-card {
    @extend .go-background-filter;
  }
  .n-card-shallow {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  @include deep() {
    & > .n-card__content {
      padding-right: 0;
    }
  }
}
</style>
