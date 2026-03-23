<template>
  <!-- Config Item -->
  <n-divider class="go-my-3" title-placement="left"></n-divider>
  <setting-item-box
    :itemRightStyle="{
      gridTemplateColumns: '6fr 2fr'
    }"
    style="padding-right: 25px"
  >
    <template #name>
      URL
      <n-tooltip trigger="hover" v-if="isDev()">
        <template #trigger>
          <n-icon size="21" :depth="3">
            <help-outline-icon></help-outline-icon>
          </n-icon>
        </template>
        <ul class="go-pl-0">
          Môi trường dev lấy Mock Data, hãy nhập vào
          <li v-for="item in apiList" :key="item.value">
            <n-text type="info"> {{ item.value }} </n-text>
          </li>
        </ul>
      </n-tooltip>
    </template>
    <setting-item :name="$t('views_components.auto_200')"
>
      <n-input-group>
        <n-select class="select-type-options" v-model:value="requestHttpType" :options="selectTypeOptions" />
        <n-input v-model:value.trim="requestUrl" :min="1" :placeholder="$t('views_components.auto_197')"
>
          <template #prefix>
            <n-text>{{ requestOriginUrl }}</n-text>
            <n-divider vertical />
          </template>
        </n-input>
      </n-input-group>
      <!-- thành phầnurl -->
    </setting-item>
    <setting-item :name="$t('views_components.auto_187')"
>
      <n-input-group>
        <n-input-number
          v-model:value.trim="requestInterval"
          class="select-time-number"
          min="0"
          :show-button="false"
          :placeholder="$t('views_components.auto_198')"

        >
        </n-input-number>
        <!-- Đơn vị -->
        <n-select class="select-time-options" v-model:value="requestIntervalUnit" :options="selectTimeOptions" />
      </n-input-group>
    </setting-item>
  </setting-item-box>
  <setting-item-box :name="$t('views_components.auto_199')"
 class="go-mt-0">
    <request-header :targetDataRequest="targetDataRequest"></request-header>
  </setting-item-box>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '@/views/chart/ContentConfigurations/components/hooks/useTargetData.hook'
import { selectTypeOptions, selectTimeOptions } from '@/views/chart/ContentConfigurations/components/ChartData/index.d'
import { RequestConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import { RequestHeader } from '../RequestHeader'
import { isDev } from '@/utils'
import { icon } from '@/plugins'
import {
  graphUrl,
  chartDataUrl,
  chartSingleDataUrl,
  rankListUrl,
  scrollBoardUrl,
  numberFloatUrl,
  numberIntUrl,
  textUrl,
  imageUrl,
  radarUrl,
  heatMapUrl,
  scatterBasicUrl,
  mapUrl,
  capsuleUrl,
  wordCloudUrl,
  treemapUrl,
  threeEarth01Url,
  sankeyUrl,
  vchartBarDataUrl
} from '@/api/mock'

const props = defineProps({
  targetDataRequest: Object as PropType<RequestConfigType>
})

const { HelpOutlineIcon } = icon.ionicons5
const { chartEditStore } = useTargetData()
const { requestOriginUrl } = toRefs(chartEditStore.getRequestGlobalConfig)
const { requestInterval, requestIntervalUnit, requestHttpType, requestUrl } = toRefs(
  props.targetDataRequest as RequestConfigType
)

const apiList = [
  {
    value: `${ window['$t']('phase6.auto_3') }${chartDataUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_4') }${chartSingleDataUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_5') }${textUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_6') }${numberIntUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_7') }${numberFloatUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_8') }${imageUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_9') }${rankListUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_10') }${scrollBoardUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_11') }${radarUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_12') }${heatMapUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_13') }${scatterBasicUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_14') }${mapUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_15') }${capsuleUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_16') }${wordCloudUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_17') }${treemapUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_18') }${threeEarth01Url}`
  },
  {
    value: `${ window['$t']('phase6.auto_19') }${sankeyUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_20') }${graphUrl}`
  },
  {
    value: `${ window['$t']('phase6.auto_21') }${vchartBarDataUrl}`
  },
]
</script>

<style lang="scss" scoped>
.select-time-number {
  width: 100%;
}
.select-time-options {
  width: 100px;
}
.select-type-options {
  width: 120px;
}
</style>
