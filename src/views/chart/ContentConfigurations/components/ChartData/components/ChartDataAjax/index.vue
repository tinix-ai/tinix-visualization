<template>
  <div class="go-chart-configurations-data-ajax">
    <n-card class="n-card-shallow" size="small">
      <n-space vertical :size="12">
        <!-- Dataset Info Title -->
        <div class="go-flex-items-center">
           <n-text strong depth="1" style="font-size: 15px;">{{ $t('views_components.auto_100') }}</n-text>
           <n-button quaternary size="tiny" type="primary" class="go-ml-auto" @click="requestModelHandle">
             {{ $t('phase7.auto_138') }}
           </n-button>
        </div>

        <n-grid :cols="2" :x-gap="12" :y-gap="8">
          <n-gi>
            <n-text depth="3">Kiểu nội dung</n-text>
            <n-tag :bordered="false" type="primary" size="small" style="width: 100%; justify-content: center;">
              {{ targetData.request.requestContentType === RequestContentTypeEnum.DEFAULT ? windowAny['$t']('views_components.auto_111') : windowAny['$t']('views_components.auto_101') }}
            </n-tag>
          </n-gi>
          <n-gi>
            <n-text depth="3">Phương thức</n-text>
            <n-tag :bordered="false" type="info" size="small" style="width: 100%; justify-content: center;">
              {{ targetData.request.requestHttpType || 'GET' }}
            </n-tag>
          </n-gi>
        </n-grid>

        <div>
          <n-text depth="3">Địa chỉ giao diện (Cơ sở)</n-text>
          <n-input size="small" :placeholder="requestOriginUrl || 'Chưa cấu hình'" :disabled="true">
            <template #prefix>
              <n-icon :component="PulseIcon" />
            </template>
          </n-input>
        </div>

        <div>
           <n-text depth="3">Tham số Request URL</n-text>
           <n-input size="small" :placeholder="targetData.request.requestUrl || 'Chưa cấu hình'" :disabled="true">
            <template #prefix>
              <n-icon :component="FlashIcon" />
            </template>
          </n-input>
        </div>
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
            Gửi yêu cầu để lấy dữ liệu thực tế và kiểm tra ánh xạ.
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
    
    <!-- Form Config Request -->
    <chart-data-request
      v-model:modelShow="requestShow"
      :targetData="targetData"
      @sendHandle="sendHandle"
    ></chart-data-request>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, onBeforeUnmount, watchEffect, toRaw } from 'vue'
import { icon } from '@/plugins'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { ChartDataRequest } from '../ChartDataRequest/index'
import { RequestHttpEnum, ResultEnum, SelectHttpTimeNameObj, RequestContentTypeEnum } from '@/enums/httpEnum'
import { chartDataUrl, rankListUrl, scrollBoardUrl, numberFloatUrl, numberIntUrl, textUrl, imageUrl } from '@/api/mock'
import { http, customizeHttp } from '@/api/http'
import { SelectHttpType } from '../../index.d'
import { ChartDataMatchingAndShow } from '../ChartDataMatchingAndShow'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { newFunctionHandle } from '@/utils'

const { HelpOutlineIcon, FlashIcon, PulseIcon } = icon.ionicons5
const { targetData, chartEditStore } = useTargetData()

const windowAny = window as any

const {
  requestOriginUrl,
  requestInterval: GlobalRequestInterval,
  requestIntervalUnit: GlobalRequestIntervalUnit
} = toRefs(chartEditStore.getRequestGlobalConfig)
const designStore = useDesignStore()

// liệuXem / HátDữ liệu{{ $t('phase7.auto_434') }}phân tích
const loading = ref(false)
const requestShow = ref(false)
const showMatching = ref(false)

let firstFocus = 0
let lastFilter: any = undefined

// Reuqest DataCấu hình model
const requestModelHandle = () => {
  requestShow.value = true
}

// gửiReuqest Data
const sendHandle = async () => {
  if (!targetData.value?.request) return
  loading.value = true
  try {
    const res = await customizeHttp(toRaw(targetData.value.request), toRaw(chartEditStore.getRequestGlobalConfig))
    loading.value = false
    if (res) {
      const { data } = res
      if (!data && !targetData.value.filter) {
        windowAny['$message'].warning(windowAny['$t']('views_components.auto_109'))
        showMatching.value = true
        return
      }
      targetData.value.option.dataset = newFunctionHandle(data, res, targetData.value.filter)
      showMatching.value = true
      return
    }
    windowAny['$message'].warning(windowAny['$t']('views_components.auto_108'))
  } catch (error) {
    console.error(error);
    loading.value = false
    windowAny['$message'].warning(windowAny['$t']('views_components.auto_104'))
  }
}

// Màu sắc
const themeColor = computed(() => {
  return designStore.getAppTheme
})

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

<style lang="scss" scoped>
@include go('chart-configurations-data-ajax') {
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
      height: 270px;
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
