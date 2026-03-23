<template>
  <n-collapse-item :title="$t('views_components.auto_246')"
 name="2">
    <template #header-extra>
      <n-button type="primary" tertiary size="small" @click.stop="showModal = true">
        <template #icon>
          <n-icon>
            <pencil-icon />
          </n-icon>
        </template>
        Sửa (Edit)
      </n-button>
    </template>
    <n-card class="collapse-show-box">
      <!-- Thân Body Function -->
      <div v-for="eventName in BaseEvent" :key="eventName">
        <p>
          <span class="func-annotate">// {{ EventTypeName[eventName] }}</span>
          <br />
          <span class="func-keyword">async {{ eventName }}</span> (mouseEvent,components) {
        </p>
        <p class="go-ml-4">
          <n-code :code="(targetData.events.baseEvent || {})[eventName] || ''" language="typescript"></n-code>
        </p>
        <p>}<span>,</span></p>
      </div>
    </n-card>
  </n-collapse-item>

  <!-- Bảng Tooltip -->
  <n-modal class="go-chart-data-monaco-editor" v-model:show="showModal" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1200px; height: 700px">
      <template #header>
        <n-space>
          <n-text>{{ $t('phase7.auto_220') }}</n-text>
        </n-space>
      </template>

      <template #header-extra> </template>
      <n-layout has-sider sider-placement="right">
        <n-layout style="height: 580px; padding-right: 20px">
          <n-tabs v-model:value="editTab" type="card" tab-style="min-width: 100px;">
            <!-- Mẹo -->
            <template #suffix>
              <n-text class="tab-tip" type="warning">{{ $t('phase7.auto_343') }}</n-text>
            </template>
            <n-tab-pane
              v-for="(eventName, index) in BaseEvent"
              :key="index"
              :tab="`${EventTypeName[eventName]}-${eventName}`"
              :name="eventName"
            >
              <!-- chức năngDanh xưng -->
              <p class="go-pl-3">
                <span class="func-keyword">async function &nbsp;&nbsp;</span>
                <span class="func-keyNameWord">{{ eventName }}(mouseEvent,components)&nbsp;&nbsp;{</span>
              </p>
              <!-- Edit gốc -->
              <monaco-editor v-model:modelValue="baseEvent[eventName]" height="480px" language="javascript" />
              <!-- kết thúc chức năng -->
              <p class="go-pl-3 func-keyNameWord">}</p>
            </n-tab-pane>
          </n-tabs>
        </n-layout>
        <n-layout-sider
          :collapsed-width="14"
          :width="340"
          show-trigger="bar"
          collapse-mode="transform"
          content-style="padding: 12px 12px 0px 12px;margin-left: 3px;"
        >
          <n-tabs default-value="1" justify-content="space-evenly" type="segment">
            <!-- Kết quả xác minh -->
            <n-tab-pane :tab="$t('views_components.auto_228')"
 name="1" size="small">
              <n-scrollbar trigger="none" style="max-height: 505px">
                <n-collapse class="go-px-3" arrow-placement="right" :default-expanded-names="[1, 2, 3]">
                  <template v-for="error in [validEvents()]" :key="error">
                    <n-collapse-item :title="$t('views_components.auto_235')"
 :name="1">
                      <n-text depth="3">{{ error.errorFn || window['$t']('views_components.auto_112') }}</n-text>
                    </n-collapse-item>
                    <n-collapse-item :title="$t('views_components.auto_236')"
 :name="2">
                      <n-text depth="3">{{ error.name || window['$t']('views_components.auto_112') }}</n-text>
                    </n-collapse-item>
                    <n-collapse-item :title="$t('views_components.auto_226')"
 :name="3">
                      <n-text depth="3">{{ error.message || window['$t']('views_components.auto_112') }}</n-text>
                    </n-collapse-item>
                  </template>
                </n-collapse>
              </n-scrollbar>
            </n-tab-pane>
            <!-- phụ trợHướng dẫn -->
            <n-tab-pane :tab="$t('views_components.auto_227')"
 name="2">
              <n-scrollbar trigger="none" style="max-height: 505px">
                <n-collapse class="go-px-3" arrow-placement="right" :default-expanded-names="[1, 2]">
                  <n-collapse-item title="mouseEvent" :name="1">
                    <n-text depth="3">{{ $t('phase7.auto_467') }}</n-text>
                  </n-collapse-item>
                </n-collapse>
              </n-scrollbar>
            </n-tab-pane>
          </n-tabs>
        </n-layout-sider>
      </n-layout>

      <template #action>
        <n-space justify="space-between">
          <div class="go-flex-items-center">
            <n-tag :bordered="false" type="primary">
              <template #icon>
                <n-icon :component="DocumentTextIcon" />
              </template>
              Hướng dẫn
            </n-tag>
            <n-text class="go-ml-2" depth="2">{{ $t('phase7.auto_288') }}</n-text>
          </div>

          <n-space>
            <n-button size="medium" @click="closeEvents">{{ $t('phase7.auto_311') }}</n-button>
            <n-button size="medium" type="primary" @click="saveEvents">{{ $t('phase7.auto_447') }}</n-button>
          </n-space>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch, toRefs, toRaw } from 'vue'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { BaseEvent } from '@/enums/eventEnum'
