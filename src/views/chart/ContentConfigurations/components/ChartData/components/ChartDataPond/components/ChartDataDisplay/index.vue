<template>
  <div class="go-chart-data-display">
    <n-scrollbar style="max-height: 570px">
      <div class="go-mr-3">
        <div>
          <setting-item-box :name="$t('views_components.auto_157')"
>
            <setting-item :name="$t('views_components.auto_163')"
>
              <n-input size="small" :placeholder="targetData?.dataPondName || window['$t']('views_components.auto_112')" :disabled="true"> </n-input>
            </setting-item>
            <setting-item :name="$t('views_components.auto_161')"
>
              <n-input size="small" :placeholder="requestHttpType || window['$t']('views_components.auto_112')" :disabled="true"></n-input>
            </setting-item>
          </setting-item-box>

          <setting-item-box>
            <setting-item :name="$t('views_components.auto_105')"
>
              <n-input size="small" :placeholder="`${requestInterval || window['$t']('views_components.auto_112')}`" :disabled="true">
                <template #suffix>
                  {{ targetData && SelectHttpTimeNameObj[requestIntervalUnit] }}
                </template>
              </n-input>
            </setting-item>
            <setting-item :name="$t('views_components.auto_102')"
>
              <n-input size="small" :placeholder="`${globalData?.requestInterval || window['$t']('views_components.auto_112')}`" :disabled="true">
                <template #suffix> {{ globalData && SelectHttpTimeNameObj[globalData.requestIntervalUnit] }} </template>
              </n-input>
            </setting-item>
          </setting-item-box>

          <setting-item-box :name="$t('views_components.auto_107')"
 :alone="true">
            <n-input size="small" :placeholder="globalData?.requestOriginUrl || window['$t']('views_components.auto_112')" :disabled="true">
              <template #prefix>
                <n-icon :component="PulseIcon" />
              </template>
            </n-input>
          </setting-item-box>

          <setting-item-box :name="$t('views_components.auto_151')"
 :alone="true">
            <n-input
              size="small"
              :placeholder="requestUrl || window['$t']('views_components.auto_112')"
              :disabled="true"
            >
              <template #prefix>
                <n-icon :component="FlashIcon" />
              </template>
            </n-input>
          </setting-item-box>
        </div>
        <n-divider />
        <setting-item-box :name="$t('views_components.auto_103')"
>
          <setting-item :name="$t('views_components.auto_156')"
>
            <n-input
              size="small"
              :placeholder="targetData && requestContentTypeObj[requestContentType]"
              :disabled="true"
            ></n-input>
          </setting-item>
          <setting-item :name="$t('views_components.auto_162')"
 v-if="requestContentType === RequestContentTypeEnum.DEFAULT">
            <n-input size="small" :placeholder="targetData && requestParamsBodyType" :disabled="true"></n-input>
          </setting-item>
        </setting-item-box>
        <div v-if="requestContentType === RequestContentTypeEnum.DEFAULT">
          <n-tabs type="line" animated v-model:value="tabValue">
            <n-tab v-for="item in RequestParamsTypeEnum" :key="item" :name="item" :tab="item"> {{ item }} </n-tab>
          </n-tabs>
          <!-- Mọi page View -->
          <div class="go-mt-3">
            <div v-if="tabValue !== RequestParamsTypeEnum.BODY">
              <display-table class="go-my-3" :target="requestParams[tabValue]"> </display-table>
            </div>

            <!-- đã chọn body -->
            <div v-else>
              <!-- vì none Giờ -->
              <n-card class="go-mt-3 go-pb-3" v-if="requestParamsBodyType === RequestBodyEnum['NONE']">
                <n-text depth="3">{{ $t('phase7.auto_19') }}</n-text>
              </n-card>

              <!-- Có thuộc tính đối tượngGiờ -->
              <template
                v-else-if="
                  requestParamsBodyType === RequestBodyEnum['FORM_DATA'] ||
                  requestParamsBodyType === RequestBodyEnum['X_WWW_FORM_URLENCODED']
                "
              >
                <display-table
                  class="go-my-3"
                  :target="requestParams[RequestParamsTypeEnum.BODY][requestParamsBodyType]"
                ></display-table>
              </template>

              <!-- json  -->
              <template v-else-if="requestParamsBodyType === RequestBodyEnum['JSON']">
                <n-card size="small" style="padding-bottom: 7px">
                  <n-code
                    :code="requestParams[RequestParamsTypeEnum.BODY][requestParamsBodyType] || window['$t']('views_components.auto_158')"
                    language="json"
                  ></n-code>
                </n-card>
              </template>

              <!-- xml  -->
              <template v-else-if="requestParamsBodyType === RequestBodyEnum['XML']">
                <n-code
                  :code="requestParams[RequestParamsTypeEnum.BODY][requestParamsBodyType] || ''"
                  language="html"
                ></n-code>
              </template>
            </div>
          </div>
        </div>
        <!-- SQL Reuqest Data -->
        <div v-else>
          <setting-item-box :name="$t('views_components.auto_155')"
>
            <n-text>sql</n-text>
          </setting-item-box>
          <setting-item-box :name="$t('views_components.auto_159')"
>
            <n-code :code="requestSQLContent.sql || ''" language="sql"></n-code>
          </setting-item-box>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue'
import { icon } from '@/plugins'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { RequestDataPondItemType, RequestGlobalConfigType } from '@/store/modules/chartEditStore/chartEditStore.d'
import displayTable from './displayTable.vue'
import {
  RequestBodyEnum,
  RequestParamsTypeEnum,
  SelectHttpTimeNameObj,
  RequestContentTypeEnum,
  RequestBodyEnumList,
  RequestParamsObjType
} from '@/enums/httpEnum'

const props = defineProps({
  globalData: Object as PropType<RequestGlobalConfigType>,
  targetData: Object as PropType<RequestDataPondItemType>
})

const { HelpOutlineIcon, FlashIcon, PulseIcon } = icon.ionicons5
const {
  requestUrl,
  requestInterval,
  requestHttpType,
  requestContentType,
  requestSQLContent,
  requestParams,
  requestParamsBodyType,
  requestIntervalUnit
} = toRefs((props.targetData as RequestDataPondItemType).dataPondRequestConfig)

const tabs = [RequestParamsTypeEnum.HEADER]
const requestContentTypeObj = {
  [RequestContentTypeEnum.DEFAULT]: window['$t']('views_components.auto_111'),
  [RequestContentTypeEnum.SQL]: window['$t']('views_components.auto_160')
}
const tabValue = ref<RequestParamsTypeEnum>(RequestParamsTypeEnum.PARAMS)

// Cập nhật bảng thông sốDữ liệu
const updateRequestParams = (paramsObj: RequestParamsObjType) => {
  if (tabValue.value !== RequestParamsTypeEnum.BODY) {
    requestParams.value[tabValue.value] = paramsObj
  }
}

// Cập nhật bảng thông sốDữ liệu
const updateRequestBodyTable = (paramsObj: RequestParamsObjType) => {
  if (
    tabValue.value === RequestParamsTypeEnum.BODY &&
    // Chỉ có hai loại body
    (requestParamsBodyType.value === RequestBodyEnum.FORM_DATA ||
      requestParamsBodyType.value === RequestBodyEnum.X_WWW_FORM_URLENCODED)
  ) {
    requestParams.value[RequestParamsTypeEnum.BODY][requestParamsBodyType.value] = paramsObj
  }
}
</script>

<style lang="scss" scoped>
@include go('chart-data-display') {
  flex: 1;
}
</style>
