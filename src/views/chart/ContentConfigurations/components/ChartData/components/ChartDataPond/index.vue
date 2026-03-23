<template>
  <!-- Data Select -->
  <div class="go-chart-data-pond">
    <n-card class="n-card-shallow">
      <setting-item-box :name="$t('views_components.auto_150')"
 :alone="true">
        <n-input size="small" :placeholder="pondData?.dataPondName || window['$t']('views_components.auto_112')" :disabled="true">
          <template #prefix>
            <n-icon :component="FishIcon" />
          </template>
        </n-input>
      </setting-item-box>

      <setting-item-box :name="$t('views_components.auto_151')"
 :alone="true">
        <n-input size="small" :placeholder="pondData?.dataPondRequestConfig.requestUrl || window['$t']('views_components.auto_112')" :disabled="true">
          <template #prefix>
            <n-icon :component="FlashIcon" />
          </template>
        </n-input>
      </setting-item-box>

      <div class="edit-text" @click="controlModelHandle">
        <div class="go-absolute-center">
          <n-button type="primary" secondary>{{ $t('phase7.auto_138') }}</n-button>
        </div>
      </div>
    </n-card>
  </div>

  <setting-item-box :alone="true">
    <template #name>
      Kiểm thử
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-icon size="21" :depth="3">
            <help-outline-icon></help-outline-icon>
          </n-icon>
        </template>
        Mặc định gán Value vào `dataset`
      </n-tooltip>
    </template>
    <n-button type="primary" ghost @click="sendHandle">
      <template #icon>
        <n-icon>
          <flash-icon />
        </n-icon>
      </template>
      gửiReuqest Data
    </n-button>
  </setting-item-box>

  <!-- Dưới cùngDữ liệuXem / Hát -->
  <chart-data-matching-and-show :show="showMatching && !loading" :ajax="true"></chart-data-matching-and-show>

  <!-- Khung Skeleton -->
  <go-skeleton :load="loading" :repeat="3"></go-skeleton>

  <!-- Sửa (Edit) / Thêm+Bảng Tooltip -->
  <chart-data-pond-control v-model:modelShow="controlModel" @sendHandle="sendHandle"></chart-data-pond-control>
</template>

<script setup lang="ts">
import { ref, toRefs, toRaw, onBeforeUnmount, computed, watchEffect } from 'vue'
import { icon } from '@/plugins'
import { http, customizeHttp } from '@/api/http'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { ChartDataPondControl } from './components/ChartDataPondControl'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow'
import { newFunctionHandle } from '@/utils'

const designStore = useDesignStore()
const { HelpOutlineIcon, FlashIcon, PulseIcon, FishIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()

const {
  requestDataPond,
  requestInterval: GlobalRequestInterval,
  requestIntervalUnit: GlobalRequestIntervalUnit
} = toRefs(chartEditStore.getRequestGlobalConfig)

const loading = ref(false)
const controlModel = ref(false)
const showMatching = ref(false)

let firstFocus = 0
let lastFilter: any = undefined

// đã chọnDữ liệuhồ bơi
const pondData = computed(() => {
  const selectId = targetData.value.request.requestDataPondId
  if (!selectId) return undefined
  const data = requestDataPond.value.filter(item => {
    return selectId === item.dataPondId
  })
  return data[0]
})

// Màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// Reuqest DataCấu hình model
const controlModelHandle = () => {
  controlModel.value = true
}

// gửiReuqest Data
const sendHandle = async () => {
  if (!targetData.value?.request) {
    window.$message.warning(window['$t']('views_components.auto_149'))
    return
  }
  loading.value = true
  try {
    const res = await customizeHttp(toRaw(targetData.value.request), toRaw(chartEditStore.getRequestGlobalConfig))
    loading.value = false
    if (res) {
      if (!res?.data && !targetData.value.filter) {
        window['$message'].warning(window['$t']('views_components.auto_109'))
        showMatching.value = true
        return
      }
      targetData.value.option.dataset = newFunctionHandle(res?.data, res, targetData.value.filter)
      showMatching.value = true
      return
    }
    window['$message'].warning(window['$t']('views_components.auto_108'))
  } catch (error) {
    console.error(error);
    loading.value = false
    window['$message'].warning(window['$t']('views_components.auto_104'))
  }
}

watchEffect(() => {
  const filter = targetData.value?.filter
  if (lastFilter !== filter && firstFocus) {
    lastFilter = filter
    sendHandle()
  }
  firstFocus++
})

onBeforeUnmount(() => {
  lastFilter = null
})
</script>

<style scoped lang="scss">
@include go('chart-data-pond') {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .n-card-shallow {
    &.n-card {
      @extend .go-background-filter;
      @include deep() {
        .n-card__content {
          padding: 10px;
        }
      }
    }
    .edit-text {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 325px;
      height: 136px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.3s;
      @extend .go-background-filter;
      backdrop-filter: blur(2px) !important;
    }
    &:hover {
      border-color: v-bind('themeColor');
      .edit-text {
        opacity: 1;
      }
    }
  }
}
</style>