import { icon } from '@/plugins'

const { targetData, chartEditStore } = useTargetData()
const { DocumentTextIcon, ChevronDownIcon, PencilIcon } = icon.ionicons5

const EventTypeName = {
  [BaseEvent.ON_CLICK]: window['$t']('views_components.auto_245'),
  [BaseEvent.ON_DBL_CLICK]: window['$t']('views_components.auto_247'),
  [BaseEvent.ON_MOUSE_ENTER]: window['$t']('views_components.auto_243'),
  [BaseEvent.ON_MOUSE_LEAVE]: window['$t']('views_components.auto_244')
}

// được kiểm soátBảng Tooltip
const showModal = ref(false)
// Sửa (Edit)kiểm soát khu vực
const editTab = ref(BaseEvent.ON_CLICK)
// events mẫu chức năng
let baseEvent = ref({ ...targetData.value.events.baseEvent })
// Sự kiệnxác định lỗi
const errorFlag = ref(false)

// Xác thực cú pháp
const validEvents = () => {
  let errorFn = ''
  let message = ''
  let name = ''

  errorFlag.value = Object.entries(baseEvent.value).every(([eventName, str]) => {
    try {
      // ủng hộawait, xác minh cú pháp
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
      new AsyncFunction(str)
      return true
    } catch (error: any) {
      message = error.message
      name = error.name
      errorFn = eventName
      return false
    }
  })
  return {
    errorFn,
    message,
    name
  }
}

// đóng cửaSự kiện
const closeEvents = () => {
  showModal.value = false
}

// Thêm+Sự kiện
const saveEvents = () => {
  if (validEvents().errorFn) {
    window['$message'].error(window['$t']('views_components.auto_229'))
    return
  }
  if (Object.values(baseEvent.value).join('').trim() === '') {
    // Thông thoángSự kiện
    targetData.value.events.baseEvent = {
      [BaseEvent.ON_CLICK]: undefined,
      [BaseEvent.ON_DBL_CLICK]: undefined,
      [BaseEvent.ON_MOUSE_ENTER]: undefined,
      [BaseEvent.ON_MOUSE_LEAVE]: undefined
    }
  } else {
    targetData.value.events.baseEvent = { ...baseEvent.value }
  }
  closeEvents()
}

watch(
  () => showModal.value,
  (newData: boolean) => {
    if (newData) {
      baseEvent.value = { ...targetData.value.events.baseEvent }
    }
  }
)
</script>

<style lang="scss" scoped>
@import '../index.scss';
</style>
