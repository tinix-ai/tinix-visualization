<template>
  <!-- Data Select -->
  <div class="go-chart-data-pond">
    <n-card class="n-card-shallow" size="small">
      <n-space vertical :size="12">
        <!-- Dataset Info Title -->
        <div class="go-flex-items-center">
           <n-text strong depth="1" style="font-size: 15px;">{{ $t('views_components.auto_150') }}</n-text>
           <n-button quaternary size="tiny" type="primary" class="go-ml-auto" @click="controlModelHandle">
             {{ $t('phase7.auto_138') }}
           </n-button>
        </div>

        <n-grid :cols="1" :y-gap="8">
          <n-gi>
            <n-text depth="3">Tên nguồn dữ liệu</n-text>
            <n-input size="small" :placeholder="pondData?.dataPondName || 'Chưa chọn nguồn'" :disabled="true">
              <template #prefix>
                <n-icon :component="FishIcon" />
              </template>
            </n-input>
          </n-gi>
          <n-gi>
            <n-text depth="3">Địa chỉ giao diện (Pond)</n-text>
            <n-input size="small" :placeholder="pondData?.dataPondRequestConfig.requestUrl || 'Chưa cấu hình'" :disabled="true">
              <template #prefix>
                <n-icon :component="FlashIcon" />
              </template>
            </n-input>
          </n-gi>
        </n-grid>
      </n-space>
    </n-card>

    <div class="go-mt-4">
      <setting-item-box :alone="true">
        <template #name>
          Kiểm thử dữ liệu
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon size="18" :depth="3" style="cursor: help;">
                <help-outline-icon></help-outline-icon>
              </n-icon>
            </template>
            Lấy dữ liệu từ Data Pond và cập nhật cho biểu đồ.
          </n-tooltip>
        </template>
        <n-button type="primary" block secondary @click="sendHandle">
          <template #icon>
            <n-icon>
              <flash-icon />
            </n-icon>
          </template>
          Gửi Request & Cập nhật
        </n-button>
      </setting-item-box>
    </div>

    <!-- Dưới cùngDữ liệuXem / Hát -->
    <chart-data-matching-and-show :show="showMatching && !loading" :ajax="true"></chart-data-matching-and-show>

    <!-- Khung Skeleton -->
    <go-skeleton :load="loading" :repeat="3"></go-skeleton>

    <!-- Sửa (Edit) / Thêm+Bảng Tooltip -->
    <chart-data-pond-control v-model:modelShow="controlModel" @sendHandle="sendHandle"></chart-data-pond-control>
  </div>
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

const windowAny = window as any

const {
  requestDataPond,
  requestInterval: GlobalRequestInterval,
  requestIntervalUnit: GlobalRequestIntervalUnit
} = toRefs(chartEditStore.getRequestGlobalConfig)
const { appTheme } = toRefs(designStore)

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

// Reuqest DataCấu hình model
const controlModelHandle = () => {
  controlModel.value = true
}

// gửiReuqest Data
const sendHandle = async () => {
  if (!targetData.value?.request) {
    windowAny['$message'].warning(windowAny['$t']('views_components.auto_149'))
    return
  }
  loading.value = true
  try {
    const res = await customizeHttp(toRaw(targetData.value.request), toRaw(chartEditStore.getRequestGlobalConfig))
    loading.value = false
    if (res) {
      if (!res?.data && !targetData.value.filter) {
        windowAny['$message'].warning(windowAny['$t']('views_components.auto_109'))
        showMatching.value = true
        return
      }
      targetData.value.option.dataset = newFunctionHandle(res?.data, res, targetData.value.filter)
      showMatching.value = true
      return
    }
    windowAny['$message'].warning(windowAny['$t']('views_components.auto_108'))
  } catch (error: any) {
    console.error('[Data Pond Error]', error);
    loading.value = false
    
    // Provide detailed diagnostic message
    const diagnostic = error.diagnostic ? ` (${error.diagnostic})` : ''
    const status = error.response?.status
    
    let msg = windowAny['$t'] ? windowAny['$t']('views_components.auto_104') : "Lỗi kết nối dữ liệu"
    if (status === 404) {
       msg = `Không tìm thấy nguồn dữ liệu (404)${diagnostic}`
    } else if (status) {
       msg = `Lỗi máy chủ (${status})${diagnostic}`
    } else {
       msg = `${msg}${diagnostic}`
    }

    if (targetData.value.option.dataset) {
      windowAny['$message'].warning(`${msg}. Đang giữ lại dữ liệu cũ.`)
      showMatching.value = true
    } else {
      windowAny['$message'].error(msg)
    }
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
      border-color: v-bind('appTheme');
      .edit-text {
        opacity: 1;
      }
    }
  }
}
</style>
